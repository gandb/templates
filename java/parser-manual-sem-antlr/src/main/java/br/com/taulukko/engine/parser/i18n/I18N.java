package br.com.taulukko.engine.parser.i18n;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import lombok.Getter;


public class I18N {

	private Properties properties;
	@Getter
	private String lang ;

	public I18N(String lang) {
		String path = "i18N/" + lang + ".properties";
		
		this.lang = lang;

		try (InputStream input = getClass().getClassLoader().getResourceAsStream(path)) {

			properties = new Properties();
			properties.load(input);
		} catch (IOException ex) {
			throw new RuntimeException("i18N file not found", ex);
		}
	}

	public String get(String name) {
		return this.properties.getProperty(name);
	}

	public String get(String name, String defaultValue) {
		return this.properties.getProperty(name, defaultValue);
	}

	public String get(String name, String defaultValue, String... strings) {
		String ret = this.properties.getProperty(name, defaultValue);

		for (int index = 0; index < strings.length; index++) {
			String value = strings[index];
			ret = ret.replace("%" + (index + 1), value);
		}
		return ret;
	}

}
