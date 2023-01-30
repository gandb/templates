package com.taulukko.brainbones.domain.entity.example;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.taulukko.brainbones.domain.entity.IEntityPK;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "items")
public class Item implements IEntityPK  {

	@OneToOne(cascade = CascadeType.ALL) 
	@Getter @Setter
    @JoinColumn(name = "order_id", referencedColumnName = "id")
	private Order order;
	@Column(name = "order_id", insertable = false, updatable = false,length = 36) 
	@Getter @Setter
	 
	private String order_id;
	@OneToOne(cascade = CascadeType.ALL) 
	@Getter @Setter
    @JoinColumn(name = "product_id", referencedColumnName = "id")
	private Product product;
	@Column(name = "product_id", insertable = false, updatable = false,length = 36)
	@Getter @Setter 
	private String product_id;
	@Getter @Setter
	private int length;
	@Id @Getter @Setter
	@Column(name = "id" ,length = 36)
	private String id ;
 
	
}
