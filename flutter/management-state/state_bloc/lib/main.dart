import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'bloc/account_bloc.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: BlocProvider<AccountBloc>(
        create: (context) => AccountBloc(),
        child: const AccountPage(),
      ),
    );
  }
}

class AccountPage extends StatefulWidget {
  const AccountPage({super.key});

  @override
  State<AccountPage> createState() => _AccountPageState();
}

class _AccountPageState extends State<AccountPage> {
  @override
  Widget build(BuildContext context) {
    final AccountBloc accountBloc = BlocProvider.of<AccountBloc>(context);

    return Scaffold(
      appBar: AppBar(title: Text(accountBloc.state.name)),
      body: Center(
          child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
            Text('Name: ${accountBloc.state.name} '),
            StreamBuilder<int>(
              stream: accountBloc.state.time,
              builder: (context, snapshot) {
                if (snapshot.hasData) {
                  return Text('Time: ${snapshot.data}');
                } else if (snapshot.hasError) {
                  return Text('Erro: ${snapshot.error}');
                }
                // O snapshot ainda não tem dados no momento da primeira renderização.
                // Podemos retornar um placeholder.
                return const Text('Aguardando dados...');
              },
            )
          ])),
      floatingActionButton: Column(
        crossAxisAlignment: CrossAxisAlignment.end,
        mainAxisAlignment: MainAxisAlignment.end,
        children: <Widget>[
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 5.0),
            child: FloatingActionButton(
              child: const Icon(Icons.add),
              onPressed: () {
                setState(() {
                  context
                      .read<AccountBloc>()
                      .add(const AccountUpdate('Edson Vicente Carli Junior'));
//                accountBloc //também funciona desta forma
//                    .add(const AccountUpdate('Edson Vicente Carli Junior'));
                });
              },
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 5.0),
            child: FloatingActionButton(
              child: const Icon(Icons.remove),
              onPressed: () {},
            ),
          ),
        ],
      ),
    );
  }
}
