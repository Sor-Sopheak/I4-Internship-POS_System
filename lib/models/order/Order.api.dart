import 'dart:convert';
import 'package:http/http.dart' as http;

class OrderApi {
  static Future<Map<String, dynamic>> createOrder(
      int totalPrice, String type) async {
    final Map<String, dynamic> data = {
      'totlaPrice': totalPrice,
      'type': type,
    };

    final orderResponse = await http.post(
      Uri.parse('http://137.184.220.73:3001/order/create'),
      headers: {
        'Content-Type': 'application/json', // Adjust content type as needed.
      },
      body: jsonEncode(data),
    );

    return jsonDecode(orderResponse.body);
  }

  static Future<Map<String, dynamic>> createOrderLine(
      String productId,
      String orderId,
      String priceId,
      String additionals,
      int quantity,
      int totalPrice,
      String note) async {
    final Map<String, dynamic> data = {
      'productId': productId,
      'orderId': orderId,
      'priceId': priceId,
      'additionals': additionals,
      'quantity': quantity,
      'totalPrice': totalPrice,
      'note': note
    };

    final orderResponse = await http.post(
      Uri.parse('http://137.184.220.73:3001/order-line/create'),
      headers: {
        'Content-Type': 'application/json', // Adjust content type as needed.
      },
      body: jsonEncode(data),
    );

    return jsonDecode(orderResponse.body);
  }

  static Future<Map<String, dynamic>> createOrderPayment(String orderId) async {
    final Map<String, dynamic> data = {'orderId': orderId};

    final orderResponse = await http.post(
      Uri.parse('http://137.184.220.73:3001/payment/create'),
      headers: {
        'Content-Type': 'application/json', // Adjust content type as needed.
      },
      body: jsonEncode(data),
    );

    return jsonDecode(orderResponse.body);
  }
}
