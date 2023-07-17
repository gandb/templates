import 'dart:async';

import 'package:flutter/material.dart';

void main() {
  //o código abaixo roda 1x por segundo
  const umSegundo = Duration(seconds: 1);
  Timer.periodic(umSegundo, (Timer t) => print('Um segundo passou!'));

  //o código abaixo roda 1x depois de 15 segundos e não roda novamente
  const delay = Duration(seconds: 15);
  Timer(delay, () {
    print('Depois de 15 segundos, esta linha será impressa.');
  });

  //os códigos de timer não são em threads separadas, como ocorre no JS
  //então cada bloco é rodado separadamente mas não em paralelo, e roda até o fim,
  // os dois blocos abiaxo de código abaixo jamais ocasionará erro
  //o bloco A: jamais será interrompido por um B: e vice versa
  const dezPercentDeSegundo = Duration(milliseconds: 100);
  Timer.periodic(dezPercentDeSegundo, (Timer t) {
    print('A: Códigos A rodam juntos');
    print('A: Nunca em separados');
  });

  const umPercentoDeSEgundo = Duration(milliseconds: 10);

  Timer.periodic(umPercentoDeSEgundo, (Timer t) {
    print('B: Códigos B rodam juntos');
    print('B: Nunca em separados');
  });

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
