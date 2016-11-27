package com.myCompany.springmvc.service;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;

import com.myCompany.springmvc.dao.ClientDao;
import com.myCompany.springmvc.dao.LoanDao;
import com.myCompany.springmvc.dao.OrnamentDao;
import com.myCompany.springmvc.model.Client;
import com.myCompany.springmvc.model.ClientLoan;
import com.myCompany.springmvc.model.ClientOrnament;


@Transactional
@Service("clientService")
public class ClientServiceImpl implements ClientService{
	
	@Autowired
	private ClientDao clientDao;
	
	@Autowired
	private LoanDao loanDao;
	
	@Autowired
	private OrnamentDao ornamentDao;
	
	ObjectMapper mapper = new ObjectMapper();
	
	@Override
	public Map<String, List<Map<String, Object>>> saveClientInfo(Map<String, Object> clientInfo) {
		
		try {

			Client client =  mapper.readValue((String)clientInfo.get("clientData"),Client.class) ;
			ClientLoan clientLoan = mapper.readValue((String)clientInfo.get("clientLoan"),ClientLoan.class) ;
			Set<ClientOrnament> ornamentList = mapper.readValue((String)clientInfo.get("clientOrnamentList"), new TypeReference<Set<ClientOrnament>>(){});
			/*client = clientDao.saveClient(client);
			clientLoan.setClientOrnaments(ornamentList);
			Set<ClientLoan> clientLoans = new HashSet<>();
			clientLoans.add(clientLoan);
			client.setClientLoans(clientLoans);
			client = clientDao.saveClient(client);
			*/
			client = clientDao.saveClient(client);
			if(client.getClientId() > 0) {
				clientLoan.setClientId(client);
				clientLoan = loanDao.saveClientLoan(clientLoan);
				if(clientLoan.getId() > 0) {
					for(ClientOrnament clientOrnamentModal : ornamentList) {
						clientOrnamentModal.setLoanId(clientLoan);
						ornamentDao.saveOrnament(clientOrnamentModal);
					}
				}
			}

			Map<String, List<Map<String, Object>>> data = new HashMap<>();
			List<Map<String, Object>> clientList = new ArrayList<>();
			Map<String, Object> clientRecord = new HashMap<>();
			clientRecord.put("client", clientDao.findById(client.getClientId()));
			clientRecord.put("clientLoan", clientLoan);
			//clientRecord.put("clientData", client);
			clientList.add(clientRecord);
			data.put("data", clientList);
			return data;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		
	}

	@Override
	public boolean updateClientInfo(Long clientId, Map<String, Object> clientInfo) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Map<String, List<Map<String, Object>>> getClientInfo(Long clientId) {
		
/*		Map<String, List<Map<String, Object>>> data = new HashMap<>();
		List<Map<String, Object>> clientList = new ArrayList<>();
		Map<String, Object> clientRecord = new HashMap<>();
		clientRecord.put("client", clientDao.findById(clientId));
		
		clientRecord.put("clientLoan", clientLoan);
		//clientRecord.put("clientData", client);
		clientList.add(clientRecord);
		data.put("data", clientList);
*/		
		return null;
	}
	
	
	@Override
	public List<Client> getClientList() {
		return clientDao.findAllClients();
	}

	@Override
	public List<ClientLoan> getClientLoanList() {
		return loanDao.findAll();
	}

	@Override
	public List<ClientOrnament> getLoanOrnamentList() {
		return ornamentDao.findAllOrnament();
	}
	
	
}
