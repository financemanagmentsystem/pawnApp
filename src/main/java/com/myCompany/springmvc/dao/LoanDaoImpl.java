package com.myCompany.springmvc.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.springframework.stereotype.Repository;

import com.myCompany.springmvc.model.Client;
import com.myCompany.springmvc.model.ClientLoan;

@Repository("loanDao")
public class LoanDaoImpl extends AbstractDao<Long, ClientLoan> implements LoanDao {

	@Override
	public ClientLoan findById(Long id) {
		return getByKey(id);
	}

	@Override
	public ClientLoan saveClientLoan(ClientLoan clientLoan) {
		getSession().save(clientLoan);
		System.out.println(clientLoan.toString());
		return clientLoan;
	}

	@Override
	public void deleteUserById(Long loanId) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<ClientLoan> findAll() {
		Criteria criteria = createEntityCriteria();
		List<ClientLoan> cl = (List<ClientLoan>) criteria.list();
		for(ClientLoan  clientLoan:cl) {
			System.out.println(clientLoan.toString());
		}
		return (List<ClientLoan>) criteria.list();
	}

}
