//erro de compilação esperado, pois ExErroUsandoInterfaceSealed não é listado como possível implementador de SealedInterfaceTest
public final class ExErroUsandoInterfaceSealed implements SealedInterfaceTest
{
    public static void main(String args[])
    {
        IO.println("ExErroUsandoInterfaceSealed.TESTE_NUMERO" + ExErroUsandoInterfaceSealed.TESTE_NUMERO);
    }
}