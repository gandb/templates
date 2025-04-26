package com.example.demo;

import java.io.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;


public class BrowserInstaller {


    public void install(){
        try {
            String zipFile = "/brave-portable.zip";

            String appDataPath = System.getProperty("user.home") + File.separator + "AppData" + File.separator + "Roaming";

            String browserBraveTempZipName = "brave-portable-temp.zip";

            File fileFinaZipFilePath = new File(appDataPath, browserBraveTempZipName);

            if (!copyFileFromResourcesToAppData(zipFile, fileFinaZipFilePath)) {
                System.out.println("Falha ao instalar o navegador...");
                System.exit(1);
            }


            System.out.println("Instalando o navegador brave portátil...");

            File finalPathFile = new File(appDataPath, DemoApplication.APP_NAME);
            createInstallationFolder(finalPathFile);
            unpackFile(fileFinaZipFilePath, finalPathFile);
            fileFinaZipFilePath.delete();
            System.out.println("Navegador instalado..." + fileFinaZipFilePath.getAbsolutePath());

        } catch (Exception e) {
            e.printStackTrace();
            System.exit(1);
        }
    }

    private static void createInstallationFolder(File finalPathFile) {
        boolean hasPreviousVersion = finalPathFile.exists();
        if (hasPreviousVersion) {
            finalPathFile.delete();
        }
        finalPathFile.mkdirs();
    }

    private static boolean copyFileFromResourcesToAppData(String source, File to) {
        try (InputStream inputStream = BrowserInstaller.class.getResourceAsStream(source);
             OutputStream outputStream = new FileOutputStream(to)) {

            if (inputStream == null) {
                System.out.println("Recurso não encontrado no JAR.");
                return false;
            }

            byte[] buffer = new byte[1024];
            int bytesLidos;
            while ((bytesLidos = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesLidos);
            }

            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    private static void unpackFile(File zipFile, File to) throws IOException {
        try (ZipInputStream zipInputStream = new ZipInputStream(new FileInputStream(zipFile))) {
            ZipEntry entry;
            while ((entry = zipInputStream.getNextEntry()) != null) {
                File arquivoDestino = new File(to, entry.getName());
                if (entry.isDirectory()) {
                    arquivoDestino.mkdirs();
                } else {
                    try (FileOutputStream fileOutputStream = new FileOutputStream(arquivoDestino)) {
                        byte[] buffer = new byte[1024];
                        int bytesLidos;
                        while ((bytesLidos = zipInputStream.read(buffer)) != -1) {
                            fileOutputStream.write(buffer, 0, bytesLidos);
                        }
                    }
                }
                zipInputStream.closeEntry();
            }
        }
    }
}
