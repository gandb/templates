package org.example;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {
        RaceConditionTest raceConditionTest = new RaceConditionTest();
        //esperado dar certo pois não é concorrente
        raceConditionTest.testCaseBaseNoRaceCondition();
        //esperado dar errado pois tem race condition
        raceConditionTest.testBasicRaceCondition();
        //esperado dar menos errado, mas ainda assim errado pois tem race condition no semáforo
        raceConditionTest.testRaceConditionWithBadSolution();
        //este da corretamente
        raceConditionTest.testRaceConditionWithGoodSolution1();
        //este da corretamente
        raceConditionTest.testRaceConditionWithGoodSolution2();
        //este da corretamente
        raceConditionTest.testRaceConditionWithGoodSolution3();
    }

}