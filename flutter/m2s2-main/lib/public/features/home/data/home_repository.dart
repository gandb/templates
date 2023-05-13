import 'package:app_francesinha/public/features/home/application/food_service.dart';
import 'package:app_francesinha/public/features/home/domain/food_item.dart';

class HomeRepository {
  late final List<FoodItem> _foodItems;

  HomeRepository(FoodService foodService) {
    _foodItems = foodService.generateFoodItems();
  }

  List<FoodItem> getAllFoodItems() {
    return _foodItems;
  }

  FoodItem getFoodItem(int index) {
    return _foodItems[index];
  }
}
