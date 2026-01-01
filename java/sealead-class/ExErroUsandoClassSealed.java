//erro de compilação esperado, pois ExErroUsandoClassSealed não é listado como possível implementador de SealedClass
public final class ExErroUsandoClassSealed  extends  SealedClass
{
    public static void main(String args[])
    {
        IO.println("ExErroUsandoClassSealed.TESTE_NUMERO" + ExErroUsandoClassSealed.TESTE_NUMERO);
    }
}