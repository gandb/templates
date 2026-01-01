package br.com.taulukko.engine.parser.tokens;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import br.com.taulukko.engine.parser.ParserContext;
import br.com.taulukko.engine.parser.i18n.I18N;

public class CommandTokenTest {

	@Test
	@DisplayName("help with bad start index")
	public void helpBadStart() {
		CommandToken commandToken = new CommandToken();
		I18N i18N = new I18N("pt");

		ParserContext parserContext = ParserContext.builder().command("  ajuda   ").i18n(i18N)
				.build();

		Assertions.assertTrue(commandToken.is(parserContext));
		Assertions.assertEquals(0, commandToken.getStart());
		Assertions.assertEquals("  ajuda   ".length() - 1, commandToken.getEnd());
		Assertions.assertEquals("  ajuda   ".length(), parserContext.getIndex());
		Assertions.assertEquals(1, commandToken.getChildren().size());
		Assertions.assertEquals(TokenType.HELP_COMMAND, commandToken.getChildren().get(0).getType());
		Assertions.assertTrue(parserContext.isEOF());
	}
	

	@Test
	@DisplayName("help PT with bad start index")
	public void helpWithError() {
		HelpCommandToken helpToken = new HelpCommandToken();
		I18N i18N = new I18N("pt");

		ParserContext parserContext = ParserContext.builder().command("  ajud   ").i18n(i18N)
				.build();
		Assertions.assertFalse(helpToken.is(parserContext));
	}


}
