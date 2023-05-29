import 'package:bloc/bloc.dart';
import 'package:flutter/material.dart';
import 'package:meta/meta.dart';

part 'account_event.dart';
part 'account_state.dart';

class AccountBloc extends Bloc<AccountEvent, AccountState> {
  AccountBloc() : super(AccountInitial()) {
    on<AccountEvent>((event, emit) {
      //Todos os eventos passarão também por aqui
    });
    on<AccountUpdate>((event, emit) {
      final String name = '${state.name}:${event.name}';
      print(name);
      emit(AccountInitial()..name = name);
    });
  }
}
