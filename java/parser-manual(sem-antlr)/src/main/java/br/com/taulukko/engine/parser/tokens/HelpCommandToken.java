package br.com.taulukko.engine.parser.tokens;

import java.util.ArrayList;
import java.util.List;

import br.com.taulukko.engine.parser.ParserContext;

public class HelpCommandToken extends BaseToken {

	public HelpCommandToken() {
		super(TokenType.HELP_COMMAND);
	}

	@Override
	public boolean parse(ParserContext context) { 
		WSToken wsToken = new WSToken();
		BaseToken lastToken = null;

		ParserContext newParserContext = context.clone();
		List<BaseToken> children = new ArrayList<BaseToken>();

		if (wsToken.is(newParserContext)) {
			lastToken = wsToken;
			children.add(lastToken);
		}

		HelpToken helpToken = new HelpToken();

		if (!helpToken.is(newParserContext)) {
			context.setError("Expected HelpToken");
			return false;
		}

		lastToken = helpToken;
		children.add(lastToken);

		if (wsToken.is(newParserContext)) {
			lastToken = wsToken;
			children.add(lastToken);
		}

		this.sucessUpdate(context, lastToken.getEnd(), children);
		return true;
	}

}
