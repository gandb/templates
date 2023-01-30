package com.taulukko.brainbones.validations;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.apache.commons.lang3.StringUtils;

public class ConstraintStartWithUppercase implements ConstraintValidator<StartWithUppercase, String>{

	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		 
		return StringUtils.isAllUpperCase(StringUtils.left(value, 1));
	}

}
