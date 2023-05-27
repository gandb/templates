import 'package:flutter/material.dart';
import 'package:manager_value_notifier/value_notifier_account.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    ValueNotifierAccount valueNotifierAccount = ValueNotifierAccount("teste");
    return MaterialApp(
        title: 'Flutter Demo',
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
          useMaterial3: true,
        ),
        home: ValueListenableBuilder(
            valueListenable: valueNotifierAccount,
            builder: (context, value, widget) {
              return Scaffold(
                body: Center(
                  child: Text(
                    '${valueNotifierAccount.getName()}-$value',
                    style: Theme.of(context).textTheme.headlineMedium,
                  ),
                ),

                floatingActionButton: FloatingActionButton(
                  onPressed: () {
                    valueNotifierAccount.setName("o");
                  },
                  tooltip: 'Increment',
                  child: const Icon(Icons.add),
                ), // This trailing comma makes auto-formatting nicer for build methods.
              );
            }));
  }
}
