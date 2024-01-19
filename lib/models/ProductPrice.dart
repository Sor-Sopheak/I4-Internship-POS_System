
import 'package:hive/hive.dart';

part 'ProductPrice.g.dart';

@HiveType(typeId: 1)
class ProductPrice {
  @HiveField(0)
  final String name;

  @HiveField(1)
  final int price;

  @HiveField(2)
  final String id;

  ProductPrice(
      {required this.name, required this.price, required this.id});

  factory ProductPrice.fromJson(dynamic json) {
    return ProductPrice(
        name: json['name'] as String,
        price: json['price'] as int,
      id: json['_id'] as String
    );
  }

  static List<ProductPrice> productPricesFromSnapshot(List snapshot) {
    return snapshot.map((data) {
      return ProductPrice.fromJson(data);
    }).toList();
  }

  @override
  String toString() {
    return 'ProductPrice {id: $id, name: $name, price: $price}';
  }
}
