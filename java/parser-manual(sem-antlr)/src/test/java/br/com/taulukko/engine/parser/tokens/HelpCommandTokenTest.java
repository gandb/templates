package br.com.taulukko.engine.parser.tokens;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import br.com.taulukko.engine.parser.ParserContext;
import br.com.taulukko.engine.parser.i18n.I18N;

public class HelpCommandTokenTest {

	@Test
	@DisplayName("help with bad start index")
	public void helpPTBadStart() {
		HelpCommandToken helpToken = new HelpCommandToken();
		I18N i18N = new I18N("pt");

		ParserContext parserContext = ParserContext.builder().command("  ajuda   ").i18n(i18N)
				.build();

		Assertions.assertTrue(helpToken.is(parserContext));
		Assertions.assertEquals(0, helpToken.getStart());
		Assertions.assertEquals("  ajuda   ".length() - 1, helpToken.getEnd());
		Assertions.assertEquals("  ajuda   ".length(), parserContext.getIndex());
		Assertions.assertEquals(3, helpToken.getChildren().size());
		Assertions.assertEquals(TokenType.WS, helpToken.getChildren().get(0).getType());
		Assertions.assertEquals(TokenType.HELP, helpToken.getChildren().get(1).getType());
		Assertions.assertEquals(TokenType.WS, helpToken.getChildren().get(2).getType());

		parserContext = ParserContext.builder().command("  ajudaxisto").i18n(i18N).build();

		Assertions.assertTrue(helpToken.is(parserContext ));
		Assertions.assertEquals(0, helpToken.getStart());
		Assertions.assertEquals("  ajuda".length() - 1, helpToken.getEnd());
		Assertions.assertEquals("  ajuda".length(), parserContext.getIndex());
		Assertions.assertEquals(2, helpToken.getChildren().size());
		Assertions.assertEquals(TokenType.WS, helpToken.getChildren().get(0).getType());
		Assertions.assertEquals(TokenType.HELP, helpToken.getChildren().get(1).getType());
	 
	}

	@Test
	@DisplayName("help PT with bad start index")
	public void helpWithError() {
		HelpCommandToken helpToken = new HelpCommandToken();
		I18N i18N = new I18N("pt");

		ParserContext parserContext = ParserContext.builder().command("  ajud   ").i18n(i18N)
				.build();
		Assertions.assertFalse(helpToken.is(parserContext ));
	}

}
