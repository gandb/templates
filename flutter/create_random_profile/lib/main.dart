import 'dart:convert' as convert;
import 'package:create_random_profile/profile.dart';
import 'package:create_random_profile/user.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    const String title = 'Gere uma pessoa aleatória usando a api randomuser.me';
    return MaterialApp(
      title: title,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: title),
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
  User? _user;
  final Client _client = Client();

  Uri get _url => Uri.https("randomuser.me", "/api");

  void _getData() async {
    Response response = await _client.get(_url);
    setState(() {
      _user = User.fromMap(convert.jsonDecode(response.body.toString()));
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          backgroundColor: Theme.of(context).colorScheme.inversePrimary,
          title: Text(widget.title),
        ),
        body: Profile(user: _user),
        bottomNavigationBar: ButtonBar(
          alignment: MainAxisAlignment.center,
          children: [
            TextButton(
              onPressed: _getData,
              child: Container(
                  padding: const EdgeInsets.all(8.0),
                  decoration: BoxDecoration(
                    color: Colors.blue,
                    borderRadius:
                        BorderRadius.circular(15), // borda arredondada
                    border: Border.all(
                        color: Colors.blue,
                        width: 2), // cor e espessura da borda
                  ),
                  child: const Text(
                    "Gerar nova Pessoa",
                    style: TextStyle(
                      color: Colors
                          .white, // Aqui você pode definir a cor do texto.
                    ),
                  )),
            )
          ],
        ));
  }
}
