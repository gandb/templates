package com.taulukko.brainbones.domain.entity.example;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.taulukko.brainbones.domain.entity.IEntityPK;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "products")
public class Product implements IEntityPK {

	@Column(length = 50)
	@Getter @Setter
	private String name;
	@Getter @Setter
	private float value;
	@Id
	@Column(name = "id" ,length = 36)
	@Getter @Setter
	private String id ;
	 
}
