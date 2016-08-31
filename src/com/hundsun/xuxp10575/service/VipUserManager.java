package com.hundsun.xuxp10575.service;

import java.util.LinkedList;
import java.util.List;

import org.hibernate.criterion.Restrictions;
import org.hibernate.criterion.SimpleExpression;

import com.hundsun.xuxp10575.beans.VipUser;
import com.hundsun.xuxp10575.dao.hibernateQuery;

public class VipUserManager 
{
	private hibernateQuery<VipUser> hQuery = new hibernateQuery<VipUser>();
	
	public boolean AddVipUser(VipUser user)
	{		
		return hQuery.DoAdd(user);
	}
	
	public boolean EditVipUser(VipUser user)
	{
		return hQuery.DoUpdate(user);
	}
	
	public boolean DelVipUser(VipUser user)
	{		
		return hQuery.DoDelete(user);
	}
	public List<VipUser> Query(String employno)
	{
		if(employno == null || employno.isEmpty())
			return hQuery.DoQuery(null,new VipUser());
		else
		{
			List<SimpleExpression> filters = new LinkedList<SimpleExpression>();
			filters.add(Restrictions.eq("employno", employno));
			return hQuery.DoQuery(filters,new VipUser());
		}
	}
}
