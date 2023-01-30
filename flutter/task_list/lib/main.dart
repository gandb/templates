import 'package:flutter/material.dart';

void main() {
  runApp(const TaskList());
}

class TaskList extends StatelessWidget {
  const TaskList({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
          appBar: AppBar(title: const Text("Teste")),
          body: const Text("teste1")),
    );
  }
}
