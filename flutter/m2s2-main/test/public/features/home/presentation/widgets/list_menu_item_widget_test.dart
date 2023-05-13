import 'package:app_francesinha/public/features/home/presentation/widgets/list_menu_item_widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import '../../../../../test_utils.dart';

void main() {
  group("list menu item widget", () {
    testWidgets('with image', (tester) async {
      Widget listMenuItemWidget = wrapDirectionality(const ListMenuItemWidget(
          image: "images/francesinha_01.png",
          title: "title",
          subtitle: "subtitle",
          price: "price"));
      await tester.pumpWidget(listMenuItemWidget);
      final imageFounded = find.byType(Image);
      expect(imageFounded, findsOneWidget);
    });

    testWidgets('with no image', (tester) async {
      Widget listMenuItemWidget = wrapDirectionality(const ListMenuItemWidget(
          image: "", title: "title", subtitle: "subtitle", price: "price"));
      await tester.pumpWidget(listMenuItemWidget);
      final imageFounded = find.byType(Placeholder);
      expect(imageFounded, findsOneWidget);
    });

    testWidgets('correctly title', (tester) async {
      Widget listMenuItemWidget = wrapDirectionality(const ListMenuItemWidget(
          image: "", title: "title", subtitle: "subtitle", price: "price"));
      await tester.pumpWidget(listMenuItemWidget);
      final founded = find.byWidgetPredicate(
          (widget) => widget is Text && widget.data == "title");
      expect(founded, findsOneWidget);
    });
  });
}
