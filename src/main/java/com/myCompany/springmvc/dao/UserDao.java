package com.myCompany.springmvc.dao;

import java.util.List;

import com.myCompany.springmvc.model.User;

public interface UserDao {
	
	User findById(int id);

	boolean saveUser(User user);
	
	void deleteUserById(Long userId);
	
	List<User> findAllUsers();

	User findUserByUserNameAndPassword(String userName, String password);

}
