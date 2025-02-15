package com.taulukko;
import org.junit.Assert;
import org.junit.Test;

public class PoteDaFelicidadeTest
{
    @Test
    public void comparableByASCII(){
        Assert.assertTrue("Deveria ser negativo", PoteDaFelicidade.comparableByASCII("11","22")<0);
        Assert.assertTrue("Deveria ser negativo", PoteDaFelicidade.comparableByASCII("114","22")<0);
        Assert.assertTrue("Deveria ser negativo", PoteDaFelicidade.comparableByASCII("114","2")<0);

        Assert.assertEquals("Deveria ser zero", 0, PoteDaFelicidade.comparableByASCII("22", "22"));
        Assert.assertEquals("Deveria ser zero", 0, PoteDaFelicidade.comparableByASCII("114", "114"));
        Assert.assertEquals("Deveria ser zero", 0, PoteDaFelicidade.comparableByASCII("2", "2"));


        Assert.assertTrue("Deveria ser positivo", PoteDaFelicidade.comparableByASCII("22","11")>0);
        Assert.assertTrue("Deveria ser positivo", PoteDaFelicidade.comparableByASCII("22","114")>0);
        Assert.assertTrue("Deveria ser positivo", PoteDaFelicidade.comparableByASCII("2","114")>0);
    }
}
