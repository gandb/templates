import datetime;

name = "Edson Vicente Carli Junior"
age = 45
today = datetime.datetime.now()
today = datetime.date(today.year,today.month,today.day)


if str(today)=="2022-12-29":
    print("Hello, " + name + " hoje você faz " + str(age) + " anos de vida!")
else:
    print("Hello World!");
