import 'dart:io';

import 'package:flutter/material.dart';
import 'package:isar/isar.dart';
import 'package:isarexample/email.dart';
import 'package:path/path.dart' as path;

Future<String> get dbDir async {
  final String ret = path.join(Directory.current.path, '.dart_tool', 'isar');

  //cria o diretório se não existir
  await Directory(ret).create(recursive: true);

  return ret;
}

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  Future<void> runDatabaseTest() async {
    final isar = await Isar.open(
      [EmailSchema],
      directory: await dbDir,
    );

    //insere
    final oldEmail = Email();
    oldEmail.title = "Hoje esta belo1";
    oldEmail.id = 1;
    final newEmail = Email();
    newEmail.title = "Hoje esta belo2";
    newEmail.id = 2;

    //abre transação
    await isar.writeTxn(() async {
      await isar.emails.put(oldEmail); // insere ou atualiza se já existir
      await isar.emails.put(newEmail); // insere ou atualiza se já existir
    });

    Email? existingEmail = await isar.emails.get(newEmail.id);
    String title = existingEmail?.title ?? "";
    print("Email do banco era : $title");

    newEmail.id = 1;

    Email? existingOldEmail = await isar.emails.get(oldEmail.id);
    title = existingOldEmail?.title ?? "";
    print("Email do banco era : $title");
  }

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    runDatabaseTest();
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
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
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
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }
}
