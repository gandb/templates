package br.com.taulukko.engine.parser.tokens;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import br.com.taulukko.engine.parser.ParserContext;
import br.com.taulukko.engine.parser.i18n.I18N;

public class NamedTokenTest {

	@Test
	@DisplayName("help PT with bad start index")
	public void helpPTBadStart() {
		HelpToken helpToken = new HelpToken();
		I18N i18N = new I18N("pt");

		ParserContext parserContext = ParserContext.builder().command("ajuda").i18n(i18N).build();
		parserContext.setIndex(3);
		Assertions.assertFalse(helpToken.is(parserContext ));

	}

	@Test
	@DisplayName("help PT with bad command")
	public void helpPTBadCommand() {
		HelpToken helpToken = new HelpToken();
		I18N i18N = new I18N("pt");

		ParserContext parserContext = ParserContext.builder().command("garbage ajuda").i18n(i18N)
				.build();

		Assertions.assertFalse(helpToken.is(parserContext ));

		parserContext = ParserContext.builder().command("  ajuda").i18n(i18N).build();

		Assertions.assertFalse(helpToken.is(parserContext ));

	}

	@Test
	@DisplayName("help PT")
	public void helpPT() {
		HelpToken helpToken = new HelpToken();
		I18N i18N = new I18N("pt");

		ParserContext parserContext = ParserContext.builder().command("ajuda").i18n(i18N).build();

		Assertions.assertTrue(helpToken.is(parserContext));
		Assertions.assertEquals(0, helpToken.getStart());
		Assertions.assertEquals("ajuda".length() - 1, helpToken.getEnd());
		Assertions.assertEquals("ajuda".length(), parserContext.getIndex());
		Assertions.assertEquals(0, helpToken.getChildren().size());

		parserContext = ParserContext.builder().command("ajuda garbage").i18n(i18N).build();

		Assertions.assertTrue(helpToken.is(parserContext));
		Assertions.assertEquals(0, helpToken.getStart());
		Assertions.assertEquals("ajuda".length() - 1, helpToken.getEnd());
		Assertions.assertEquals("ajuda".length(), parserContext.getIndex());
		Assertions.assertEquals(0, helpToken.getChildren().size());

		parserContext = ParserContext.builder().command("123ajuda garbage").i18n(i18N).build();
		parserContext.setIndex(3);
		Assertions.assertTrue(helpToken.is(parserContext));
		Assertions.assertEquals(3, helpToken.getStart());
		Assertions.assertEquals("123ajuda".length() - 1, helpToken.getEnd());
		Assertions.assertEquals("123ajuda".length(), parserContext.getIndex());
		Assertions.assertEquals(0, helpToken.getChildren().size());

	}

	@Test
	@DisplayName("help EN")
	public void helpEN() {
		HelpToken helpToken = new HelpToken();
		I18N i18N = new I18N("en");

		ParserContext parserContext = ParserContext.builder().command("help").i18n(i18N).build();

		Assertions.assertTrue(helpToken.is(parserContext));

		Assertions.assertEquals("help".length() - 1, helpToken.getEnd());
		Assertions.assertEquals("help".length(), parserContext.getIndex());
		Assertions.assertEquals(0, helpToken.getChildren().size());

		parserContext = ParserContext.builder().command("help garbage").i18n(i18N).build();

		Assertions.assertTrue(helpToken.is(parserContext));
		Assertions.assertEquals(0, helpToken.getStart());
		Assertions.assertEquals("help".length() - 1, helpToken.getEnd());
		Assertions.assertEquals("help".length(), parserContext.getIndex());
		Assertions.assertEquals(0, helpToken.getChildren().size());

		parserContext = ParserContext.builder().command("123help garbage").i18n(i18N).build();
		parserContext.setIndex(3);
		Assertions.assertTrue(helpToken.is(parserContext));
		Assertions.assertEquals(3, helpToken.getStart());
		Assertions.assertEquals("123help".length() - 1, helpToken.getEnd());
		Assertions.assertEquals("123help".length(), parserContext.getIndex());
		Assertions.assertEquals(0, helpToken.getChildren().size());
	}

}
