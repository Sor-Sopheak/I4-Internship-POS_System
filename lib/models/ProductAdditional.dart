
import 'package:hive/hive.dart';

part 'ProductAdditional.g.dart';

@HiveType(typeId: 2)
class ProductAdditional {
  @HiveField(0)
  final String name;

  @HiveField(1)
  final int price;

  @HiveField(2)
  final String image;

  ProductAdditional(
      {required this.name, required this.price, required this.image});

  factory ProductAdditional.fromJson(dynamic json) {
    return ProductAdditional(
        name: json['name'] as String,
        price: json['price'] as int,
        image: json['image'] as String,
    );
  }

  static List<ProductAdditional> productAdditionalsFromSnapshot(List snapshot) {
    return snapshot.map((data) {
      return ProductAdditional.fromJson(data);
    }).toList();
  }

  @override
  String toString() {
    return 'ProductPrice {name: $name, price: $price, image: $image}';
  }
}
