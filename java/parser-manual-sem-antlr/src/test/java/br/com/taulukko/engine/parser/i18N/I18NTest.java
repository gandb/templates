package br.com.taulukko.engine.parser.i18N;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import br.com.taulukko.engine.parser.i18n.I18N;

public class I18NTest {

	@Test
	public void help() {
		Assertions.assertEquals("ajuda", new I18N("pt").get("command.help"));

		Assertions.assertEquals("help", new I18N("en").get("command.help"));
	}

}
