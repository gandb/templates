import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

void main() {
  runApp(const ProviderScope(child: MyApp()));
}

class HelloWorldNotifier extends StateNotifier<String> {
  HelloWorldNotifier() : super('Hello, World');

  void changeToPortuguese() {
    state = 'Olá, Mundo';
  }
}

final helloWorldProvider = StateNotifierProvider<HelloWorldNotifier, String>(
    (ref) => HelloWorldNotifier());

class MyApp extends ConsumerWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: Text(ref.watch(helloWorldProvider)),
        ),
        floatingActionButton: FloatingActionButton(
            child: const Text("+"),
            onPressed: () {
              ref.read(helloWorldProvider.notifier).changeToPortuguese();
            }),
      ),
    );
  }
}
