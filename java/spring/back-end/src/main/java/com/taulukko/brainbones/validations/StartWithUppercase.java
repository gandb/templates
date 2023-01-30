package com.taulukko.brainbones.validations;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Retention(RUNTIME)
@Target(FIELD)
@Constraint(validatedBy = ConstraintStartWithUppercase.class)
public @interface StartWithUppercase {
	
	String message () default "Need be started with Uppercase";
	Class<?>[] groups() default { };

	Class<? extends Payload>[] payload() default { };

}
