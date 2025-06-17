 @echo off

rem Defina as variáveis para o caminho e a letra da unidade
set "Caminho=C:\Program Files\Foundry Virtual Tabletop"
set "LetraUnidade=E:"

rem Remova a unidade virtual se já existir
subst %LetraUnidade% /d  2>nul

rem Crie a unidade virtual com o caminho especificado
subst %LetraUnidade% "%Caminho%"

 
echo "Aguardando a criacao da unidade"
timeout /t 3 /nobreak 

rem Verifique se a criação foi bem-sucedida
if %errorlevel% equ 0 (
    echo Unidade virtual %LetraUnidade% criada e mapeada para %Caminho%
) else (
    echo Falha ao criar a unidade virtual %LetraUnidade%.
)


echo "Removendo arquivo-trava se existir"
rd /s /q "C:\Users\Public\Portables\Foundry\Config\options.json.lock"

echo "Carregando Foundry..." 
call "C:\Program Files\Foundry Virtual Tabletop\Foundry Virtual Tabletop.exe"