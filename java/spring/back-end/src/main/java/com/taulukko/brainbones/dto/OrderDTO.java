package com.taulukko.brainbones.dto;

import java.util.Date;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
public class OrderDTO {

	@Getter @Setter
	private String name;
	@Getter @Setter
	private Date created;
	@Getter @Setter
	private String id;
}
