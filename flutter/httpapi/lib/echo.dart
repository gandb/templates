// To parse this JSON data, do
//
//     final echo = echoFromMap(jsonString);

import 'dart:convert';

Echo echoFromMap(String str) => Echo.fromMap(json.decode(str));

String echoToMap(Echo data) => json.encode(data.toMap());

class Echo {
  Args? args;
  Headers? headers;
  String? url;

  Echo({
    this.args,
    this.headers,
    this.url,
  });

  factory Echo.fromMap(Map<String, dynamic> json) => Echo(
        args: Args.fromMap(json["args"]),
        headers: Headers.fromMap(json["headers"]),
        url: json["url"],
      );

  Map<String, dynamic> toMap() => {
        "args": args?.toMap(),
        "headers": headers?.toMap(),
        "url": url,
      };
}

class Args {
  Args();

  factory Args.fromMap(Map<String, dynamic> json) => Args();

  Map<String, dynamic> toMap() => {};
}

class Headers {
  String? xForwardedProto;
  String? xForwardedPort;
  String? host;
  String? xAmznTraceId;
  String? secChUa;
  String? secChUaMobile;
  String? secChUaPlatform;
  String? dnt;
  String? upgradeInsecureRequests;
  String? userAgent;
  String? accept;
  String? secFetchSite;
  String? secFetchMode;
  String? secFetchUser;
  String? secFetchDest;
  String? acceptEncoding;
  String? acceptLanguage;
  String? cookie;

  Headers({
    this.xForwardedProto,
    this.xForwardedPort,
    this.host,
    this.xAmznTraceId,
    this.secChUa,
    this.secChUaMobile,
    this.secChUaPlatform,
    this.dnt,
    this.upgradeInsecureRequests,
    this.userAgent,
    this.accept,
    this.secFetchSite,
    this.secFetchMode,
    this.secFetchUser,
    this.secFetchDest,
    this.acceptEncoding,
    this.acceptLanguage,
    this.cookie,
  });

  factory Headers.fromMap(Map<String, dynamic> json) => Headers(
        xForwardedProto: json["x-forwarded-proto"],
        xForwardedPort: json["x-forwarded-port"],
        host: json["host"],
        xAmznTraceId: json["x-amzn-trace-id"],
        secChUa: json["sec-ch-ua"],
        secChUaMobile: json["sec-ch-ua-mobile"],
        secChUaPlatform: json["sec-ch-ua-platform"],
        dnt: json["dnt"],
        upgradeInsecureRequests: json["upgrade-insecure-requests"],
        userAgent: json["user-agent"],
        accept: json["accept"],
        secFetchSite: json["sec-fetch-site"],
        secFetchMode: json["sec-fetch-mode"],
        secFetchUser: json["sec-fetch-user"],
        secFetchDest: json["sec-fetch-dest"],
        acceptEncoding: json["accept-encoding"],
        acceptLanguage: json["accept-language"],
        cookie: json["cookie"],
      );

  Map<String, dynamic> toMap() => {
        "x-forwarded-proto": xForwardedProto,
        "x-forwarded-port": xForwardedPort,
        "host": host,
        "x-amzn-trace-id": xAmznTraceId,
        "sec-ch-ua": secChUa,
        "sec-ch-ua-mobile": secChUaMobile,
        "sec-ch-ua-platform": secChUaPlatform,
        "dnt": dnt,
        "upgrade-insecure-requests": upgradeInsecureRequests,
        "user-agent": userAgent,
        "accept": accept,
        "sec-fetch-site": secFetchSite,
        "sec-fetch-mode": secFetchMode,
        "sec-fetch-user": secFetchUser,
        "sec-fetch-dest": secFetchDest,
        "accept-encoding": acceptEncoding,
        "accept-language": acceptLanguage,
        "cookie": cookie,
      };
}
