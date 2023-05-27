import 'package:flutter/material.dart';
import 'package:inherited_state/state_management.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        home: StateManagement(
            accountDTO: AccountDTO(name: ""), child: const MyHomePage()));
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  void _changeText(BuildContext context) {
    setState(() {
      StateManagement state = StateManagement.of(context);
      state.accountDTO.name = "O${state.accountDTO.name}";
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
          child: Text(
        "State: ${StateManagement.of(context).accountDTO.name}",
        style: Theme.of(context).textTheme.headlineMedium,
      )),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          _changeText(context);
        },
        tooltip: 'change text',
        child: const Icon(Icons.add),
      ),
    );
  }
}
