package com.myCompany.springmvc.model;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;



@Entity
@Table(name="CLIENT_LOAN")

public class ClientLoan {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LOAN_ID")
	private Long id;
	
	@Column(name = "LOAN_AMOUNT")
	private BigDecimal loanAmount;
	
	@Column(name = "RATE_OF_INTREST")
	private BigDecimal rateOfIntrest;
	
	@Column(name = "LOAN_PERIOD")
	private BigDecimal loanPeriod;
	
	@Column(name = "PERIOD_TYPE", nullable = false)
	private String periodType;
	
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

	public BigDecimal getLoanAmount() {
		return loanAmount;
	}

	public void setLoanAmount(BigDecimal loanAmount) {
		this.loanAmount = loanAmount;
	}

	public BigDecimal getRateOfIntrest() {
		return rateOfIntrest;
	}

	public void setRateOfIntrest(BigDecimal rateOfIntrest) {
		this.rateOfIntrest = rateOfIntrest;
	}

	public BigDecimal getLoanPeriod() {
		return loanPeriod;
	}

	public void setLoanPeriod(BigDecimal loanPeriod) {
		this.loanPeriod = loanPeriod;
	}

	public String getPeriodType() {
		return periodType;
	}

	public void setPeriodType(String periodType) {
		this.periodType = periodType;
	}

	public ClientLoan(Long id, BigDecimal loanAmount, BigDecimal rateOfIntrest, BigDecimal loanPeriod,
			String periodType, Client clientId) {
		super();
		this.id = id;
		this.loanAmount = loanAmount;
		this.rateOfIntrest = rateOfIntrest;
		this.loanPeriod = loanPeriod;
		this.periodType = periodType;
		this.clientId = clientId;
	}

	public ClientLoan() {
		super();
	}

	@Override
	public String toString() {
		return "ClientLoan [id=" + id + ", loanAmount=" + loanAmount + ", rateOfIntrest=" + rateOfIntrest
				+ ", loanPeriod=" + loanPeriod + ", periodType=" + periodType + ", clientId=" + clientId + "]";
	}

	
	
}
