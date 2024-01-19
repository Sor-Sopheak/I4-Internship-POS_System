import 'dart:convert';
import 'package:self_ordering_pos_system_flutter/models/category.dart';
import 'package:http/http.dart' as http;

class CategoryApi {
  static Future<List<Category>> getCategory() async {
    final categoryResponse =
        await http.get(Uri.parse('http://137.184.220.73:3001/category/all'));

    List data = jsonDecode(categoryResponse.body);

    return Category.categoriesFromSnapshot(data);
  }
}
