public class Perceptron {

	public static void main(String args[]) {

		 
		System.out.println("Testando AND : " );
		System.out.println("0 AND 0 => " + executaAnd(0, 0) );
		System.out.println("1 AND 0 => " + executaAnd(1, 0) );
		System.out.println("0 AND 1 => " + executaAnd(0, 1) );
		System.out.println("1 AND 1 => " + executaAnd(1, 1) );
		
		System.out.println("" );
		System.out.println("" );
		System.out.println("Testando OR : " );
		System.out.println("0 OR  0 => " + executaOr(0, 0) );
		System.out.println("1 OR  0 => " + executaOr(1, 0) );
		System.out.println("0 OR 1 => " + executaOr(0, 1) );
		System.out.println("1 OR 1 => " + executaOr(1, 1) );
		
		
	}

	public static int executaAnd(int x0, int x1) {

		// pesos individuais
		float w[] = new float[2]; 

		// pesos calibrados para AND
		w[0] = 0.5f;
		w[1] = 0.5f;

 
		return executaGenerico(x0,x1,w);
	}
	
	
	public static int executaOr(int x0, int x1) {

		// pesos individuais
		float w[] = new float[2]; 

		// pesos calibrados para OR
		w[0] = 1f;
		w[1] = 1f;

 
		return executaGenerico(x0,x1,w);
	}
	
	public static int executaGenerico(int x0, int x1,float w[]) {
 
		// peso genérico
		float bias = 1;
 
		float somatoria = x0 * w[0] + x1 * w[1];
		// aplicando o peso global
		somatoria = somatoria * bias;

		return ativacao(somatoria);
	}


	//função de ativação
	private static int ativacao(float somatoria) {
		return (somatoria >= 1) ? 1 : 0;
	}

}
