import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:hive/hive.dart';

import '../../models/order/OrderLine.dart';
import 'package:self_ordering_pos_system_flutter/pages/widgets/edit_product_widget.dart';

class CartWidget extends StatefulWidget {
  const CartWidget({super.key});

  @override
  State<CartWidget> createState() => _CartWidgetState();
}

class _CartWidgetState extends State<CartWidget> {
  late Box<OrderLine> orderLineBox;
  bool _initialized = false; // Add this flag
  @override
  void initState() {
    super.initState();
    orderLineBox = Hive.box<OrderLine>('orderLine');
    _initialized = true; // Set the flag to true in initState
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: MediaQuery.of(context).size.height * 0.60,
      child: StreamBuilder<BoxEvent>(
        stream: orderLineBox.watch().asBroadcastStream(), // Watch for changes
        builder: (context, snapshot) {
          // Check the connection state
          if (_initialized) {
            // Rebuild your widget here with the updated data
            return SingleChildScrollView(
                child: Column(
              children: [
                for (int i = 0; i < orderLineBox.length; i++)
                  Padding(
                    padding: const EdgeInsets.symmetric(vertical: 3),
                    child: Column(
                      children: [
                        Container(
                          margin: const EdgeInsets.symmetric(horizontal: 10),
                          padding: const EdgeInsets.all(10),
                          width: MediaQuery.of(context).size.width,
                          decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.circular(10),
                              border: Border.all(color: Colors.grey)),
                          child: Column(
                            children: [
                              Row(
                                children: [
                                  ClipRRect(
                                    borderRadius: BorderRadius.circular(8.0),
                                    child: SizedBox(
                                      height:
                                          MediaQuery.of(context).size.height *
                                              0.1,
                                      width: MediaQuery.of(context).size.width *
                                          0.05,
                                      child: Image.network(
                                          'http://137.184.220.73:3001/static/get${orderLineBox.getAt(i)?.image.substring(1)}',
                                          fit: BoxFit.cover),
                                    ),
                                  ),
                                  Padding(
                                    padding: const EdgeInsets.symmetric(
                                        vertical: 5, horizontal: 10),
                                    child: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceBetween,
                                      children: [
                                        Row(
                                          children: [
                                            Column(
                                              crossAxisAlignment:
                                                  CrossAxisAlignment.start,
                                              children: [
                                                SizedBox(
                                                  width: 110,
                                                  child: Text(
                                                    orderLineBox.getAt(i)!.name,
                                                    overflow:
                                                        TextOverflow.ellipsis,
                                                    maxLines: 1,
                                                    style: const TextStyle(
                                                      fontSize: 20,
                                                      fontWeight:
                                                          FontWeight.bold,
                                                      color: Colors.black,
                                                    ),
                                                  ),
                                                ),
                                                Row(
                                                  children: [
                                                    Text(
                                                      orderLineBox
                                                          .getAt(i)!
                                                          .productPrice
                                                          .name,
                                                      style: const TextStyle(
                                                        fontSize: 16,
                                                        color: Color.fromARGB(
                                                            120, 55, 55, 55),
                                                      ),
                                                    ),
                                                    Text(
                                                      " x ${orderLineBox.getAt(i)?.quantity}",
                                                      style: const TextStyle(
                                                        fontSize: 16,
                                                        color: Color.fromARGB(
                                                            120, 55, 55, 55),
                                                      ),
                                                    ),
                                                  ],
                                                ),
                                              ],
                                            ),
                                          ],
                                        ),
                                        Text(
                                          "${orderLineBox.getAt(i)!.totalPrice}៛",
                                          style: const TextStyle(
                                            fontSize: 20,
                                            fontWeight: FontWeight.bold,
                                            color: Colors.black,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                  const Spacer(),
                                  Column(
                                    crossAxisAlignment: CrossAxisAlignment.end,
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      TextButton(
                                        style: TextButton.styleFrom(
                                            padding: EdgeInsets.zero,
                                            minimumSize: const Size(30, 30),
                                            tapTargetSize: MaterialTapTargetSize
                                                .shrinkWrap,
                                            alignment: Alignment.center),
                                        onPressed: () {
                                          orderLineBox.deleteAt(i);
                                        },
                                        child: Container(
                                          color: const Color(0xffffbf00)
                                              .withOpacity(0.2),
                                          child: const Icon(
                                            Icons.close,
                                            color: Colors.black,
                                          ),
                                        ),
                                      ),
                                      Padding(
                                        padding: const EdgeInsets.symmetric(
                                            vertical: 8),
                                        child: Row(
                                          children: [
                                            TextButton(
                                              onPressed: () {
                                                late OrderLine? order =
                                                    orderLineBox.getAt(i);
                                                if (order!.quantity > 1) {
                                                  order?.setQuantity(
                                                      order.quantity - 1);
                                                  order?.totalPrice =
                                                      (order!.totalPrice -
                                                          order.productPrice
                                                              .price)!;
                                                  orderLineBox.putAt(i, order!);
                                                } else {
                                                  orderLineBox.deleteAt(i);
                                                }
                                              },
                                              style: TextButton.styleFrom(
                                                  padding: EdgeInsets.zero,
                                                  minimumSize:
                                                      const Size(20, 20),
                                                  tapTargetSize:
                                                      MaterialTapTargetSize
                                                          .shrinkWrap,
                                                  alignment: Alignment.center),
                                              child: Container(
                                                padding:
                                                    const EdgeInsets.all(3),
                                                decoration: BoxDecoration(
                                                  color: Colors.white,
                                                  borderRadius:
                                                      BorderRadius.circular(20),
                                                  border: Border.all(width: 1),
                                                  boxShadow: [
                                                    BoxShadow(
                                                      color: Colors.grey
                                                          .withOpacity(0.3),
                                                      spreadRadius: 1,
                                                      blurRadius: 10,
                                                    )
                                                  ],
                                                ),
                                                child: const Icon(
                                                  CupertinoIcons.minus,
                                                  size: 15,
                                                  color: Colors.black,
                                                ),
                                              ),
                                            ),
                                            Container(
                                              margin:
                                                  const EdgeInsets.symmetric(
                                                      horizontal: 10),
                                              child: Text(
                                                orderLineBox
                                                    .getAt(i)!
                                                    .quantity
                                                    .toString(),
                                                style: const TextStyle(
                                                  fontSize: 24,
                                                  fontWeight: FontWeight.w500,
                                                  color: Colors.black,
                                                ),
                                              ),
                                            ),
                                            TextButton(
                                              onPressed: () {
                                                late OrderLine? order =
                                                    orderLineBox.getAt(i);
                                                order?.setQuantity(
                                                    order.quantity + 1);
                                                order?.totalPrice = (order!
                                                        .totalPrice +
                                                    order.productPrice.price)!;
                                                orderLineBox.putAt(i, order!);
                                              },
                                              style: TextButton.styleFrom(
                                                  padding: EdgeInsets.zero,
                                                  minimumSize:
                                                      const Size(20, 20),
                                                  tapTargetSize:
                                                      MaterialTapTargetSize
                                                          .shrinkWrap,
                                                  alignment: Alignment.center),
                                              child: Container(
                                                padding:
                                                    const EdgeInsets.all(3),
                                                decoration: BoxDecoration(
                                                  color: Colors.white,
                                                  borderRadius:
                                                      BorderRadius.circular(20),
                                                  border: Border.all(width: 1),
                                                  boxShadow: [
                                                    BoxShadow(
                                                      color: Colors.grey
                                                          .withOpacity(0.3),
                                                      spreadRadius: 1,
                                                      blurRadius: 10,
                                                    )
                                                  ],
                                                ),
                                                child: const Icon(
                                                  CupertinoIcons.plus,
                                                  size: 15,
                                                  color: Colors.black,
                                                ),
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                      TextButton(
                                        onPressed: () => showDialog<String>(
                                          context: context,
                                          builder: (BuildContext context) =>
                                              EditProductPopup(
                                            productId:
                                                orderLineBox.getAt(i)!.id,
                                            productIndex: i,
                                          ),
                                        ),
                                        style: TextButton.styleFrom(
                                          backgroundColor: Colors.black,
                                          padding: EdgeInsets.zero,
                                          minimumSize: Size(50, 30),
                                          tapTargetSize:
                                              MaterialTapTargetSize.shrinkWrap,
                                        ),
                                        child: const Text(
                                          'កែប្រែ',
                                          style: TextStyle(
                                              fontSize: 15,
                                              color: Colors.white),
                                        ),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                              Align(
                                alignment: Alignment.topLeft,
                                child: Wrap(
                                  children: orderLineBox
                                      .getAt(i)!
                                      .additionalOrder
                                      .map((additional) => Text(
                                          "${additional.name} (x${additional.quantity}), "))
                                      .toList(),
                                ),
                              )
                            ],
                          ),
                        ),
                      ],
                    ),
                  )
              ],
            ));
          } else {
            // Loading indicator while waiting for data
            return CircularProgressIndicator();
          }
        },
      ),
    );
  }
}
