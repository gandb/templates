import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await EasyLocalization.ensureInitialized();
  runApp(EasyLocalization(
    supportedLocales: const [Locale('en', 'US'), Locale('pt', 'BR')],
    fallbackLocale: const Locale('pt', 'BR'),
    startLocale: const Locale('pt', 'BR'),
    path: 'resources/langs',
    child: const MyApp(),
  ));
  // saveLocale: false,
  // useOnlyLangCode: true,

  // optional assetLoader default used is RootBundleAssetLoader which uses flutter's assetloader
  // install easy_localization_loader for enable custom loaders
  // assetLoader: RootBundleAssetLoader()
  // assetLoader: HttpAssetLoader()
  // assetLoader: FileAssetLoader()
  // assetLoader: CsvAssetLoader()
  // assetLoader: YamlAssetLoader() //multiple files
  // assetLoader: YamlSingleAssetLoader() //single file
  // assetLoader: XmlAssetLoader() //multiple files
  // assetLoader: XmlSingleAssetLoader() //single file
  // assetLoader: CodegenLoader()));
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      localizationsDelegates: context.localizationDelegates,
      title: "title",
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
      locale: context.locale,
      supportedLocales: context.supportedLocales,
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
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(context.tr("gender", args: ["Angelica"], gender: "female")),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text(
              'msg_mixed',
            ).tr(args: ["Teste"], namedArgs: Map.from({"lang": "pt-br"})),
            Text(
              'teste',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ),
    );
  }
}
