import 'dart:isolate';

import 'package:flutter/material.dart';

// Função de entrada para o Isolate filho.
void childIsolate(SendPort sendPort) async {
  // Criamos um ReceivePort para receber mensagens do Isolate principal.
  ReceivePort port = ReceivePort();

  // Informamos ao Isolate principal qual é a nossa porta de escuta.
  sendPort.send(port.sendPort);

  // Aguardamos pelas duas mensagens do Isolate principal.
  await for (var msg in port) {
    String data = msg[0];
    SendPort replyTo = msg[1];

    print('Isolate filho recebeu: $data');

    // Respondemos ao Isolate principal.
    replyTo.send('Isolate filho diz: Olá! [$data]');
  }
}

Future<void> main() async {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  void runIsolate() async {
    // Criamos um ReceivePort para receber mensagens do Isolate filho.
    ReceivePort receivePort = ReceivePort();
    ReceivePort receivePort2 = ReceivePort();

    // Criamos o Isolate filho e lhe passamos o SendPort do nosso ReceivePort.
    await Isolate.spawn(childIsolate, receivePort.sendPort);

    // O 'dart:isolate' é assíncrono, então temos que esperar pelo SendPort do Isolate filho.
    SendPort childSendPort = await receivePort.first;

    // Enviamos duas mensagens para o Isolate filho.
    childSendPort.send(['Primeira mensagem', receivePort2.sendPort]);
    childSendPort.send(['Segunda mensagem', receivePort2.sendPort]);

    // Aguardamos pelas respostas do Isolate filho.

    await for (var msg in receivePort2) {
      print(msg);
    }
  }

  @override
  Widget build(BuildContext context) {
    runIsolate();
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
