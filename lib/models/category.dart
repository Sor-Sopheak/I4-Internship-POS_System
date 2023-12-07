class Category {
  final String id;
  final String name;
  final String image;

  Category(
      {required this.name, required this.image, required this.id});

  factory Category.fromJson(dynamic json) {
    return Category(
        id: json['_id'] as String,
        name: json['name'] as String,
        image: json['image'] as String
      );
  }

  static List<Category> categoriesFromSnapshot(List snapshot) {
    return snapshot.map((data) {
      return Category.fromJson(data);
    }).toList();
  }

  @override
  String toString() {
    return 'Category {id: $id, name: $name, image: $image}';
  }
}
