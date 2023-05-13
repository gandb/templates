import 'package:app_francesinha/public/features/home/domain/food_item.dart';

class FoodService {
  List<FoodItem> generateFoodItems() {
    List<FoodItem> items = [];

    for (int i = 0; i < 12; i++) {
      items = [
        ...items,
        FoodItem(
          image: 'images/francesinha_$i.png',
          title: 'Francesinha $i',
          subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          price: "15",
        )
      ];
    }

    return items;
  }
}
