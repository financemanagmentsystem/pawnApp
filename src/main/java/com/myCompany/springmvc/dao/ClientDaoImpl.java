package com.myCompany.springmvc.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.springframework.stereotype.Repository;

import com.myCompany.springmvc.model.Client;
import com.myCompany.springmvc.model.User;

@Repository("clientDao")
public class ClientDaoImpl extends AbstractDao<Long, Client> implements ClientDao {

	@Override
	public Client findById(Long id) {
		return getByKey(id);
	}

	@Override
	public Client saveClient(Client client) {
		getSession().save(client);
		System.out.println(client.toString());
		return client;
	}

	@Override
	public void deleteClientById(Long clientId) {
		// TODO Auto-generated method stub

	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Client> findAllClients() {
		Criteria criteria = createEntityCriteria();
		return (List<Client>) criteria.list();
	}

}
