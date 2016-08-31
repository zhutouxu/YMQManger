package com.hundsun.xuxp10575.service;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;

import org.hibernate.criterion.Restrictions;
import org.hibernate.criterion.SimpleExpression;

import com.hundsun.xuxp10575.beans.ActivityTime;
import com.hundsun.xuxp10575.beans.VipUser;
import com.hundsun.xuxp10575.beans.YMQApply;
import com.hundsun.xuxp10575.constant.ApplyStatus;
import com.hundsun.xuxp10575.dao.hibernateQuery;

public class YMQApplySvr implements IApplySvr
{
	private hibernateQuery<YMQApply> hQuery = new hibernateQuery<YMQApply>(); 
	private hibernateQuery<VipUser> hQuery2 = new hibernateQuery<VipUser>();
	private QryManager qryManager = new QryManager();
	public boolean AddApply(String employno,int timeno)
	{
		YMQApply apply = null;
		boolean flag = false;
		apply = this.GetApply(employno,timeno);
		if(apply == null)			
		{
			apply = new YMQApply();
			flag = true;
		}
		List<SimpleExpression> filters = new LinkedList<SimpleExpression>();
		filters.add(Restrictions.eq("employno", employno));
		List<VipUser> lists = hQuery2.DoQuery(filters,new VipUser());
		if(lists.size() > 0)
			apply.setVipflag('1');
		else
			apply.setVipflag('0');		
		List<ActivityTime> timelists = qryManager.QryActivityTime(timeno);
		if(timelists.size() > 0)
			apply.setActivitytime(timelists.get(0));
		else
			return false;
		
		apply.setApplystatus(ApplyStatus.APPLYSUBMIT);		
		apply.setApplydate(new Date());
		apply.setEmployno(employno);
		if(flag)
			return hQuery.DoAdd(apply);
		else
			return hQuery.DoUpdate(apply);
	}
	
	public boolean CancelApply(String employno)	
	{
		List<YMQApply> applies = qryManager.QryApply(employno);		
		if(applies.size() == 0)
			return false;
		for(YMQApply apply : applies)
		{
			if(apply.getApplystatus().equals(ApplyStatus.APPLYSUBMIT))
			{
				apply.setApplystatus(ApplyStatus.APPLYCANCEL);			
				return hQuery.DoUpdate(apply);				
			}
		}
		return false;
	}
	
	private YMQApply GetApply(String employno,int timeno)
	{
		List<YMQApply> applies = qryManager.QryApply(employno);
		for(YMQApply apply :applies)
		{
			if(apply.getActivitytime().getTimeno() == timeno)
			{
				return apply;
			}
		}
		return null;
	}
}
