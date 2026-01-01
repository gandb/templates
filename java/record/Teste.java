public class Teste {
    public static void main(String[] args) { 
        PC pc = new PC("Minsc", 30);
        pc.display();
        System.out.println("Movimento " + pc.movement);
        try{
            //commo é imutável, isto dá erro ao compilar,descomente para testar
            //pc.movement = 32;
        }catch(Exception e){
            System.out.println("Erro: " + e.getMessage());
        }
    }


   record PC(String name, Integer movement) extends Character { 
         void display() {
              System.out.println("PC Name: " + name + ", Movement: " + movement);
         }
    } 

    record Character(String name) { 
       
    } 
    
}