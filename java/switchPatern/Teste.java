public class Teste {
    public static void main(String[] args) {
        Teste teste = new Teste(); 
        

       Object pc = teste.new PC();

       switch (pc) {
           case PC p -> p.run();
           case NPC n -> n.atack();
           default -> System.out.println("default");
       }

        Object npc = teste.new NPC();

       switch (npc) {
           case PC p -> p.run();
           case NPC n -> n.atack();
           default -> System.out.println("default");
       }

        var algo = switch (npc) {
           case PC p -> p.toString();
           case NPC n -> "NPC";
           default -> "default";
       };

       IO.println("Algo é " + algo);

    }

    private class PC {
        void run() {
            System.out.println("run");
        }
        public String toString() {
            return "PC";
        } 
    }

     private class NPC {
        void atack() {
            System.out.println("atack");
        }
         public String toString() {
            return  "NPC";
        } 
    }
}