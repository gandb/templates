import 'package:app_francesinha/public/features/home/application/food_service.dart';
import 'package:app_francesinha/public/features/home/data/home_repository.dart';
import 'package:app_francesinha/public/features/home/presentation/pages/home_page.dart';
import 'package:flutter/material.dart';

class RestaurantApp extends StatelessWidget {
  const RestaurantApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Restaurant App',
      theme: ThemeData(
        primarySwatch: Colors.red,
      ),
      home: HomePage(
        homeRepository: HomeRepository(FoodService()),
      ),
    );
  }
}
