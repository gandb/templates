package br.com.taulukko.engine.parser.tokens;

public enum TokenType {

	//language tokens
	COMMAND(1), HELP(2), INVENTORY(3), HELP_COMMAND(4),
	//system tokens
	WS(10000),EOF(10001)
	;

	private int value;

	TokenType(int type) {
		this.value = type;
	}

	public int getType() {
		return this.value;
	}
}
