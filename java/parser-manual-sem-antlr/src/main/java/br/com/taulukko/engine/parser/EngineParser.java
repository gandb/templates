package br.com.taulukko.engine.parser;

import br.com.taulukko.engine.parser.i18n.I18N;
import br.com.taulukko.engine.parser.tokens.BaseToken;
import br.com.taulukko.engine.parser.tokens.CommandToken;

public class EngineParser {

	private String lang = "";

	public EngineParser(String lang) {
		this.lang = lang;
	}

	public HandlerData compile(String command) {
		CommandToken commandToken = new CommandToken();
		I18N i18N = new I18N(this.lang);
		ParserContext parserContext = ParserContext.builder().command(command).i18n(i18N).build();
		commandToken.is(parserContext);
		HandlerData handlerData = parser(commandToken);
		return handlerData;
	}

	private HandlerData parser(BaseToken tree) {
		// TODO Auto-generated method stub
		return null;
	}

}
