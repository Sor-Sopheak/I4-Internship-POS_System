import 'package:self_ordering_pos_system_flutter/models/ProductPrice.dart';
import 'package:self_ordering_pos_system_flutter/models/product.dart';
import 'package:self_ordering_pos_system_flutter/models/ProductAdditionalOrder.dart';
import 'package:hive_flutter/hive_flutter.dart';

part 'OrderLine.g.dart';

@HiveType(typeId: 0)
class OrderLine {
  @HiveField(0)
  final String id;
  
  @HiveField(1)
  final String name;

  @HiveField(2)
  final String note;

  @HiveField(3)
  final String image;
  
  @HiveField(4)
  late int quantity;
  
  @HiveField(5)
  final ProductPrice productPrice;
  
  @HiveField(6)
  final List<ProductAdditionalOrder> additionalOrder;

  @HiveField(7)
  late int totalPrice;

   OrderLine ({required this.id, required this.name, required this.note, required this.image, required this.quantity, required this.productPrice, required this.additionalOrder, required this.totalPrice});

  @override
  String toString() {
    return 'OrderLine {id: $id, name: $name, image: $image, quantity: $quantity, note: $note, price: $productPrice, additionals: $additionalOrder, totalPrice: $totalPrice, product: product}';
  }

  void setQuantity(int newQuantity) {
    quantity = newQuantity;
  }
}