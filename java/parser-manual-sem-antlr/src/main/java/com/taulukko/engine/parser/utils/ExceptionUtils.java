package com.taulukko.engine.parser.utils;
 
public class ExceptionUtils {
	public void asserts(boolean result, String message) {
		if (result) {
			return;
		}

		throw new RuntimeException(message);
	}
}
