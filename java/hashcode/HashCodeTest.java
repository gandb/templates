

import java.time.Duration;
import java.time.Instant;


public class HashCodeTest {
  public static void main(String args[]) {
        Instant start = Instant.now();

        long times = 1_000_000;//10^6;
        long count = 0;
        boolean continueLoop = true;
        int hashCode=0;
        String message = "teste";
         System.out.println("Test with " + times + "times" );
        while(continueLoop){
            count++;
            continueLoop = count< times;
            message+="teste"+count;
            hashCode = message.hashCode();  
        }

        Instant end = Instant.now();
        
        Duration duration = Duration.between(start, end);
        
        System.out.println("Tempo de execução: " + duration.toMillis() + " ms , last hashCode: " + hashCode);

  }
}