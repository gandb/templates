package com.taulukko.brainbones.domain.entity.example;

import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.taulukko.brainbones.domain.entity.IEntityPK;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "orders")
public class Order implements IEntityPK  {

	@Getter @Setter
	private float total;	
	@Getter @Setter
	private LocalDate created;
	@Column(name = "client_id", insertable = false, updatable = false,length = 36)
	@Getter @Setter
	private String client_id;
	@ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "client_id", referencedColumnName = "id")
	@JsonIgnore
	@Getter @Setter
	private Client client;
	@Id
	@Column(name = "id" ,length = 36)
	@Getter @Setter
	private String id ;
	@Column(name = "status")
	@Getter @Setter
	@Enumerated(EnumType.STRING)
	private StatusOrder status;
	  
}
