
import 'package:hive/hive.dart';

part 'ProductAdditionalOrder.g.dart';

@HiveType(typeId: 2)
class ProductAdditionalOrder {
  @HiveField(0)
  final String name;

  @HiveField(1)
  final int price;

  @HiveField(2)
  final String image;

  @HiveField(3)
  late int quantity;

  @HiveField(4)
  late int totalPrice;

  ProductAdditionalOrder(
      {required this.name, required this.price, required this.image, required this.quantity, required this.totalPrice});

  factory ProductAdditionalOrder.fromJson(dynamic json) {
    return ProductAdditionalOrder(
        name: json['name'] as String,
        price: json['price'] as int,
        image: json['image'] as String,
        quantity: json['quantity'] as int,
        totalPrice: json['totalPrice'] as int,
    );
  }

  static List<ProductAdditionalOrder> productAdditionalsFromSnapshot(List snapshot) {
    return snapshot.map((data) {
      return ProductAdditionalOrder.fromJson(data);
    }).toList();
  }

  @override
  String toString() {
    return 'ProductAdditionalOrder {name: $name, price: $price, image: $image, quantity: $quantity, totalPrice: $totalPrice}';
  }
}
