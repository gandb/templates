// ignore_for_file: library_private_types_in_public_api

import 'package:flutter/material.dart';

void main() {
  runApp(const AnimationSample());
}

class AnimationSample extends StatefulWidget {
  const AnimationSample({Key? key}) : super(key: key);

  @override
  _AnimationSampleState createState() => _AnimationSampleState();
}

class _AnimationSampleState extends State<AnimationSample>
    with SingleTickerProviderStateMixin {
  late final AnimationController controller = AnimationController(
    duration: const Duration(seconds: 2),
    vsync: this,
  )..repeat();

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: RotationTransition(
            turns: Tween(begin: 0.0, end: 1.0).animate(
                controller), // isso vai rotacionar o widget de 0 a 360 graus em 2 segundos

            child: const FlutterLogo(size: 200),
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }
}
