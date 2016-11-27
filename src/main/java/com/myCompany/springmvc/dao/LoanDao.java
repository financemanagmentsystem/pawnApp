package com.myCompany.springmvc.dao;

import java.util.List;

import com.myCompany.springmvc.model.ClientLoan;


public interface LoanDao {
	
	ClientLoan findById(Long id);

	ClientLoan saveClientLoan(ClientLoan clientLoan);
	
	void deleteUserById(Long loanId);
	
	List<ClientLoan> findAll();

}
