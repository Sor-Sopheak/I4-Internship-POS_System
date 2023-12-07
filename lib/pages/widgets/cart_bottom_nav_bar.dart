import 'package:flutter/material.dart';
import 'package:hive/hive.dart';
import '../../models/order/OrderLine.dart';
import 'package:self_ordering_pos_system_flutter/models/order/Order.api.dart';
import 'package:self_ordering_pos_system_flutter/pages/widgets/payment_popup_widget.dart';

class CartBottomNavBar extends StatefulWidget {
  const CartBottomNavBar({super.key});

  @override
  State<CartBottomNavBar> createState() => _CartBottomNavBarState();
}

class _CartBottomNavBarState extends State<CartBottomNavBar> {
  late String type = "ញាំក្នុងហាង";
  late Box<OrderLine> orderLineBox;

  late int totalPrice;

  @override
  void initState() {
    super.initState();
    orderLineBox = Hive.box<OrderLine>('orderLine');
  }
  
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
  Widget build(BuildContext context) {
    return BottomAppBar(
      child: SizedBox(
        height: MediaQuery.of(context).size.height * 0.25,
        width: MediaQuery.of(context).size.width,
        child: StreamBuilder<BoxEvent>(
          stream: orderLineBox.watch().asBroadcastStream(), // Watch for changes
          builder: (context, snapshot) {
              return Column(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Expanded(
                        flex: 1,
                        child: OutlinedButton(
                          onPressed: () {
                            setState(() {
                              type = "ញាំក្នុងហាង";
                            });
                          },

                          style: type == "ញាំក្នុងហាង"
                              ? ButtonStyle(
                            backgroundColor: getColor(Colors.black, Colors.white),
                            foregroundColor: getColor(Colors.white, Colors.black),
                            shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                                RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(0.0)
                                )
                            ),
                          )
                              : ButtonStyle(
                            foregroundColor: getColor(Colors.black, Colors.white),
                            backgroundColor: getColor(Colors.white, Colors.black),
                            shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                                RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(0.0)
                                )
                            ),
                            side: MaterialStateProperty.all(
                              const BorderSide(
                                  color: Colors.black,
                                  width: 1.0,
                                  style: BorderStyle.solid
                              ),

                            ),

                          ),
                          child: Container(
                            alignment: Alignment.center,
                            height: MediaQuery.of(context).size.height * 0.03,
                            width: MediaQuery.of(context).size.width * 0.08,
                            child: const Text(
                              "ញាំក្នុងហាង",
                              style: TextStyle(
                                fontSize: 20,
                              ),
                            ),
                          ),
                        ),
                      ),

                      Expanded(
                        flex: 1,
                        child: OutlinedButton(
                          onPressed: () {
                            setState(() {
                              type = "ខ្ចប់";
                            });
                          },
                          style: type == "ខ្ចប់"
                              ? ButtonStyle(
                            backgroundColor: getColor(Colors.black, Colors.white),
                            foregroundColor: getColor(Colors.white, Colors.black),
                            shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                                RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(0.0)
                                )
                            ),
                          )
                              : ButtonStyle(
                              foregroundColor: getColor(Colors.black, Colors.white),
                              backgroundColor: getColor(Colors.white, Colors.black),
                              shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                                  RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(0.0)
                                  )
                              ),
                              side: MaterialStateProperty.all(
                                  const BorderSide(
                                      color: Colors.black,
                                      width: 1.0,
                                      style: BorderStyle.solid
                                  )
                              )
                          ),
                          child: Container(
                            alignment: Alignment.center,
                            height: MediaQuery.of(context).size.height * 0.03,
                            width: MediaQuery.of(context).size.width * 0.08,
                            child: const Text(
                              "ខ្ចប់",
                              style: TextStyle(
                                fontSize: 20,
                              ),
                            ),
                          ),
                        ),

                      )
                    ],
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Padding(
                        padding: EdgeInsets.symmetric(horizontal: 20),
                        child: Text(
                          "ទំនិញសរុប: ",
                          style: TextStyle(
                              color: Colors.black,
                              fontSize: 24,
                              fontWeight: FontWeight.bold),
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.symmetric(horizontal: 20),
                        child: Text(
                          "${orderLineBox.values.toList().fold(0, (int total, OrderLine orderLine) => total + orderLine.quantity)}",
                          style: const TextStyle(
                              color: Colors.black,
                              fontSize: 24,
                              fontWeight: FontWeight.bold),
                        ),
                      ),
                    ],
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Padding(
                        padding: EdgeInsets.symmetric(horizontal: 20),
                        child: Text(
                          "តម្លៃសរុប: ",
                          style: TextStyle(
                              color: Colors.black,
                              fontSize: 24,
                              fontWeight: FontWeight.bold),
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.symmetric(horizontal: 20),
                        child: Text(
                          "${orderLineBox.values.toList().fold(0, (int total, OrderLine orderLine) => total + orderLine.totalPrice)}៛",
                          style: const TextStyle(
                              color: Color(0xffffbf00),
                              fontSize: 24,
                              fontWeight: FontWeight.bold),
                        ),
                      ),
                    ],
                  ),
                  TextButton(
                    style: TextButton.styleFrom(
                        padding: EdgeInsets.zero
                    ),
                    onPressed: () => showDialog<String>(
                      context: context,
                      builder: (BuildContext context) => PaymentPopup(type: type),
                    ),
                    child: Container(
                      alignment: Alignment.center,
                      height: MediaQuery.of(context).size.height * 0.06,
                      width: double.infinity,
                      decoration: const BoxDecoration(
                        color: Color(0xffffbf00),
                      ),
                      child: const Text(
                        "បង់ប្រាក់",
                        style: TextStyle(
                            fontSize: 26,
                            fontWeight: FontWeight.bold,
                            color: Colors.white),
                      ),
                    ),
                  ),
                ],
              );
          }
        ),
      ),
    );
  }
}


