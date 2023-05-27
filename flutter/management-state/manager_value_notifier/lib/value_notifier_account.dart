import 'package:flutter/material.dart';

class ValueNotifierAccount extends ValueNotifier<String> {
  ValueNotifierAccount(this._name) : super(_name);
  late String _name;

  void setName(String value) {
    _name += value;
    notifyListeners();
  }

  String getName() {
    return _name;
  }
}
