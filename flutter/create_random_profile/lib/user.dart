// To parse this JSON data, do
//
//     final user = userFromMap(jsonString);

import 'dart:convert';

User userFromMap(String str) => User.fromMap(json.decode(str));

String userToMap(User data) => json.encode(data.toMap());

class User {
  List<Result> results;

  User({
    required this.results,
  });

  factory User.fromMap(Map<String, dynamic> json) => User(
        results:
            List<Result>.from(json["results"].map((x) => Result.fromMap(x))),
      );

  Map<String, dynamic> toMap() => {
        "results": List<dynamic>.from(results.map((x) => x.toMap())),
      };
}

class Result {
  String gender;
  Name name;
  String email;
  Login login;
  Dob dob;
  String phone;
  Picture picture;
  String nat;

  Result({
    required this.gender,
    required this.name,
    required this.email,
    required this.login,
    required this.dob,
    required this.phone,
    required this.picture,
    required this.nat,
  });

  factory Result.fromMap(Map<String, dynamic> json) => Result(
        gender: json["gender"],
        name: Name.fromMap(json["name"]),
        email: json["email"],
        login: Login.fromMap(json["login"]),
        dob: Dob.fromMap(json["dob"]),
        phone: json["phone"],
        picture: Picture.fromMap(json["picture"]),
        nat: json["nat"],
      );

  Map<String, dynamic> toMap() => {
        "gender": gender,
        "name": name.toMap(),
        "email": email,
        "login": login.toMap(),
        "dob": dob.toMap(),
        "phone": phone,
        "picture": picture.toMap(),
        "nat": nat,
      };
}

class Dob {
  DateTime date;
  int age;

  Dob({
    required this.date,
    required this.age,
  });

  factory Dob.fromMap(Map<String, dynamic> json) => Dob(
        date: DateTime.parse(json["date"]),
        age: json["age"],
      );

  Map<String, dynamic> toMap() => {
        "date": date.toIso8601String(),
        "age": age,
      };
}

class Login {
  String uuid;
  String username;
  String password;
  String salt;
  String md5;
  String sha1;
  String sha256;

  Login({
    required this.uuid,
    required this.username,
    required this.password,
    required this.salt,
    required this.md5,
    required this.sha1,
    required this.sha256,
  });

  factory Login.fromMap(Map<String, dynamic> json) => Login(
        uuid: json["uuid"],
        username: json["username"],
        password: json["password"],
        salt: json["salt"],
        md5: json["md5"],
        sha1: json["sha1"],
        sha256: json["sha256"],
      );

  Map<String, dynamic> toMap() => {
        "uuid": uuid,
        "username": username,
        "password": password,
        "salt": salt,
        "md5": md5,
        "sha1": sha1,
        "sha256": sha256,
      };
}

class Name {
  String title;
  String first;
  String last;

  Name({
    required this.title,
    required this.first,
    required this.last,
  });

  factory Name.fromMap(Map<String, dynamic> json) => Name(
        title: json["title"],
        first: json["first"],
        last: json["last"],
      );

  Map<String, dynamic> toMap() => {
        "title": title,
        "first": first,
        "last": last,
      };
}

class Picture {
  String large;
  String medium;
  String thumbnail;

  Picture({
    required this.large,
    required this.medium,
    required this.thumbnail,
  });

  factory Picture.fromMap(Map<String, dynamic> json) => Picture(
        large: json["large"],
        medium: json["medium"],
        thumbnail: json["thumbnail"],
      );

  Map<String, dynamic> toMap() => {
        "large": large,
        "medium": medium,
        "thumbnail": thumbnail,
      };
}
