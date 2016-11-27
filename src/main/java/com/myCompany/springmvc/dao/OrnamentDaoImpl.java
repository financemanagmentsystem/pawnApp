package com.myCompany.springmvc.dao;


import java.util.List;

import org.hibernate.Criteria;
import org.springframework.stereotype.Repository;

import com.myCompany.springmvc.model.ClientLoan;
import com.myCompany.springmvc.model.ClientOrnament;

@Repository("ornamentDao")
public class OrnamentDaoImpl extends AbstractDao<Long, ClientOrnament> implements OrnamentDao {

	@Override
	public ClientOrnament findById(Long id) {
		return getByKey(id);
	}

	@Override
	public ClientOrnament saveOrnament(ClientOrnament clientOrnament) {
		getSession().save(clientOrnament);
		System.out.println(clientOrnament.toString());
		return clientOrnament;
	}

	@Override
	public void deleteOrnamnetById(Long userId) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<ClientOrnament> findAllOrnament() {
		Criteria criteria = createEntityCriteria();
		return (List<ClientOrnament>) criteria.list();
	}

}
