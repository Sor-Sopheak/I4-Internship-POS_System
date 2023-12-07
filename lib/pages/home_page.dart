import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:hive/hive.dart';
import 'package:self_ordering_pos_system_flutter/pages/widgets/product_widget.dart';
import '../../pages/widgets/category_widget.dart';

import '../models/category.api.dart';
import '../models/category.dart';
import '../models/order/OrderLine.dart';
import '../models/product.api.dart';
import '../models/product.dart';
import 'widgets/cart_bottom_nav_bar.dart';
import 'widgets/cart_widget.dart';
import 'package:self_ordering_pos_system_flutter/WebSocket/WebSocket.dart';

class HomePage extends StatefulWidget {
  HomePage({super.key});

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  late List<Category> _categories;
  bool _isLoading = true;
  late Box<OrderLine> orderLineBox;

  late List<Product> _products = [];
  bool _isLoadingProduct = true;

  late String categoryName = "ទាំងអស់";

  // final productStream = channel.stream.where((event) => event == 'changeProduct');

  MaterialStateProperty<Color> getColor(Color color, Color colorPressed) {
    return MaterialStateProperty.resolveWith((Set<MaterialState> states) {
      if (states.contains(MaterialState.pressed)) {
        return colorPressed;
      } else {
        return color;
      }
    });
  }


  @override
  void initState() {
    super.initState();
    // channel.stream.listen((event) {
    //   print('Received message: $event');
    // });
    getCategories();
    getProducts();
    orderLineBox = Hive.box('orderLine');
  }

  @override
  void dispose() {
    // channel.sink.close(); // Close the WebSocket when the app is disposed
    super.dispose();
  }

  void processEventData(dynamic eventData) {
    List data = jsonDecode(eventData);

    setState(() {
      _products = Product.productsFromSnapshot(data); // Add the new product to the list
    });
  }
  Future<void> getCategories() async {
    _categories = await CategoryApi.getCategory();
    setState(() {
      _isLoading = false;
    });
  }

  Future<void> getProducts() async {
    _products = await ProductApi.getProduct();
    setState(() {
      _isLoadingProduct = false;
    });
  }

  Future<void> getProductCategory(String id) async {
    _products = await ProductApi.getProductByCategory(id);
    setState(() {
      _isLoadingProduct = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    // print(channel);
    return SafeArea(
      child: Scaffold(
        backgroundColor: Colors.grey[300],
        body: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
          // Left Side (10%)
          Container(
            width: MediaQuery.of(context).size.width * 0.10,
            color: Colors.white,
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Container(
                      width: MediaQuery.of(context).size.width * 0.07,
                      height: MediaQuery.of(context).size.height * 0.07,
                      margin: const EdgeInsets.only(bottom: 2.0),
                      child: const Image(
                          image: AssetImage('assets/PoCo-logo.png')),
                    ),
                  ],
                ),
                SizedBox(
                  height: MediaQuery.of(context).size.height * 0.9,
                  child: _isLoading
                      ? const Center(child: CircularProgressIndicator())
                      : SingleChildScrollView(
                          scrollDirection: Axis.vertical,
                          child: Column(
                            children: [
                              TextButton(
                                onPressed: () {
                                  getProducts();
                                  categoryName = 'ទាំងអស់';
                                  },
                                style: TextButton.styleFrom(
                                    padding: EdgeInsets.zero
                                ),
                                child: Container(
                                  padding: const EdgeInsets.all(5),
                                  margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 5),
                                  width: MediaQuery.of(context).size.width,
                                  height: MediaQuery.of(context).size.height * 0.16,
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(15),
                                    color: const Color(0xffffbf00).withOpacity(0.1),
                                    border: Border.all(color: Colors.yellow, width: 1),
                                  ),


                                  child: Stack(
                                    children: [
                                      const Align(
                                        alignment: Alignment.bottomCenter,
                                        child: Padding(
                                          padding: EdgeInsets.only(bottom: 5.0, top: 5.0),
                                          child: Text(
                                            "ទាំងអស់",
                                            style: TextStyle(
                                              color: Colors.black,
                                              fontSize: 19,
                                            ),
                                            overflow: TextOverflow.ellipsis,
                                            maxLines: 2,
                                            textAlign: TextAlign.start,
                                          ),
                                        ),
                                      ),
                                      Center(
                                        child: Container(
                                            constraints: BoxConstraints(
                                              maxWidth: MediaQuery.of(context).size.width * 0.90,
                                            ),
                                            margin: const EdgeInsets.only(bottom: 24.0),
                                            child: const FittedBox(
                                              fit: BoxFit.contain,
                                              child: Image(
                                                  image: AssetImage('assets/all-icon.png')
                                              ),
                                            )),
                                      ),
                                    ],
                                  ),
                                  // ),
                                ),
                              ),
                              Column(
                                children: _categories.map((category) {
                                  return CategoryWidget(
                                      category: category,
                                    onPress: () {
                                        setState(() {
                                          categoryName = category.name;
                                          getProductCategory(category.id);
                                        });
                                    },
                                  );
                                }).toList(),
                              ),
                            ],
                          ),
                        ),
                )
              ],
            ),
          ),

          //middle portaion (70%)
          Expanded(
            child: _isLoadingProduct
                ? const Center(child: CircularProgressIndicator())
                : SingleChildScrollView(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Padding(
                        padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 30),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              categoryName,
                              style: const TextStyle(
                                fontSize: 50,
                                fontWeight: FontWeight.bold
                              ),
                            ),
                            Container(
                              height: 15,
                              width: 80,
                              decoration: BoxDecoration(
                                  color: Colors.yellow.shade600
                              ),
                            )
                          ],
                        ),
                      ),
                      // StreamBuilder(
                      //   stream: productStream,
                      //   builder: (context, snapshot) {
                      //     if (snapshot.hasData) {
                      //       print('here');
                      //       final eventData = snapshot.data;
                      //       processEventData(eventData); // Call your function here
                      //     }
                          /*return*/ GridView.builder(
                              itemCount: _products.length,
                              // scrollDirection: Axis.vertical,
                              padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 10),
                              shrinkWrap: true,
                            physics: NeverScrollableScrollPhysics(),
                              gridDelegate:
                                  const SliverGridDelegateWithFixedCrossAxisCount(
                                      crossAxisCount: 4,
                                      crossAxisSpacing: 35.0,
                                      mainAxisSpacing: 35.0,
                                      childAspectRatio: (3 / 4)),
                              itemBuilder: (BuildContext context, int index) {
                                return ProductWidget(product: _products[index]);
                              },
                            )
                      //   }
                      // ),
                    ],
                  ),
                ),
          ),
          //right side 20%
          Container(
            width: MediaQuery.of(context).size.width * 0.20,
            height: MediaQuery.of(context).size.height,
            decoration: const BoxDecoration(
                color: Colors.white,
                border:
                    Border(left: BorderSide(color: Colors.black, width: 0.5))),
            child:
                Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              SizedBox(
                child: Column(
                  children: [
                    const SizedBox(height: 10),
                    SizedBox(
                      width: MediaQuery.of(context).size.width,
                      child: const Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Padding(
                            padding: EdgeInsets.only(left: 16),
                            child: Text(
                              'កន្ត្រក',
                              textAlign: TextAlign.start,
                              style: TextStyle(
                                fontSize: 38,
                                fontWeight: FontWeight.bold,
                                color: Colors.black,
                              ),
                            ),
                          )
                        ],
                      ),
                    ),
                    SizedBox(
                      child: Align(
                          alignment: Alignment.centerRight,
                          child: Container(
                            margin: const EdgeInsets.only(right: 10.0),
                            child: ElevatedButton(
                              onPressed: () {},
                              style: ButtonStyle(
                                backgroundColor:
                                    getColor(Colors.black, Colors.white),
                                foregroundColor:
                                    getColor(Colors.white, Colors.black),
                                shape: MaterialStateProperty.all<
                                    RoundedRectangleBorder>(
                                  RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(30.0),
                                  ),
                                ),
                              ),
                              child: TextButton(
                                onPressed: () {
                                  setState(() {
                                    orderLineBox.clear();
                                  });
                                },
                                child: const Text(
                                  'លុប',
                                  style: TextStyle(
                                      fontSize: 18,
                                    color: Colors.white
                                  ),
                                ),
                              ),
                            ),
                          )),
                    ),
                  ],
                ),
              ),
              const CartWidget(),
              const CartBottomNavBar(),
            ]),
          ),
        ]),
      ),
    );
  }
}

