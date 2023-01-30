from jogo_da_velha import JogoDaVelha;
 
 
if __name__ == "__main__":
    jogo = JogoDaVelha()

    jogo.imprimir()

    sair = False

    while not sair:
        print("Digite a sua jogada linha,coluna por exemplo, se quiser selecionar a primeira coluna e a primeira linha digite 1,1")
        partes=input().split(",")
        if partes[0] == 'sair':
            print("Jogo interrompido")
            break
        if len(partes) !=2:
            print("Entrada inválida"  )
            continue
        if not partes[0].isdigit()   or  not partes[1].isdigit()  :
            print("A coluna e linha precisam ser numéricos")
            continue
        resultado = jogo.jogar(int(partes[0]),int(partes[1]))
        if resultado != "":
            print(resultado)
        jogo.imprimir()
        if jogo.vencedor() != "":
            print("Temos um vencedor :" + jogo.vencedor() )
            sair=True