
package com.taulukko;
import java.util.Arrays;
import java.util.HashSet;
import java.util.ArrayList;
import java.util.Set;
import java.util.List;
 
import java.util.Comparator;

public class PoteDaFelicidade {
    private static final int PRINT_MOMENTS = 5;
    private static final String VERSION = "1.0.0";

    public static void errorLog(String message){
        System.err.println( """
                ${message} :: USAGE PoteDaFelicidade <numberOfMoments> [sortType] 
                 <numberOfMoments> := ASCII | NATURAL (ASCII is default) 
                <sortType> := ASCII | NATURAL (ASCII is default)""");
    }

    public static void logln(String message){
        System.out.println( message);
    }

    public static void printHead(int numberOfHappyMoments,boolean isNatural){
        logln("POTE DA FELICIDADE Version : %s".formatted(VERSION));
        logln("numberOfHappyMoments :" + numberOfHappyMoments);
        logln("Using %s SORT".formatted((isNatural)?"NATURAL":"ASCII"));
        logln("Moments:");
    }


    public static void main2(String[] args) {
        // Cria uma lista de strings
        List<String> lista = new ArrayList<>();
        lista.add("113");
        lista.add("338");
        lista.add("435");
        lista.add("293");
        lista.add("294");

        // Ordena a lista como números
        lista.sort(Comparator.comparingInt(Integer::parseInt));

        // Exibe a lista ordenada
        System.out.println("Moments:");
        for (String moment : lista) {
            System.out.println("Moment:" + moment);
        }
    }

    public static int comparableByASCII(String a,String b){
        int index=0;
        for (index=0; index < a.length() && index<b.length(); index++) {
            char charactereA = a.charAt(index);
            char charactereB = b.charAt(index);
            if(charactereA!=charactereB)
            {
                return charactereA - charactereB;
            }
        }
        return a.length()-b.length();
    }

    public static <T>  List<T>  convertListToMutable(List<T> input){
        return new ArrayList<T>(input);
    }

    public static void main(String[] args) {
        boolean isNatural = false;

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

        printHead(numberOfHappyMoments,isNatural);

        if(isNatural)
        {

            Arrays.sort(sortedInts);
            for (Integer i : sortedInts) {
                logln("Moment:" + i);
            }
            return;
        }

        List<String> moments = randomInts.stream().map((a)->String.valueOf(a)).toList();
        moments=convertListToMutable(moments);
        moments.sort(PoteDaFelicidade::comparableByASCII);
        for (String moment : moments) {
            logln("Moment:" + moment);
        }
    }
}