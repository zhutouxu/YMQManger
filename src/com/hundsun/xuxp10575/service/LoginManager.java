package com.hundsun.xuxp10575.service;

import java.util.LinkedList;
import java.util.List;

import org.hibernate.criterion.Restrictions;
import org.hibernate.criterion.SimpleExpression;
import com.hundsun.xuxp10575.beans.Admin;
import com.hundsun.xuxp10575.dao.*;
import com.hundsun.xuxp10575.utils.SaltHash;

public class LoginManager 
{
	private hibernateQuery<Admin> hQuery = new hibernateQuery<Admin>();
	
	public boolean DoLogin(String name, String passwd)
	{
		List<SimpleExpression> filters = new LinkedList<SimpleExpression>();
		filters.add(Restrictions.eq("name", name));
		if(passwd.isEmpty())
			filters.add(Restrictions.eq("password", passwd));
		else			
			filters.add(Restrictions.eq("password", SaltHash.getMd5(passwd)));
		List<Admin> lists = hQuery.DoQuery(filters,new Admin());
		if(lists.size() > 0)
			return true;
		return false;
	}
	
	public int ChangePassword(String name,String NewPwd,String OldPwd)
	{
		List<SimpleExpression> filters = new LinkedList<SimpleExpression>();
		filters.add(Restrictions.eq("name", name));
		if(OldPwd.isEmpty())
			filters.add(Restrictions.eq("password", OldPwd));
		else			
			filters.add(Restrictions.eq("password", SaltHash.getMd5(OldPwd)));
		List<Admin> lists = hQuery.DoQuery(filters,new Admin());	
		if(lists.size() <= 0)
			return -1;
		Admin admin = lists.get(0);
		admin.setPassword(SaltHash.getMd5(NewPwd));
		if(hQuery.DoUpdate(admin))
			return 0;
		else
			return -1;
	}
	
	
}
