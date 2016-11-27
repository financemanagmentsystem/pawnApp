package com.myCompany.springmvc.dao;

import java.util.List;

import com.myCompany.springmvc.model.ClientOrnament;


public interface OrnamentDao {
	
	ClientOrnament findById(Long id);

	ClientOrnament saveOrnament(ClientOrnament clientOrnament);
	
	void deleteOrnamnetById(Long userId);
	
	List<ClientOrnament> findAllOrnament();

}
