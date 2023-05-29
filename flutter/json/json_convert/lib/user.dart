class User {
  final String name;
  final String email;

  User({required this.name, required this.email});

  // Convert a User into a JSON map.
  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'email': email,
    };
  }

  // Create a User from a JSON map.
  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      name: json['name'],
      email: json['email'],
    );
  }
}
