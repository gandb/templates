import 'package:app_francesinha/public/features/home/domain/food_item.dart';
import 'package:app_francesinha/public/features/home/presentation/widgets/list_menu_item_widget.dart';
import 'package:flutter/material.dart';

class ListMenuWidget extends StatelessWidget {
  const ListMenuWidget({
    super.key,
    this.items = const [],
  });

  final List<FoodItem> items;

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: items.length,
      itemBuilder: (context, index) {
        final item = items[index];
        return ListMenuItemWidget(
          image: item.image,
          title: item.title,
          subtitle: item.subtitle,
          price: item.price,
        );
      },
    );
  }
}
