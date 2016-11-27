package com.myCompany.springmvc.model;

import java.math.BigDecimal;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name="CLIENT_ORNAMENT")

public class ClientOrnament {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ORNAMENT_ID")
	private Long id;
	
	@Column(name = "ORNAMENT_VALUE")
	private BigDecimal ornamentValue;
	
	@Column(name = "ORNAMENT_QUANTITY")
	private BigDecimal ornamentQuantity;
	
	@Column(name = "ORNAMENT_QUALITY", nullable = false)
	private String ornamentQuality;
	
	@Column(name = "ORNAMENT_NAME", nullable = false)
	private String ornamentName;
	
	@Column(name = "ORNAMENT_TYPE", nullable = false)
	private String ornamentType;
	
	@Column(name = "ORNAMENT_METAL", nullable = false)
	private String ornamentMetal;
	
	@ManyToOne(cascade=CascadeType.ALL)
	private ClientLoan loanId;

	@ManyToOne(cascade=CascadeType.ALL)
	private Client clientId;

	
	public Client getClientId() {
		return clientId;
	}

	public void setClientId(Client clientId) {
		this.clientId = clientId;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public BigDecimal getOrnamentValue() {
		return ornamentValue;
	}

	public void setOrnamentValue(BigDecimal ornamentValue) {
		this.ornamentValue = ornamentValue;
	}

	public BigDecimal getOrnamentQuantity() {
		return ornamentQuantity;
	}

	public void setOrnamentQuantity(BigDecimal ornamentQuantity) {
		this.ornamentQuantity = ornamentQuantity;
	}

	public String getOrnamentQuality() {
		return ornamentQuality;
	}

	public void setOrnamentQuality(String ornamentQuality) {
		this.ornamentQuality = ornamentQuality;
	}

	public String getOrnamentName() {
		return ornamentName;
	}

	public void setOrnamentName(String ornamentName) {
		this.ornamentName = ornamentName;
	}

	public String getOrnamentType() {
		return ornamentType;
	}

	public void setOrnamentType(String ornamentType) {
		this.ornamentType = ornamentType;
	}
 
	public String getOrnamentMetal() {
		return ornamentMetal;
	}

	public void setOrnamentMetal(String ornamentMetqal) {
		this.ornamentMetal = ornamentMetqal;
	}

	public ClientLoan getLoanId() {
		return loanId;
	}

	public void setLoanId(ClientLoan loanId) {
		this.loanId = loanId;
	}

	public ClientOrnament(Long id, BigDecimal ornamentValue, BigDecimal ornamentQuantity, String ornamentQuality,
			String ornamentName, String ornamentType, String ornamentMetal, ClientLoan loanId, Client clientId) {
		super();
		this.id = id;
		this.ornamentValue = ornamentValue;
		this.ornamentQuantity = ornamentQuantity;
		this.ornamentQuality = ornamentQuality;
		this.ornamentName = ornamentName;
		this.ornamentType = ornamentType;
		this.ornamentMetal = ornamentMetal;
		this.loanId = loanId;
		this.clientId = clientId;
	}

	public ClientOrnament() {
		super();
	}

	@Override
	public String toString() {
		return "ClientOrnament [id=" + id + ", ornamentValue=" + ornamentValue + ", ornamentQuantity="
				+ ornamentQuantity + ", ornamentQuality=" + ornamentQuality + ", ornamentName=" + ornamentName
				+ ", ornamentType=" + ornamentType + ", ornamentMetal=" + ornamentMetal + ", loanId=" + loanId + "]";
	}

	
}
