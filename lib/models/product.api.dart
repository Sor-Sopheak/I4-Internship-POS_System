import 'dart:convert';
import 'package:self_ordering_pos_system_flutter/models/product.dart';
import 'package:http/http.dart' as http;

class ProductApi {
  static Future<List<Product>> getProduct() async {
    final productResponse =
        await http.get(Uri.parse('http://137.184.220.73:3001/product/visible'));
    List data = jsonDecode(productResponse.body);
    return Product.productsFromSnapshot(data);
  }

  static Future<Product> getOneProduct(String id) async {
    final productResponse =
        await http.get(Uri.parse('http://137.184.220.73:3001/product/$id'));
    dynamic data = jsonDecode(productResponse.body);
    return Product.fromJson(data);
  }

  static Future<List<Product>> getProductByCategory(String id) async {
    final productResponse = await http
        .get(Uri.parse('http://137.184.220.73:3001/product/category/$id'));
    List data = jsonDecode(productResponse.body);
    return Product.productsFromSnapshot(data);
  }
}
