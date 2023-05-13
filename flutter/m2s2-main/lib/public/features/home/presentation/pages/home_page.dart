import 'package:app_francesinha/public/features/home/data/home_repository.dart';
import 'package:app_francesinha/public/features/home/presentation/home_page_view.dart';
import 'package:flutter/material.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key, this.homeRepository});

  final HomeRepository? homeRepository;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: HomePageView(
        items: homeRepository?.getAllFoodItems() ?? [],
      ),
    );
  }
}
