package com.taulukko.engine.parser.utils;
 
 
public class StringUtils extends org.apache.commons.lang3.StringUtils{

	public static String firstLetterUppercase(String example)
	{
		if(example==null || example.isEmpty())
		{
			return example;
		}
		return StringUtils.left(example, 1).toUpperCase() + example.substring(1);
	}
	
	public static String firstLetterLowercase(String example)
	{
		if(example==null || example.isEmpty())
		{
			return example;
		}
		return StringUtils.left(example, 1).toLowerCase() + example.substring(1);
	}
}
