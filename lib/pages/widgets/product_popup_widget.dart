import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:self_ordering_pos_system_flutter/models/ProductAdditionalOrder.dart';
import 'package:self_ordering_pos_system_flutter/models/ProductPrice.dart';
import 'package:self_ordering_pos_system_flutter/models/order/OrderLine.dart';
import 'package:self_ordering_pos_system_flutter/models/product.dart';
import 'package:hive_flutter/hive_flutter.dart';

class ProductPopup extends StatefulWidget {
  const ProductPopup({
    super.key,
    required this.product,
  });

  final Product product;

  @override
  State<ProductPopup> createState() => _ProductPopupState();
}

class _ProductPopupState extends State<ProductPopup> {
  late ProductPrice size = widget.product.prices[0];
  late List<ProductAdditionalOrder> additionalOrders = [];
  late List<ProductAdditionalOrder> finalAdditionalOrders = [];
  late int quantity = 1;
  late String note = '';
  late int additionalOrderPrice = 0;

  late Box<OrderLine> orderLineBox;

  @override
  void initState() {
    super.initState();
    orderLineBox = Hive.box('orderLine');
    for (var additional in widget.product.additionals) {
      additionalOrders.add(ProductAdditionalOrder(
          name: additional.name,
          price: additional.price,
          image: additional.image,
          quantity: 0,
          totalPrice: 0));
    }
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      contentPadding: EdgeInsets.zero,
      content: SingleChildScrollView(
        child: Column(
          children: [
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  flex: 4,
                  child: Container(
                    padding: const EdgeInsets.all(30),
                    decoration: const BoxDecoration(
                      border: Border(
                        right: BorderSide(
                          color: Colors.grey,
                          width: 1.0,
                        ),
                      ),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Container(
                          width: 300,
                          height: 300,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(500),
                            image: DecorationImage(
                              fit: BoxFit.cover,
                              image: NetworkImage(
                                  "http://137.184.220.73:3001/static/get${widget.product.image.substring(1)}"),
                            ),
                          ),
                        ),
                        const SizedBox(
                          height: 30,
                        ),
                        Text(
                          widget.product.name,
                          style: const TextStyle(
                              color: Colors.black,
                              fontSize: 35,
                              fontWeight: FontWeight.w400),
                        ),
                        const SizedBox(
                          height: 25,
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            TextButton(
                              onPressed: () {
                                setState(() {
                                  if (quantity > 1) {
                                    quantity--;
                                  }
                                });
                              },
                              child: Container(
                                padding: const EdgeInsets.all(3),
                                decoration: BoxDecoration(
                                  color: Colors.white,
                                  borderRadius: BorderRadius.circular(20),
                                  border: Border.all(width: 1),
                                  boxShadow: [
                                    BoxShadow(
                                      color: Colors.grey.withOpacity(0.3),
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
                                  const EdgeInsets.symmetric(horizontal: 10),
                              child: Text(
                                quantity.toString(),
                                style: const TextStyle(
                                  fontSize: 24,
                                  fontWeight: FontWeight.w500,
                                  color: Colors.black,
                                ),
                              ),
                            ),
                            TextButton(
                              onPressed: () {
                                setState(() {
                                  quantity++;
                                });
                              },
                              child: Container(
                                padding: const EdgeInsets.all(3),
                                decoration: BoxDecoration(
                                  color: Colors.white,
                                  borderRadius: BorderRadius.circular(20),
                                  border: Border.all(width: 1),
                                  boxShadow: [
                                    BoxShadow(
                                      color: Colors.grey.withOpacity(0.3),
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
                        const SizedBox(
                          height: 30,
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: widget.product.prices
                              .map((price) => Column(
                                    children: [
                                      Text("៛ ${price.price}"),
                                      OutlinedButton(
                                        style: size.name == price.name
                                            ? OutlinedButton.styleFrom(
                                                backgroundColor: Colors.black,
                                                shape: RoundedRectangleBorder(
                                                  borderRadius:
                                                      BorderRadius.circular(
                                                          20.0),
                                                ),
                                                side: const BorderSide(
                                                  color: Colors.black,
                                                  width: 1.5,
                                                ),
                                              )
                                            : OutlinedButton.styleFrom(
                                                backgroundColor: Colors.white,
                                                shape: RoundedRectangleBorder(
                                                  borderRadius:
                                                      BorderRadius.circular(
                                                          20.0),
                                                ),
                                                side: const BorderSide(
                                                  color: Colors.black,
                                                  width: 1.5,
                                                ),
                                              ),
                                        onPressed: () {
                                          setState(() {
                                            size = price;
                                          });
                                        },
                                        child: Text(
                                          " ${price.name}",
                                          style: size.name == price.name
                                              ? const TextStyle(
                                                  color: Colors.white,
                                                  fontWeight: FontWeight.bold)
                                              : const TextStyle(
                                                  color: Colors.black,
                                                  fontWeight: FontWeight.bold),
                                        ),
                                      ),
                                    ],
                                  ))
                              .toList(),
                        ),
                        const SizedBox(
                          height: 20,
                        ),
                        TextField(
                          onChanged: (value) {
                            setState(() {
                              note = value;
                            });
                          },
                          decoration: const InputDecoration(
                            border: UnderlineInputBorder(),
                            hintText: 'Note here:',
                          ),
                        ),
                        Text(note)
                      ],
                    ),
                  ),
                ),
                Expanded(
                    flex: 4,
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 20),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                              style: TextStyle(fontSize: 20), 'គ្រឿងបន្ថែម'),
                          const SizedBox(
                            height: 20,
                          ),
                          Column(
                            children: additionalOrders
                                .map((additional) => Column(
                                      children: [
                                        Row(
                                          mainAxisAlignment:
                                              MainAxisAlignment.spaceBetween,
                                          children: [
                                            Container(
                                              child: Row(
                                                children: [
                                                  Container(
                                                    width: 70,
                                                    height: 70,
                                                    decoration: BoxDecoration(
                                                      borderRadius:
                                                          const BorderRadius
                                                              .all(
                                                              Radius.circular(
                                                                  20)),
                                                      image: DecorationImage(
                                                        fit: BoxFit.cover,
                                                        image: NetworkImage(
                                                          "http://137.184.220.73:3001/static/get${additional.image.substring(1)}",
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                  const SizedBox(
                                                    width: 15,
                                                  ),
                                                  Column(
                                                    crossAxisAlignment:
                                                        CrossAxisAlignment
                                                            .start,
                                                    children: [
                                                      Text(
                                                        additional.name,
                                                        style: const TextStyle(
                                                          fontSize: 18,
                                                          fontWeight:
                                                              FontWeight.bold,
                                                        ),
                                                      ),
                                                      const SizedBox(
                                                        height: 10,
                                                      ),
                                                      Text(
                                                        '៛ ${additional.price}',
                                                        style: const TextStyle(
                                                          fontSize: 18,
                                                        ),
                                                      ),
                                                    ],
                                                  ),
                                                ],
                                              ),
                                            ),
                                            Row(
                                              mainAxisAlignment:
                                                  MainAxisAlignment.center,
                                              children: [
                                                TextButton(
                                                  style: TextButton.styleFrom(
                                                      padding: EdgeInsets.zero,
                                                      minimumSize:
                                                          const Size(30, 30),
                                                      tapTargetSize:
                                                          MaterialTapTargetSize
                                                              .shrinkWrap,
                                                      alignment:
                                                          Alignment.center),
                                                  onPressed: () {
                                                    setState(() {
                                                      if (additional.quantity >
                                                          0) {
                                                        additional.quantity--;
                                                        additional.totalPrice =
                                                            additional.price *
                                                                additional
                                                                    .quantity;
                                                        additionalOrderPrice =
                                                            additionalOrderPrice -
                                                                additional
                                                                    .price;
                                                      }
                                                    });
                                                  },
                                                  child: Container(
                                                    padding:
                                                        const EdgeInsets.all(3),
                                                    decoration: BoxDecoration(
                                                      color: Colors.white,
                                                      borderRadius:
                                                          BorderRadius.circular(
                                                              20),
                                                      border:
                                                          Border.all(width: 1),
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
                                                  margin: const EdgeInsets
                                                      .symmetric(
                                                      horizontal: 10),
                                                  child: Text(
                                                    additional.quantity
                                                        .toString(),
                                                    style: const TextStyle(
                                                      fontSize: 24,
                                                      fontWeight:
                                                          FontWeight.w500,
                                                      color: Colors.black,
                                                    ),
                                                  ),
                                                ),
                                                TextButton(
                                                  onPressed: () {
                                                    setState(() {
                                                      additional.quantity++;
                                                      additional.totalPrice =
                                                          additional.price *
                                                              additional
                                                                  .quantity;
                                                      additionalOrderPrice =
                                                          additionalOrderPrice +
                                                              additional.price;
                                                    });
                                                  },
                                                  style: TextButton.styleFrom(
                                                      padding: EdgeInsets.zero,
                                                      minimumSize:
                                                          const Size(30, 30),
                                                      tapTargetSize:
                                                          MaterialTapTargetSize
                                                              .shrinkWrap,
                                                      alignment:
                                                          Alignment.center),
                                                  child: Container(
                                                    padding:
                                                        const EdgeInsets.all(3),
                                                    decoration: BoxDecoration(
                                                      color: Colors.white,
                                                      borderRadius:
                                                          BorderRadius.circular(
                                                              20),
                                                      border:
                                                          Border.all(width: 1),
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
                                          ],
                                        ),
                                      ],
                                    ))
                                .toList(),
                          )
                        ],
                      ),
                    ))
              ],
            ),
            Container(
              decoration: BoxDecoration(
                color: Colors.white,
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.2),
                    offset: const Offset(0, -1),
                    spreadRadius: 0.2,
                    blurRadius: 5,
                  ),
                ],
              ),
              child: Padding(
                padding: const EdgeInsets.all(10.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'តម្លៃសរុប:',
                          style: TextStyle(color: Colors.black, fontSize: 20),
                        ),
                        Text(
                          '៛ ${(size.price * quantity) + additionalOrderPrice}',
                          style: const TextStyle(
                              color: Colors.black,
                              fontWeight: FontWeight.bold,
                              fontSize: 25),
                        )
                      ],
                    ),
                    Row(
                      children: [
                        ElevatedButton(
                          onPressed: () => Navigator.pop(context, 'Cancel'),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.black,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(10.0),
                            ),
                          ),
                          child: Container(
                            width: 150,
                            height: 50,
                            alignment: Alignment.center,
                            child: const Text(
                              'ត្រឡប់ក្រោយ',
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 18.0,
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(width: 20), // Space between buttons
                        ElevatedButton(
                          onPressed: () async => {
                            for (var additionalOrder in additionalOrders)
                              {
                                if (additionalOrder.totalPrice != 0)
                                  {finalAdditionalOrders.add(additionalOrder)}
                              },
                            await orderLineBox.add(OrderLine(
                                id: widget.product.id,
                                name: widget.product.name,
                                image: widget.product.image,
                                quantity: quantity,
                                note: note,
                                productPrice: size,
                                additionalOrder: finalAdditionalOrders,
                                totalPrice: (size.price * quantity) +
                                    additionalOrderPrice /*, product: widget.product*/)),
                            Navigator.pop(context, 'Add To Cart')
                          },
                          style: ElevatedButton.styleFrom(
                            primary: Colors.yellow
                                .shade800, // Background color for Add To Cart button
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(
                                  10.0), // Adjust the value for roundness
                            ),
                          ),
                          child: Container(
                            width: 150, // Adjust width as needed
                            height: 50, // Adjust height as needed
                            alignment: Alignment.center,
                            child: const Text(
                              'ដាក់ចូលកន្ត្រក',
                              style: TextStyle(
                                color: Colors
                                    .black, // Text color for Add To Cart button
                                fontSize: 18.0, // Adjust font size as needed
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

enum SingingCharacter { lafayette, jefferson }

SingingCharacter? _character = SingingCharacter.lafayette;
