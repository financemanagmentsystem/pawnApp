package com.myCompany.springmvc.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;


import com.myCompany.springmvc.model.User;

@Repository("userDao")
public class UserDaoImpl extends AbstractDao<Integer, User> implements UserDao {

	@Override
	public User findById(int id) {
		return getByKey(id);
	}

	@Override
	public boolean saveUser(User user) {
		getSession().save(user);
		if( user.getId() > 0) {
			 return true;
		}
		return false;
		
	}

	@Override
	public void deleteUserById(Long userId) {
		Query query = getSession().createSQLQuery("delete from User where user_id = :userId");
		query.setLong("userId", userId);
		query.executeUpdate();
		
	}

	@Override
	public List<User> findAllUsers() {
		Criteria criteria = createEntityCriteria();
		return (List<User>) criteria.list();
	}

	@Override
	public User findUserByUserNameAndPassword(String userName, String password) {
		Criteria criteria = createEntityCriteria();
		criteria.add(Restrictions.eq("userName", userName));
		criteria.add(Restrictions.eq("password", password));
		return (User)criteria.uniqueResult();
		/*	Query query = getSession().createSQLQuery("delete from Employee where ssn = :ssn");
		query.setString("ssn", ssn);
		query.executeUpdate();
	*/}

}
