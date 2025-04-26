# Verifica se jpackage está no PATH
if (-not (Get-Command jpackage -ErrorAction SilentlyContinue)) {
    Write-Error "Erro: 'jpackage' não encontrado no PATH. Certifique-se de que o JDK com suporte ao jpackage está instalado e configurado."
    exit -1
}

# Verifica se WiX (light.exe) está no PATH
if (-not (Get-Command light.exe -ErrorAction SilentlyContinue)) {
    Write-Error "Erro: 'light.exe' (WiX Toolset) não encontrado no PATH. Instale o WiX Toolset e adicione o diretório 'bin' ao PATH."
    exit -1
}
$appName = "DemoApplication"
$version = "1.0"
$appNameWithVersion = "DemoApplication-${version}"
$fileName = "${appNameWithVersion}.exe"
$installFileName = "${appNameWithVersion}-Install.exe"

Write-Host "Instalando pacote java"
mvn package

Write-Host "Criando instalador java"
jpackage `
  --input target/ `
  --main-jar demo-0.0.1-SNAPSHOT.jar `
  --name ${appName} `
  --type exe `
  --icon src/main/resources/images/game.ico `
  --java-options "-Xmx512m" `
  --win-dir-chooser `
  --win-menu `
  --win-shortcut `
  --win-console

if (Test-Path "${installFileName}") {
    Remove-Item "${installFileName}" -Force
}

Rename-Item "${fileName}" "${installFileName}"