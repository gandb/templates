package br.com.taulukko.engine.parser.tokens;

import java.util.ArrayList;
import java.util.List;

import br.com.taulukko.engine.parser.ParserContext;

public class CommandToken extends BaseToken {

	public CommandToken() {
		super(TokenType.HELP);
	}

	@Override
	public boolean parse(ParserContext context) {
		
	 
		if (!context.isSOF()) {
			context.setError("CommandToken need be in start of file");
			return false;
		}

		HelpCommandToken helpToken = new HelpCommandToken();
		BaseToken lastToken = null;
  
		List<BaseToken> children = new ArrayList<BaseToken>();

		if (helpToken.is(context)) { 
			lastToken = helpToken; 
			children.add(helpToken);
		}

		if (lastToken == null) {
			context.setError("Expected HelpToken");
			return false;
		}

		if (!context.isEOF()) {
			context.setError("Expected EOF");
			return false;
		}

		this.sucessUpdate(context, lastToken.getEnd(), children);
		return true;
	}

}
