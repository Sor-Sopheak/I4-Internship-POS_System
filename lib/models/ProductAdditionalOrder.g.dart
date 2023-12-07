// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'ProductAdditionalOrder.dart';

// **************************************************************************
// TypeAdapterGenerator
// **************************************************************************

class ProductAdditionalOrderAdapter
    extends TypeAdapter<ProductAdditionalOrder> {
  @override
  final int typeId = 2;

  @override
  ProductAdditionalOrder read(BinaryReader reader) {
    final numOfFields = reader.readByte();
    final fields = <int, dynamic>{
      for (int i = 0; i < numOfFields; i++) reader.readByte(): reader.read(),
    };
    return ProductAdditionalOrder(
      name: fields[0] as String,
      price: fields[1] as int,
      image: fields[2] as String,
      quantity: fields[3] as int,
      totalPrice: fields[4] as int,
    );
  }

  @override
  void write(BinaryWriter writer, ProductAdditionalOrder obj) {
    writer
      ..writeByte(5)
      ..writeByte(0)
      ..write(obj.name)
      ..writeByte(1)
      ..write(obj.price)
      ..writeByte(2)
      ..write(obj.image)
      ..writeByte(3)
      ..write(obj.quantity)
      ..writeByte(4)
      ..write(obj.totalPrice);
  }

  @override
  int get hashCode => typeId.hashCode;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is ProductAdditionalOrderAdapter &&
          runtimeType == other.runtimeType &&
          typeId == other.typeId;
}
