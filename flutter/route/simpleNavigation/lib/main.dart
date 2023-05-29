import 'package:flutter/material.dart';

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
  @override
  Widget build(BuildContext context) {
    NavigatorState nav = Navigator.of(context);
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
              InkWell(
                  child: Text(
                    "Contador",
                    style: Theme.of(context).textTheme.headlineMedium,
                  ),
                  onTap: () => nav.push(MaterialPageRoute(
                      builder: (context) => Scaffold(
                          appBar: const PreferredSize(
                            preferredSize: Size(200, 100),
                            child: Text("Barra"),
                          ),
                          body: InkWell(
                              child: const Text("Página 2"),
                              onTap: () => nav.pop()))))),
            ],
          ),
        ));
  }
}
