package com.myCompany.springmvc.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * Entity bean with JPA annotations
 * Hibernate provides JPA implementation
 * @author pankaj
 *
 */
@Entity
@Table(name="CLIENT")
public class Client {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "CLIENT_ID")
	private Long clientId;
	
	@NotEmpty
	@Size(min=2, max=50)
	@Column(name = "CLIENT_FNAME", nullable = false)
	private String firstName;
	
	@NotEmpty
	@Size(min=2, max=50)
	@Column(name = "CLIENT_LNAME", nullable = false)
	private String lastName;
	
	@NotEmpty
	@Size(min=2, max=50)
	@Column(name = "CLIENT_FATHERNAME")
	private String fatherName;
	
	@Column(name = "CLIENT_MOBILE",  unique=true, nullable = false)
	private Long clientMobileNo;
	
	@Column(name = "GENDER")
	private String gender;
	
	@Column(name = "ID_TYPE")
	private String idType;
	
	@Column(name = "ID_VALUE")
	private String idValue;
	
	@Column(name = "ADDRESS")
	private String address;
	
	@Column(name = "CITY")
	private String city;
	
	@Column(name = "STATE")
	private String state;
	
	@Column(name = "COUNTRY")
	private String country;
	
	@Column(name = "ZIPCODE")
	private String zipCode;
	
	@Size(min=2, max=50)
	@Column(name = "REFERRAL_FNAME")
	private String referralFName;
	
	@Size(min=2, max=50)
	@Column(name = "REFERRAL_LNAME")
	private String referralLName;
	
	@Column(name = "REFERRAL_MOBILE")
	private Long referralMobileNo;

	public Long getClientId() {
		return clientId;
	}

	public void setClientId(Long clientId) {
		this.clientId = clientId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getFatherName() {
		return fatherName;
	}

	public void setFatherName(String fatherName) {
		this.fatherName = fatherName;
	}

	public Long getClientMobileNo() {
		return clientMobileNo;
	}

	public void setClientMobileNo(Long clientMobileNo) {
		this.clientMobileNo = clientMobileNo;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getIdType() {
		return idType;
	}

	public void setIdType(String idType) {
		this.idType = idType;
	}

	public String getIdValue() {
		return idValue;
	}

	public void setIdValue(String idValue) {
		this.idValue = idValue;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}

	public String getReferralFName() {
		return referralFName;
	}

	public void setReferralFName(String referralFName) {
		this.referralFName = referralFName;
	}

	public String getReferralLName() {
		return referralLName;
	}

	public void setReferralLName(String referralLName) {
		this.referralLName = referralLName;
	}

	public Long getReferralMobileNo() {
		return referralMobileNo;
	}

	public void setReferralMobileNo(Long referralMobileNo) {
		this.referralMobileNo = referralMobileNo;
	}

	public Client() {
		super();
	}

	public Client(Long clientId, String firstName, String lastName, String fatherName, Long clientMobileNo,
			String gender, String idType, String idValue, String address, String city, String state, String country,
			String zipCode, String referralFName, String referralLName, Long referralMobileNo) {
		super();
		this.clientId = clientId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.fatherName = fatherName;
		this.clientMobileNo = clientMobileNo;
		this.gender = gender;
		this.idType = idType;
		this.idValue = idValue;
		this.address = address;
		this.city = city;
		this.state = state;
		this.country = country;
		this.zipCode = zipCode;
		this.referralFName = referralFName;
		this.referralLName = referralLName;
		this.referralMobileNo = referralMobileNo;
	}

	@Override
	public String toString() {
		return "Client [clientId=" + clientId + ", firstName=" + firstName + ", lastName=" + lastName + ", fatherName="
				+ fatherName + ", clientMobileNo=" + clientMobileNo + ", gender=" + gender + ", idType=" + idType
				+ ", idValue=" + idValue + ", address=" + address + ", city=" + city + ", state=" + state + ", country="
				+ country + ", zipCode=" + zipCode + ", referralFName=" + referralFName + ", referralLName="
				+ referralLName + ", referralMobileNo=" + referralMobileNo + "]";
	}

	

}
