import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:json_convert/account.dart';
import 'package:json_convert/user.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  String _json = "";
  int _teste = 0;

  void _printJSON() {
    _teste++;
    User user = User(name: 'John Doe$_teste', email: 'john.doe@example.com');
    Account account =
        Account(name: 'John Doe$_teste', email: 'john.doe@example.com');

    //String s = jsonEncode(account);//não funciona pois não tem implementado
    //a função toJson
    String jsonString = jsonEncode(user); //funciona

    setState(() {
      _json = jsonString;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text(
              'JSON',
            ),
            Text(
              _json,
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _printJSON,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }
}
