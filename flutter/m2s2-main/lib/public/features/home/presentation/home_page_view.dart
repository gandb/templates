import 'package:app_francesinha/public/features/home/domain/food_item.dart';
import 'package:app_francesinha/public/features/home/presentation/widgets/list_menu_widget.dart';
import 'package:flutter/material.dart';

class HomePageView extends StatelessWidget {
  const HomePageView({super.key, this.items = const []});

  final List<FoodItem> items;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Expanded(
          child: Container(
            color: Colors.red,
          ),
        ),

        /// List Menu Widget
        Expanded(
          flex: 10,
          child: ListMenuWidget(items: items),
        )
      ],
    );
  }
}
