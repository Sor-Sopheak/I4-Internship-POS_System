import 'package:flutter/material.dart';
import 'package:self_ordering_pos_system_flutter/models/ProductAdditional.dart';
import 'package:self_ordering_pos_system_flutter/models/ProductAdditionalOrder.dart';
import 'package:self_ordering_pos_system_flutter/models/ProductPrice.dart';
import 'package:self_ordering_pos_system_flutter/models/order/OrderLine.dart';
import 'package:self_ordering_pos_system_flutter/models/product.dart';
import 'package:self_ordering_pos_system_flutter/pages/home_page.dart';
import 'package:path_provider/path_provider.dart' as path;
import 'package:hive/hive.dart';
import 'package:hive_flutter/hive_flutter.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  final dir = await path.getApplicationDocumentsDirectory();
  Hive.init(dir.path);
  Hive.initFlutter('hive_db');

  Hive.registerAdapter<OrderLine>(OrderLineAdapter());
  Hive.registerAdapter<ProductPrice>(ProductPriceAdapter());
  Hive.registerAdapter<ProductAdditionalOrder>(ProductAdditionalOrderAdapter());
  await Hive.openBox<OrderLine>('orderLine');
  // Hive.close();

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});


  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Client App',
      debugShowCheckedModeBanner: false,
      home: HomePage(),
    );
  }
}
