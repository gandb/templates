import 'package:flutter/material.dart';

class StateManagement extends InheritedWidget {
  final AccountDTO accountDTO;
  const StateManagement(
      {super.key, required super.child, required this.accountDTO});

  static StateManagement? maybeOf(BuildContext context) {
    return context.dependOnInheritedWidgetOfExactType<StateManagement>();
  }

  static StateManagement of(BuildContext context) {
    StateManagement? stateManagement = StateManagement.maybeOf(context);

    assert(stateManagement != null, "No StateManagement found in the context");

    return stateManagement!;
  }

  @override
  bool updateShouldNotify(covariant StateManagement oldWidget) {
    bool ret = oldWidget.accountDTO.name != accountDTO.name ||
        oldWidget.accountDTO.password != accountDTO.password;
    return ret;
  }
}

class AccountDTO {
  String name;
  String? password;
  AccountDTO({required this.name, this.password});
}
