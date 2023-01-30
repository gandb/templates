import pandas as pd #para manipuar csv
#ai , instale antes o modulo scikit-learn e sklearn
from sklearn.model_selection import train_test_split 
import tensorflow as tf

def main():
   print("Hello World")

   dataset = pd.read_csv('cancer.csv')

   #pega todas as collunas exceto a primeira de diagnostico (result data)
   x = dataset.drop(columns=['diagnosis(1=m, 0=b)'])
   #pega a primeira coluna e coloca em y (input data)
   y = dataset["diagnosis(1=m, 0=b)"]
   #train test split divide a massa de teste e treino, separando 20% pra teste e o resto pra treino
   x_train, x_test, y_train, y_test = train_test_split(x,y,test_size=0.2)
   #criando o modelo
   model = tf.keras.models.Sequential()
   #criando 256 neuronios de input
  
   model.add(tf.keras.layers.Dense(256,input_shape=(x_train.shape[1],x_train.shape[1]), activation="sigmoid"))
   #criando 256 neuronios intermediarios
   model.add(tf.keras.layers.Dense(256,  activation="sigmoid"))
   #criando 1 neuronio de saída
   model.add(tf.keras.layers.Dense(1, activation="sigmoid"))
   #agora é compilado o nosso modelo, é passado como parametro alguns alguritimos que podem ser otimizados conforme o modelo desejado
   model.compile(optimizer='adam',loss='binary_crossentropy',metrics='accuracy')
   #hora de treinar o nosso modelo (epochs é a quantidade de vezes que vai ser treinado)
   model.fit(x_train,y_train,epochs=125)
   #agora comparar (ou rodar) como ele se dá com a base de teste
   model.evaluate(x_test,y_test) 
   #Falta aprender:
   # 1-) Como ele me dizer dado uma entrada a saída, não ficou claro neste exemplo como é feito isto (visto que eu dou o resultado)
   # 2-) Como salvar o modelo pra não ter que treinar a cada uso
   # 3-) Aprender a pegar um modelo ja treinado e treiná-lo ainda mais
   # 4-) Entender melhor os algoritmos que o tensorflow ele tem
   # 5-) Descobrir a se achar na documentação
   # 6-) Aprender a usar o tensorflow no javascript 
if __name__ == "__main__":
    main()