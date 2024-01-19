// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'ProductPrice.dart';

// **************************************************************************
// TypeAdapterGenerator
// **************************************************************************

class ProductPriceAdapter extends TypeAdapter<ProductPrice> {
  @override
  final int typeId = 1;

  @override
  ProductPrice read(BinaryReader reader) {
    final numOfFields = reader.readByte();
    final fields = <int, dynamic>{
      for (int i = 0; i < numOfFields; i++) reader.readByte(): reader.read(),
    };
    return ProductPrice(
      name: fields[0] as String,
      price: fields[1] as int,
      id: fields[2] as String,
    );
  }

  @override
  void write(BinaryWriter writer, ProductPrice obj) {
    writer
      ..writeByte(3)
      ..writeByte(0)
      ..write(obj.name)
      ..writeByte(1)
      ..write(obj.price)
      ..writeByte(2)
      ..write(obj.id);
  }

  @override
  int get hashCode => typeId.hashCode;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is ProductPriceAdapter &&
          runtimeType == other.runtimeType &&
          typeId == other.typeId;
}
