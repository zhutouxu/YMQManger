package com.hundsun.xuxp10575.service;

import java.util.LinkedList;
import java.util.List;

import org.hibernate.criterion.Restrictions;
import org.hibernate.criterion.SimpleExpression;

import com.hundsun.xuxp10575.beans.VipUser;
import com.hundsun.xuxp10575.dao.BaseDao;

public class VipUserManager 
{
	private BaseDao<VipUser> vipuserDao;
	
	public void setVipuserDao(BaseDao<VipUser> vipuserDao) {
		this.vipuserDao = vipuserDao;
	}

	public boolean AddVipUser(VipUser user)
	{		
		return vipuserDao.DoAdd(user);
	}
	
	public boolean EditVipUser(VipUser user)
	{
		return vipuserDao.DoUpdate(user);
	}
	
	public boolean DelVipUser(VipUser user)
	{		
		return vipuserDao.DoDelete(user);
	}
	public List<VipUser> Query(String employno)
	{
		if(employno == null || employno.isEmpty())
			return vipuserDao.DoQuery(null,new VipUser());
		else
		{
			List<SimpleExpression> filters = new LinkedList<SimpleExpression>();
			filters.add(Restrictions.eq("employno", employno));
			return vipuserDao.DoQuery(filters,new VipUser());
		}
	}
}
