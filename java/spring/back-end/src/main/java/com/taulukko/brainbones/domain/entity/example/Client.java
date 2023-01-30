package com.taulukko.brainbones.domain.entity.example;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

import com.taulukko.brainbones.domain.entity.IEntityPK;
import com.taulukko.brainbones.validations.StartWithUppercase;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "clients")
public class Client  implements IEntityPK {

	@Id 
	@Getter @Setter
	@Column(name = "id",length = 36)
	private String id ;
	

	@Column(length = 50) 
	@Getter @Setter
	@NotEmpty(message = "Name cannot be empty") 
	@StartWithUppercase(message = "{validation.name.uppercase}")
	private String name ;
	
	@OneToMany(mappedBy = "client")
	@Getter @Setter
	private List<Order> orders ;
	

	public Client() {		
		 
	}  
}
