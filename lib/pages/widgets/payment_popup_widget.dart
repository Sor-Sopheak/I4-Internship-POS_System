import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:hive/hive.dart';
import '../../models/order/OrderLine.dart';
import 'package:self_ordering_pos_system_flutter/models/order/Order.api.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'package:http/http.dart' as http;

class PaymentPopup extends StatefulWidget {
  final String type;
  const PaymentPopup({super.key, required this.type});

  @override
  State<PaymentPopup> createState() => _PaymentPopupState();
}

class _PaymentPopupState extends State<PaymentPopup> {
  late String link;
  late int orderNumber = 0;
  bool _isLoading = true;
  late Box<OrderLine> orderLineBox;

  @override
  void initState() {
    super.initState();
    orderLineBox = Hive.box<OrderLine>('orderLine');
    if (orderLineBox.length > 0) {
      executeOrder();
    } else {
      _isLoading = false;
    }
  }

  Future<void> executeOrder() async {
    int totalPriceOrder = orderLineBox.values.toList().fold(
        0, (int total, OrderLine orderLine) => total + orderLine.totalPrice);
    dynamic order = await OrderApi.createOrder(totalPriceOrder, widget.type);
    orderNumber = order['orderNumber'];
    for (int i = 0; i < orderLineBox.length; i++) {
      String additionals = '';
      for (int j = 0; j < orderLineBox.getAt(i)!.additionalOrder.length; j++) {
        additionals = additionals +
            ("${orderLineBox.getAt(i)!.additionalOrder[j].name} (${orderLineBox.getAt(i)!.additionalOrder[j].quantity}), ");
      }
      await OrderApi.createOrderLine(
          orderLineBox.getAt(i)!.id,
          order['_id'],
          orderLineBox.getAt(i)!.productPrice.id,
          additionals,
          orderLineBox.getAt(i)!.quantity,
          orderLineBox.getAt(i)!.totalPrice,
          orderLineBox.getAt(i)!.note);
    }
    dynamic paymentInfo = await OrderApi.createOrderPayment(order['_id']);
    // final response = await http.post(Uri.parse("https://cleanuri.com/api/v1/shorten"), body: {"url": paymentInfo['session']['url']});
    // print(response);
    // dynamic shorten = jsonDecode(response.body);
    // await http.get(Uri.parse("http://137.184.220.73:3001/order/emit"));
    setState(() {
      link = paymentInfo['session']['url'];
      _isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      child: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : Padding(
              padding: const EdgeInsets.all(20.0),
              child: Wrap(
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Container(
                        child: orderLineBox.length > 0
                            ? Column(
                                children: [
                                  RichText(
                                    text: TextSpan(
                                      text: 'លេខនៃការបញ្ជាទិញរបស់អ្នកគឺ ',
                                      style: const TextStyle(
                                          fontSize: 20, color: Colors.black),
                                      children: <TextSpan>[
                                        TextSpan(
                                          text: '$orderNumber',
                                          style: const TextStyle(
                                              fontWeight: FontWeight.bold,
                                              fontSize: 25),
                                        ),
                                        TextSpan(
                                            text:
                                                ' សូមស្កេន qr code ខាងក្រោមដើម្បីទូទាត់ប្រាក់'),
                                      ],
                                    ),
                                  ),
                                  Padding(
                                    padding: const EdgeInsets.symmetric(
                                        vertical: 20),
                                    child: QrImageView(
                                      data: link,
                                      size: 400,
                                    ),
                                  ),
                                ],
                              )
                            : const Column(
                                children: [
                                  Text(
                                    'Please choose some products before ordering.',
                                    style: TextStyle(fontSize: 30),
                                  ),
                                  Image(
                                      image:
                                          AssetImage('assets/empty-cart.png')),
                                ],
                              ),
                      ),
                      ElevatedButton(
                        onPressed: () => Navigator.pop(context, 'រួចរាល់'),
                        style: ElevatedButton.styleFrom(
                          primary: Colors.yellow
                              .shade800, // Background color for Add To Cart button
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(
                                10.0), // Adjust the value for roundness
                          ),
                        ),
                        child: Container(
                          width: 150,
                          height: 50,
                          alignment: Alignment.center,
                          child: const Text(
                            'រួចរាល់',
                            style: TextStyle(
                                color: Colors.white,
                                fontSize: 18.0,
                                fontWeight: FontWeight.bold),
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
    );
  }

  @override
  void dispose() {
    orderLineBox.clear();
    super.dispose();
  }
}
