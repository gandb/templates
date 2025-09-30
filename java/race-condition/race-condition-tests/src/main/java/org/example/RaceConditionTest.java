package org.example;

import java.util.concurrent.atomic.AtomicBoolean;

public class RaceConditionTest {

    public static String semaphoreBetterSolution = "semaphore";


    public static int testCaseBaseNoRaceCondition = 0;

    public static int testBasicCount = 0;

    public static int testWithBadSolutionCount = 0;

    public static int testWithGoodSolutionCount1 = 0;

    public static int testWithGoodSolutionCount2 = 0;

    public static int testWithGoodSolutionCount3 = 0;

    //true pode passar
    public static boolean semaphoreRaceCondition = true;

    //true pode passar
    public static AtomicBoolean atomicSemaphoreRaceCondition = new AtomicBoolean(true);

    private static final int MILLION = 1000_000;

    public void testCaseBaseNoRaceCondition(){

        long startTime = System.currentTimeMillis();

        System.out.println("TestCaseBaseNoRaceCondition starting with 1 MILLION...");
        for(int i =0 ; i < MILLION;i++)
        {
            testCaseBaseNoRaceCondition=testCaseBaseNoRaceCondition+1;
        }
        System.out.println("Final count: " +  testCaseBaseNoRaceCondition);
        System.out.println("Pass: " +  (testCaseBaseNoRaceCondition==MILLION));
        System.out.println("TestCaseBaseNoRaceCondition finished in " +   ( System.currentTimeMillis()-startTime) + " miliseconds");
    }

    public void testBasicRaceCondition(){
        long startTime = System.currentTimeMillis();
        System.out.println("TestBasicRaceCondition starting with 1 MILLION...");
        Thread thread1= createThreadBasicRaceCondition();
        Thread thread2=createThreadBasicRaceCondition();

        thread1.start();
        thread2.start();

        while (thread1.isAlive() || thread2.isAlive()) {
            try {
                Thread.sleep(10); // Polling a cada 10ms
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                break;
            }
        }

        System.out.println("Final count: " +  testBasicCount);
        System.out.println("Pass: " +  (testBasicCount==MILLION));
        System.out.println("TestBasicRaceCondition finished in " +   ( System.currentTimeMillis()-startTime) + " miliseconds");

    }


    public void testRaceConditionWithBadSolution(){
        long startTime = System.currentTimeMillis();
        System.out.println("TestRaceConditionWithBadSolution starting with 1 MILLION...");

        Thread thread1= createThreadBasicRaceConditionWithBadSolution();

        Thread thread2=createThreadBasicRaceConditionWithBadSolution();

        thread1.start();
        thread2.start();

        while (thread1.isAlive() || thread2.isAlive()) {
            try {
                Thread.sleep(10); // Polling a cada 10ms
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                break;
            }
        }

        System.out.println("Final count: " +  testWithBadSolutionCount);
        System.out.println("Pass: " +  (testWithBadSolutionCount==MILLION));
        System.out.println("TestCaseRaceConditionWithBadSolution in " +   ( System.currentTimeMillis()-startTime) + " miliseconds");
    }


    public void testRaceConditionWithGoodSolution1(){
        long startTime = System.currentTimeMillis();
        System.out.println("TestRaceConditionWithGoodSolution1 starting with 1 MILLION...");

        Thread thread1= createThreadBasicRaceConditionWithGoodSolution1();

        Thread thread2= createThreadBasicRaceConditionWithGoodSolution1();

        thread1.start();
        thread2.start();

        while (thread1.isAlive() || thread2.isAlive()) {
            try {
                Thread.sleep(10); // Polling a cada 10ms
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                break;
            }
        }

        System.out.println("Final count: " + testWithGoodSolutionCount1);
        System.out.println("Pass: " +  (testWithGoodSolutionCount1 ==MILLION));
        System.out.println("TestRaceConditionWithGoodSolution1 in " +   ( System.currentTimeMillis()-startTime) + " miliseconds");
    }

    public void testRaceConditionWithGoodSolution2(){
        long startTime = System.currentTimeMillis();
        System.out.println("TestRaceConditionWithGoodSolution2 starting with 1 MILLION...");

        Thread thread1= createThreadBasicRaceConditionWithGoodSolution2();

        Thread thread2= createThreadBasicRaceConditionWithGoodSolution2();

        thread1.start();
        thread2.start();

        while (thread1.isAlive() || thread2.isAlive()) {
            try {
                Thread.sleep(10); // Polling a cada 10ms
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                break;
            }
        }

        System.out.println("Final count: " + testWithGoodSolutionCount2);
        System.out.println("Pass: " +  (testWithGoodSolutionCount2 ==MILLION));
        System.out.println("TestRaceConditionWithGoodSolution2 in " +   ( System.currentTimeMillis()-startTime) + " miliseconds");
    }


    public void testRaceConditionWithGoodSolution3(){
        long startTime = System.currentTimeMillis();
        System.out.println("TestRaceConditionWithGoodSolution3 starting with 1 MILLION...");

        Thread thread1= createThreadBasicRaceConditionWithGoodSolution1();

        Thread thread2= createThreadBasicRaceConditionWithGoodSolution1();

        thread1.start();
        thread2.start();

        while (thread1.isAlive() || thread2.isAlive()) {
            try {
                Thread.sleep(10); // Polling a cada 10ms
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                break;
            }
        }

        System.out.println("Final count: " + testWithGoodSolutionCount1);
        System.out.println("Pass: " +  (testWithGoodSolutionCount1 ==MILLION));
        System.out.println("TestRaceConditionWithGoodSolution3 in " +   ( System.currentTimeMillis()-startTime) + " miliseconds");
    }


    private Thread createThreadBasicRaceConditionWithBadSolution() {
        return new Thread(new Runnable() {
            @Override
            public void run() {
                for(int i =0 ; i < MILLION/2;i++)
                {
                    while(!semaphoreRaceCondition)
                    {

                    }
                    semaphoreRaceCondition=false;
                    testWithBadSolutionCount=testWithBadSolutionCount+1;
                    semaphoreRaceCondition=true;
                }
            }
        });
    }



    private Thread createThreadBasicRaceConditionWithGoodSolution2() {
        return new Thread(new Runnable() {
            @Override
            public void run() {
                for(int i =0 ; i < MILLION/2;i++)
                {
                    boolean change = false;
                    while(!change)
                    {
                        if(atomicSemaphoreRaceCondition.compareAndSet(true,false))
                        {
                            testWithGoodSolutionCount2 = testWithGoodSolutionCount2 +1;
                            change=true;
                            atomicSemaphoreRaceCondition.set(true);
                        }
                    }
                }
            }
        });
    }


    private Thread createThreadBasicRaceConditionWithGoodSolution1() {
        return new Thread(new Runnable() {
            @Override
            public void run() {
                for(int i =0 ; i < MILLION/2;i++)
                {

                    synchronized (RaceConditionTest.semaphoreBetterSolution){
                        testWithGoodSolutionCount1 = testWithGoodSolutionCount1 +1;
                    }


                }
            }
        });
    }


    private Thread createThreadBasicRaceConditionWithGoodSolution3() {
        return new Thread(new Runnable() {
            @Override
            public void run() {
                for(int i =0 ; i < MILLION/2;i++)
                {
                    incrementSolution3();
                }
            }


        });
    }


    public static synchronized void incrementSolution3(){
        testWithGoodSolutionCount3 = testWithGoodSolutionCount3 + 1;
    }


    private Thread createThreadBasicRaceCondition() {
        return  new Thread(new Runnable() {
            @Override
            public void run() {
                for(int i =0 ; i < MILLION/2;i++)
                {
                    testBasicCount=testBasicCount+1;
                }
            }
        });
    }

}
