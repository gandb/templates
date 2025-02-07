package com.taulukko;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class PoteDaFelicidade {
    private static final int PRINT_MOMENTS = 5;

    public static void errorLog(String message){
        System.err.println( """
                ${message} :: USAGE PoteDaFelicidade <numberOfMoments> [sortType] 
                 <numberOfMoments> := ASCII | NATURAL (ASCII is default) 
                <sortType> := ASCII | NATURAL (ASCII is default)""");
    }

    public static void main(String[] args) {
        boolean isNatural = true;

        if (args.length <1) {
            PoteDaFelicidade.errorLog("NumberOfMoments is required");
             return;
        }

        int numberOfHappyMoments = Integer.parseInt(args[0]);

        if (numberOfHappyMoments < PRINT_MOMENTS) {
            PoteDaFelicidade.errorLog("Insuficient number of moments");
            return;
        }

        boolean hasSortType = args.length > 1;
        boolean unknownType = false;

        if (hasSortType )
        {
            isNatural=args[1].trim().equalsIgnoreCase("NATURAL");
            unknownType =  !isNatural && !args[1].trim().equalsIgnoreCase("ASCII" );
            if ( unknownType)
            {
                PoteDaFelicidade.errorLog("Sorter type unknowladge");
                return;
            }
        }


        Set<Integer> randomInts = new HashSet<>();
        while (randomInts.size() < PRINT_MOMENTS) {
            int rand = (int) Math.round(Math.random() * (numberOfHappyMoments-1)) + 1;
            randomInts.add(rand);
        }

        Integer[] sortedInts = randomInts.toArray(new Integer[0]);

        if(isNatural)
        {
            Arrays.sort(sortedInts);
        }
        else  {
            Arrays.sort(sortedInts,(a,b)->String.valueOf(a).compareTo( String.valueOf(b)));
        }

        System.out.println("numberOfHappyMoments :" + numberOfHappyMoments);

        System.out.println("Moments:");
        for (Integer i : sortedInts) {
            System.out.println("Moment:" + i);
        }
    }
}