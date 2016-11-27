package com.myCompany.springmvc.dao;

import java.util.List;

import com.myCompany.springmvc.model.Client;


public interface ClientDao {
	
	Client findById(Long id);

	Client saveClient(Client client);
	
	void deleteClientById(Long clientId);
	
	List<Client> findAllClients();

}
