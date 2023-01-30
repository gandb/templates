package com.taulukko.brainbones.errors;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import lombok.Getter;

public class ApiErrors {

	@Getter
	private List<Error> errors = new ArrayList<>();

	public ApiErrors(Error error) {
		this.errors = Arrays.asList(error);
	}

	public ApiErrors(List<Error> errors) {
		this.errors = errors;
	}

	public ApiErrors(String[] errors) {
		this.errors = Arrays.asList(errors).stream()
				.map(s -> Error.builder().message(s).name("").build()).collect(Collectors.toList());
	}
}
