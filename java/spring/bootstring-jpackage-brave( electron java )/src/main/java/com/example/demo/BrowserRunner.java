package com.example.demo;

import java.io.*;
import java.util.ArrayList;
import java.util.List;


public class BrowserRunner  {
    private Process process;

    public void run(){
        Thread thread = new Thread(this::start);
        thread.start();
    }

    private void start(){
        try {
            System.out.println("Inicializando o " + DemoApplication.APP_NAME +  "...");

            String appDataPath = System.getProperty("user.home") + File.separator + "AppData" + File.separator + "Roaming" + File.separator + DemoApplication.APP_NAME + File.separator + "brave-portable" + File.separator + "brave-portable.exe"  ;
            //,"--headless"
            //"--incognito"
            //"--single-process",
            executeProcess(appDataPath,"--disable-extensions",
                    "--start-maximized","--no-first-run","--ignore-certificate-errors",
                    "--disable-plugins","--disable-https-everywhere","--disable-web-security","--kiosk",
                    "--disable-brave-ads","--disable-crypto-wallet","--disable-breadcrumbs" , DemoApplication.APP_URL);
        } catch (Exception e) {
            e.printStackTrace();
            System.exit(1);
        }
    }

    public void stop(){
        try {
            killProccess(process);
        } catch (Exception e) {
            e.printStackTrace();
            System.exit(1);
        }
    }

    private  void killProccess(Process process) throws IOException {

        long pid = process.pid();
        String comando = "taskkill /PID " + pid + " /T /F";
        ProcessBuilder builder = new ProcessBuilder("cmd.exe", "/c", comando);
        builder.inheritIO(); // opcional, para ver a saída
        builder.start();
    }


    private void executeProcess(String execPath, String ...args) {
        try {
            List<String> command = new ArrayList<>();
            command.add(execPath);
            command.addAll(List.of( args));

            ProcessBuilder processBuilder = new ProcessBuilder(command);

            process = processBuilder.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));

            String line;
            while ((line = reader.readLine()) != null) {
               System.out.println(line);
            }

            int exitCode = process.waitFor();
            System.out.println("O processo terminou com código de saída: " + exitCode);

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }

}
