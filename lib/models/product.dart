import 'package:self_ordering_pos_system_flutter/models/ProductPrice.dart';
import 'package:self_ordering_pos_system_flutter/models/ProductAdditional.dart';

class Product {
  final String id;
  final String name;
  final int price;
  final String image;
  final List<ProductPrice> prices;
  final List<ProductAdditional> additionals;

  Product(
      {required this.id, required this.name, required this.price, required this.image, required this.prices, required this.additionals});

  factory Product.fromJson(dynamic json) {
    List<ProductPrice> prices = [];
    List<dynamic> jsonPrices = json['prices'];

    for (var jsonPrice in jsonPrices) {
      prices.add(ProductPrice(name: jsonPrice['name'], price: jsonPrice['price'], id: jsonPrice['_id']));
    }

    List<ProductAdditional> additionals = [];
    List<dynamic> jsonAdditionals = json['additionalProducts'];

    for (var jsonAdditional in jsonAdditionals) {
      additionals.add(ProductAdditional(name: jsonAdditional['name'], price: jsonAdditional['price'], image: jsonAdditional['image']));
    }
    return Product(
        id: json['_id'] as String,
        name: json['name'] as String,
        image: json['image'] as String,
        price: json['price'] as int,
        prices: prices,
        additionals: additionals
    );
  }

  static List<Product> productsFromSnapshot(List snapshot) {
    return snapshot.map((data) {
      return Product.fromJson(data);
    }).toList();
  }

  @override
  String toString() {
    return 'Product {id: $id, name: $name, image: $image, price: $price, additionals: $additionals, prices: $prices}';
  }
}
