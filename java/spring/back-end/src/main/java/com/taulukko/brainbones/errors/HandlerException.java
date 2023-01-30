package com.taulukko.brainbones.errors;

import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class HandlerException {

	@ExceptionHandler(BusinessException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ApiErrors handleBusinessException(BusinessException be) {
		return new ApiErrors(
				Error.builder().name(be.getClass().getName()).message(be.getMessage()).build());
	}

	@ExceptionHandler(BindException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ApiErrors handleBusinessException(BindException be) {
		return new ApiErrors(
				be.getAllErrors().stream()
						.map(e -> Error.builder().name(e.getClass().getName())
								.message(e.getDefaultMessage()).build())
						.collect(Collectors.toList()));
	}
}
