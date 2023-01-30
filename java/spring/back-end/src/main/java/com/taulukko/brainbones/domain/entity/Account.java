package com.taulukko.brainbones.domain.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "accounts")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Account implements IEntityPK {

	@Id
	@Column(name = "id" ,length = 36)
	private String id;
	@Column(length = 200) 
	private String username;
	@Column(length = 200) 
	private String email;
	@Column(length = 200) 
	private String password;
	@Column(length = 1024)
	private String accesslevel;

}
