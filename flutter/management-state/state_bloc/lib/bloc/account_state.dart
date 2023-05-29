part of 'account_bloc.dart';

abstract class AccountState {
  String name;
  Stream<int> time;
  AccountState(this.name, this.time);
}

class AccountInitial extends AccountState {
  AccountInitial() : super("", _timeStream());

  static Stream<int> _timeStream() {
    return Stream<int>.periodic(const Duration(seconds: 1), (x) => x);
  }
}
