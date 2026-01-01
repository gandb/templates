public class Teste {
    public static void main(String[] args) {
        ClasseInterna interna = new Teste().new ClasseInterna();
        var variavelFlexivel = interna;

        variavelFlexivel.metodoInterno();
    }
    

    private class ClasseInterna {
        public void metodoInterno() {
            System.out.println("Método da classe interna");
        }
    }


}