import 'package:flutter/material.dart';

Directionality wrapDirectionality(Widget source) {
  return Directionality(textDirection: TextDirection.ltr, child: source);
}
