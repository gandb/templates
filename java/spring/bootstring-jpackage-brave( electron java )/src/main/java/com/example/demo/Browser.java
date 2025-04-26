package com.example.demo;

import java.io.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;


public class Browser {

    public static void main(String argsv[]) throws InterruptedException {
        BrowserInstaller browserInstaller = new BrowserInstaller();
        browserInstaller.install();
        BrowserRunner browserRunner = new BrowserRunner();
        browserRunner.run();
        Thread.sleep(10000);
        browserRunner.stop();
    }

}
