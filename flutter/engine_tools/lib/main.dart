import 'package:flutter/material.dart';

void main() {
  runApp(const EngineTools());
}

class EngineTools extends StatelessWidget {
  const EngineTools({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        home: Scaffold(
      appBar: AppBar(
        title: const Center(child: Text("Engine Tools")),
      ),
      body: const Text("Hi!"),
    ));
  }
}
