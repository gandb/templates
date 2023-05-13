import 'package:flutter/material.dart';

class EListMenuItemDart extends StatelessWidget {
  const EListMenuItemDart({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Image.asset("images/francesinha_01.png"),
        const Expanded(flex: 2, child: Text("teste")),
        const Expanded(child: Text("teste")),
      ],
    );
  }
}
