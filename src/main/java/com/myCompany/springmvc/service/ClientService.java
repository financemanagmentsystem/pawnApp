package com.myCompany.springmvc.service;

import java.util.List;
import java.util.Map;

import com.myCompany.springmvc.model.Client;
import com.myCompany.springmvc.model.ClientLoan;
import com.myCompany.springmvc.model.ClientOrnament;

public interface ClientService {
	
	public Map<String, List<Map<String, Object>>> saveClientInfo(Map<String, Object> clientInfo);
	
	public Map<String, List<Map<String, Object>>> getClientInfo(Long clientId);
	
	public boolean updateClientInfo(Long clientId, Map<String, Object> clientInfo);
	
	public List<Client> getClientList();
	
	public List<ClientLoan> getClientLoanList();
	
	public List<ClientOrnament> getLoanOrnamentList();
}
