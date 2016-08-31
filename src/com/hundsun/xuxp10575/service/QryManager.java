package com.hundsun.xuxp10575.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.hundsun.xuxp10575.beans.ActivityTime;
import com.hundsun.xuxp10575.beans.YMQApply;
import com.hundsun.xuxp10575.beans.YMQAssignResult;
import com.hundsun.xuxp10575.beans.YMQField;
import com.hundsun.xuxp10575.dao.hibernateQuery;
import com.hundsun.xuxp10575.utils.TimeParse;

public class QryManager 
{
	private hibernateQuery<ActivityTime>  hQuery = null;
	private hibernateQuery<YMQApply> hQuery2 = null;
	private hibernateQuery<YMQAssignResult> hQuery3 = null;
	private hibernateQuery<YMQField> hQuery4 = null;
	
	public List<ActivityTime> QryActivityTime(int timeno)
	{
		String Hql = null;
		if(hQuery == null)			
			hQuery = new hibernateQuery<ActivityTime>();
		if(timeno != 0)
			Hql = "from ActivityTime where timeno="+String.valueOf(timeno);
		else
		    Hql = "from ActivityTime";
		return hQuery.DoQuery(Hql);
	}
	
	public List<YMQField> QryYMQField(int fieldno)
	{
		String Hql = null;
		if(hQuery4 == null)			
			hQuery4 = new hibernateQuery<YMQField>();
		if(fieldno != 0)
			Hql = "from YMQField where fieldno="+String.valueOf(fieldno);
		else
		    Hql = "from YMQField";
		return hQuery4.DoQuery(Hql);
	}
	
	public List<YMQApply> QryApply(String employno)
	{
		if(hQuery2 == null)	
			hQuery2 = new hibernateQuery<YMQApply>();
		String Hql = "from YMQApply where employno = " + employno;
		return hQuery2.DoQuery(Hql);		
	}
	
	public List<YMQAssignResult> QryAssignResult(String employno)
	{
		if(hQuery3 == null)	
			hQuery3 = new hibernateQuery<YMQAssignResult>();
		if(employno == null)
		{
			return hQuery3.DoQuery("from YMQAssignResult");
		}
		String Hql = "from YMQAssignResult where employno = " + employno;
		return hQuery3.DoQuery(Hql);
				
	}
	
	public List<YMQAssignResult> QryNowActivityUser(ActivityTime time,int field_no)
	{
		if(time == null)
			return null;
		List<YMQAssignResult> results = new ArrayList<YMQAssignResult>(time.getYmqassign());
		List<YMQAssignResult> returndata = new ArrayList<YMQAssignResult>();
		if(field_no > 0)
		{
			for (YMQAssignResult item :results)
			{
				if(item.getFieldno() == field_no)
					returndata.add(item);
			}
		}
		return returndata;
	}
	
	public ActivityTime GetNowTime()
	{
		String nowtime = TimeParse.parseHHmm(new Date());
		String hql = "from ActivityTime";
		if(hQuery == null)
			hQuery = new hibernateQuery<ActivityTime>();
		List<ActivityTime> times = hQuery.DoQuery(hql);
		for(ActivityTime time :times)
		{
			String begin_time = TimeParse.parseHHmm(time.getBegintime());
			String end_time = TimeParse.parseHHmm(time.getEndtime());
			if(nowtime.compareTo(begin_time) >= 0 && nowtime.compareTo(end_time) < 0)
			{
				return time;
			}
		}
		return null;
	}
}
