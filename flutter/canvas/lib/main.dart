import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

void main() {
  WidgetsFlutterBinding
      .ensureInitialized(); // this should be called after RendererBinding.instance?.setSemanticsEnabled(true);

  // Auto-enable accessibility for our Blind and Low Vision customers (see
  // https://docs.flutter.dev/development/accessibility-and-localization/accessibility#screen-readers).
  SemanticsBinding.instance.ensureSemantics();

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
      // showSemanticsDebugger: true,
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
          backgroundColor: Theme.of(context).colorScheme.inversePrimary,
          title: Text(widget.title)),
      body: Center(
        child: CustomPaint(
          painter: MyPainter(),
          child: Container(),
        ),
      ),
    );
  }
}

class MyPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()..color = Colors.blue;
    canvas.drawCircle(Offset(size.width / 2, size.height / 2), 50.0, paint);
  }

  @override
  //devolve verdadeiro se precisar ser repintado, se houver diferenças
  bool shouldRepaint(CustomPainter old) => false;
}
