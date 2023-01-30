package br.com.taulukko.engine.parser.tokens;

import br.com.taulukko.engine.parser.ParserContext;

public class NamedToken extends BaseToken {

	private String i18nLabel = null;

	public NamedToken(TokenType type, String i18nLabel) {
		super(type);
		this.i18nLabel = i18nLabel;
	}

	@Override
	public boolean parse(ParserContext context) {

		int start = context.getIndex();
		String content = context.getCommand().substring(start);

		String command = context.getI18n().get(this.i18nLabel);

		if (!content.toUpperCase().startsWith(command.toUpperCase())) {
			return false;
		}
 
		this.sucessUpdate(context, command.length() + start - 1);
		return true;
	}

}
