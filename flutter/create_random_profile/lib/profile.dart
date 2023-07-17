import 'package:create_random_profile/user.dart';
import 'package:flutter/material.dart';

class Profile extends StatelessWidget {
  const Profile({
    super.key,
    User? user,
  }) : _user = user;

  final User? _user;

  @override
  Widget build(BuildContext context) {
    Image image = Image.network(
        (_user == null)
            ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            : _user!.results.first.picture.large,
        width: MediaQuery.of(context).size.width * 0.25,
        fit: BoxFit.fitHeight);

    return Container(
        margin: const EdgeInsets.all(15.0),
        decoration: BoxDecoration(
            color: Colors.lightBlue, borderRadius: BorderRadius.circular(15.0)),
        child: Center(
          child: Row(
            children: [
              Expanded(
                  flex: 1,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      ClipRRect(
                          borderRadius:
                              const BorderRadius.all(Radius.circular(15.0)),
                          child: image),
                      Text(
                        (_user == null)
                            ? "Não carregado"
                            : _user!.results.first.login.username,
                        style: Theme.of(context).textTheme.headlineMedium,
                      ),
                    ],
                  )),
              Expanded(
                  flex: 2,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      Text(
                        "Contato:",
                        style: Theme.of(context).textTheme.headlineMedium,
                      ),
                      Text(
                        (_user == null)
                            ? "Não carregado"
                            : _user!.results.first.email,
                        style: Theme.of(context).textTheme.headlineMedium,
                      ),
                      Text(
                        (_user == null)
                            ? "Não carregado"
                            : _user!.results.first.phone,
                        style: Theme.of(context).textTheme.headlineMedium,
                      ),
                    ],
                  ))
            ],
          ),
        ));
  }
}
