part of 'account_bloc.dart';

@immutable
abstract class AccountEvent {
  const AccountEvent();
}

class AccountUpdate extends AccountEvent {
  final String name;

  const AccountUpdate(this.name) : super();
}
