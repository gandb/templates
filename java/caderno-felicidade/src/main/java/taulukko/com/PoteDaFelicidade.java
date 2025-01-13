package taulukko.com;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class PoteDaFelicidade {
    private static final int PRINT_MOMENTS = 5;

    public static void main(String[] args) {
        if (args.length != 1) {
            System.err.println("Number of moments is required.");
            return;
        }

        int numberOfHappyMoments = Integer.parseInt(args[0]);

        if (numberOfHappyMoments < PRINT_MOMENTS) {
            System.err.println("Insuficient number of moments");
            return;
        }

        Set<Integer> randomInts = new HashSet<>();
        while (randomInts.size() < PRINT_MOMENTS) {
            int rand = (int) Math.round(Math.random() * (numberOfHappyMoments-1)) + 1;
            randomInts.add(rand);
        }

        Integer[] sortedInts = randomInts.toArray(new Integer[0]);
        Arrays.sort(sortedInts);

        System.out.println("numberOfHappyMoments :" + numberOfHappyMoments);

        for (Integer i : sortedInts) {
            System.out.println("Pote:" + i);
        }
    }
}