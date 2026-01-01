package br.com.taulukko.engine.parser.tokens;

import br.com.taulukko.engine.parser.ParserContext;

public class WSToken extends BaseToken {

	public WSToken() {
		super(TokenType.WS);
	}

	@Override
	public boolean parse(ParserContext context) {
		int start = context.getIndex();

		String content = context.getCommand().substring(start);

		int end = -1;
		for (int index = 0; index < content.length(); index++) {
			if (content.charAt(index) != ' ' && content.charAt(index) != '\t') {
				break;
			}
			end = start + index;

		}

		if (end == -1) {
			context.setError("Expected WS");
			return false;
		}

		sucessUpdate(context, end);

		return true;
	}

}
