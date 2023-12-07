import 'package:flutter/material.dart';

import '../../models/category.dart';

class CategoryWidget extends StatelessWidget {
  final Category category;
  final Function onPress;

  const CategoryWidget(
      {super.key, required this.category, required this.onPress});

  @override
  Widget build(BuildContext context) {
    return TextButton(
      onPressed: () {
        onPress();
      },
      style: TextButton.styleFrom(padding: EdgeInsets.zero),
      child: Container(
        padding: const EdgeInsets.all(5),
        margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 5),
        width: MediaQuery.of(context).size.width,
        height: MediaQuery.of(context).size.height * 0.16,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(15),
          color: const Color(0xffffbf00).withOpacity(0.1),
          border: Border.all(color: Colors.yellow, width: 1),
        ),

        child: Stack(
          children: [
            Align(
              alignment: Alignment.bottomCenter,
              child: Padding(
                padding: const EdgeInsets.only(bottom: 5.0, top: 5.0),
                child: Text(
                  category.name,
                  style: const TextStyle(
                    color: Colors.black,
                    fontSize: 19,
                  ),
                  overflow: TextOverflow.ellipsis,
                  maxLines: 2,
                  textAlign: TextAlign.start,
                ),
              ),
            ),
            Center(
              child: Container(
                  constraints: BoxConstraints(
                    maxWidth: MediaQuery.of(context).size.width * 0.90,
                  ),
                  margin: const EdgeInsets.only(bottom: 24.0),
                  child: FittedBox(
                    fit: BoxFit.contain,
                    child: Image.network(
                      'http://137.184.220.73:3001/static/get${category.image.substring(1)}',
                    ),
                  )),
            ),
          ],
        ),
        // ),
      ),
    );
  }
}
