class JogoDaVelha:
    def __init__(self):
        self.tabuleiro = [[' ' for _ in range(3)] for _ in range(3)]
        self.jogador_atual = 'X'

    def __imprimeLinha(self,linha):
        index=0
        for coluna in linha:
            print(coluna if coluna!=' ' else "_",end="|" if index<2 else "")
            index+=1
        print("")
    
    def imprimir(self):
        for linha in self.tabuleiro:
            self.__imprimeLinha(linha)

    def jogar(self, linha, coluna):
        linha-=1
        coluna-=1
        if type(linha) != int or  type(coluna)!= int:
            return "A coluna e linha precisam ser numéricos" + type(linha)
        if linha < 0 or linha > 2 or coluna < 0 or coluna > 2:
            return "Linha ou posição incorretos"
        if self.tabuleiro[linha][coluna] != ' ':
            return "Já foi escolhido esta posição antes, escolha outra"
        
        if self.vencedor()!="":
            return "Existe um vencedor, o jogo não pode continuar"
        
        if self.tabuleiro[linha][coluna] == ' ':
            self.tabuleiro[linha][coluna] = self.jogador_atual
            self.jogador_atual = 'O' if self.jogador_atual == 'X' else 'X'
            return ""
        else:
            return "Erro inesperado"
    def checaVencedorNasLinhas(self):
        for linha in self.tabuleiro: 
            if linha[0] == linha[1] and linha[1] == linha[2] and linha[1]!= ' ':
                return linha[0]
        return ""
    def checaVencedorNasColunas(self):
        for coluna in range(0,2):
            if self.tabuleiro[0][coluna] == self.tabuleiro[1][coluna] \
                and self.tabuleiro[0][coluna] == self.tabuleiro[2][coluna] \
                    and self.tabuleiro[0][coluna]!= ' ':
                return self.tabuleiro[0][coluna]
        return ""
    def checaVencedorNasDiagonais(self):
        if(self.tabuleiro[0][0]==self.tabuleiro[1][1] \
            and self.tabuleiro[1][1]==self.tabuleiro[2][2]\
            and self.tabuleiro[1][1]!=' '):
            return self.tabuleiro[1][1]
        if(self.tabuleiro[0][2]==self.tabuleiro[1][1] \
            and self.tabuleiro[1][1]==self.tabuleiro[2][0])\
            and self.tabuleiro[1][1]!=' ':
            return self.tabuleiro[1][1]
        return ""
    def vencedor(self):
        ultimoTeste = self.checaVencedorNasLinhas() 
        if ultimoTeste  != "":
            return ultimoTeste
        ultimoTeste = self.checaVencedorNasDiagonais()
        if ultimoTeste != "":
            return ultimoTeste
        ultimoTeste = self.checaVencedorNasColunas()
        if ultimoTeste != "":
            return ultimoTeste
        return ""
    
    def empate(self):
        # verifica se o jogo empatou
        pass
 
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