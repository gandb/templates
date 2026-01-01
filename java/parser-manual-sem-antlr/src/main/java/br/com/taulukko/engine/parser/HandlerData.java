package br.com.taulukko.engine.parser;

import java.util.HashMap;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HandlerData {
	private String handler;
	@Builder.Default()
	private Map<String,Object> parameters = new HashMap<String,Object>();
	private Exception exception;
}
