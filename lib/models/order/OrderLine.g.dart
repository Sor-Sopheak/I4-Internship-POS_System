// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'OrderLine.dart';

// **************************************************************************
// TypeAdapterGenerator
// **************************************************************************

class OrderLineAdapter extends TypeAdapter<OrderLine> {
  @override
  final int typeId = 0;

  @override
  OrderLine read(BinaryReader reader) {
    final numOfFields = reader.readByte();
    final fields = <int, dynamic>{
      for (int i = 0; i < numOfFields; i++) reader.readByte(): reader.read(),
    };
    return OrderLine(
      id: fields[0] as String,
      name: fields[1] as String,
      note: fields[2] as String,
      image: fields[3] as String,
      quantity: fields[4] as int,
      productPrice: fields[5] as ProductPrice,
      additionalOrder: (fields[6] as List).cast<ProductAdditionalOrder>(),
      totalPrice: fields[7] as int,
    );
  }

  @override
  void write(BinaryWriter writer, OrderLine obj) {
    writer
      ..writeByte(8)
      ..writeByte(0)
      ..write(obj.id)
      ..writeByte(1)
      ..write(obj.name)
      ..writeByte(2)
      ..write(obj.note)
      ..writeByte(3)
      ..write(obj.image)
      ..writeByte(4)
      ..write(obj.quantity)
      ..writeByte(5)
      ..write(obj.productPrice)
      ..writeByte(6)
      ..write(obj.additionalOrder)
      ..writeByte(7)
      ..write(obj.totalPrice);
  }

  @override
  int get hashCode => typeId.hashCode;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is OrderLineAdapter &&
          runtimeType == other.runtimeType &&
          typeId == other.typeId;
}
