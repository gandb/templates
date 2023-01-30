cd ..
cd ..
echo "Gerando pacote war"
mvn clean package -P tomcat -e -X
cd script\deploy