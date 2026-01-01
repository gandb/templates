package br.com.taulukko.engine.parser.tokens;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import br.com.taulukko.engine.parser.ParserContext;
import br.com.taulukko.engine.parser.i18n.I18N;

public class WSTokenTest {

	@Test
	@DisplayName("WS")
	public void ws() {
		WSToken wsToken = new WSToken();
		I18N i18N = new I18N("en");

		ParserContext parserContext = ParserContext.builder().command(" ").i18n(i18N).build();

		Assertions.assertTrue(wsToken.is(parserContext));

		Assertions.assertEquals(0, wsToken.getEnd());
		Assertions.assertEquals(wsToken.getEnd() + 1, parserContext.getIndex());
		Assertions.assertEquals(0, wsToken.getChildren().size());

		parserContext = ParserContext.builder().command("   ").i18n(i18N).build();

		Assertions.assertTrue(wsToken.is(parserContext));

		Assertions.assertEquals(2, wsToken.getEnd());
		Assertions.assertEquals(wsToken.getEnd() + 1, parserContext.getIndex());
		Assertions.assertEquals(0, wsToken.getChildren().size());

		parserContext = ParserContext.builder().command("   \t").i18n(i18N).build();

		Assertions.assertTrue(wsToken.is(parserContext));

		Assertions.assertEquals(3, wsToken.getEnd());
		Assertions.assertEquals(wsToken.getEnd() + 1, parserContext.getIndex());
		Assertions.assertEquals(0, wsToken.getChildren().size());

	}

}
