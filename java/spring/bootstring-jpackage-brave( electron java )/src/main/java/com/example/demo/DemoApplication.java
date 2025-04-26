package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;

@SpringBootApplication
public class DemoApplication {


	public static final String APP_NAME = "demo";
	public static final String APP_URL = "http://www.aie.com:7777/";


	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

}
