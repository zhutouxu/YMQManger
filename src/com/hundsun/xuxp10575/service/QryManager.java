package com.hundsun.xuxp10575.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.hundsun.xuxp10575.beans.ActivityTime;
import com.hundsun.xuxp10575.beans.YMQApply;
import com.hundsun.xuxp10575.beans.YMQAssignResult;
import com.hundsun.xuxp10575.beans.YMQField;
import com.hundsun.xuxp10575.dao.BaseDao;
import com.hundsun.xuxp10575.utils.TimeParse;

public class QryManager 
{
	private BaseDao<ActivityTime>  timeDao = null;
	private BaseDao<YMQApply> ymqapplyDao = null;
	private BaseDao<YMQAssignResult> ymqresultDao = null;
	private BaseDao<YMQField> ymqfieldDao = null;
	
	public void setTimeDao(BaseDao<ActivityTime> timeDao) {
		this.timeDao = timeDao;
	}

	public void setYmqapplyDao(BaseDao<YMQApply> ymqapplyDao) {
		this.ymqapplyDao = ymqapplyDao;
	}

	public void setYmqresultDao(BaseDao<YMQAssignResult> ymqresultDao) {
		this.ymqresultDao = ymqresultDao;
	}

	public void setYmqfieldDao(BaseDao<YMQField> ymqfieldDao) {
		this.ymqfieldDao = ymqfieldDao;
	}

	public List<ActivityTime> QryActivityTime(int timeno)
	{
		String Hql = null;
		if(timeno != 0)
			Hql = "from ActivityTime where timeno="+String.valueOf(timeno);
		else
		    Hql = "from ActivityTime";
		return timeDao.DoQuery(Hql);
	}
	
	public List<YMQField> QryYMQField(int fieldno)
	{
		String Hql = null;
		if(fieldno != 0)
			Hql = "from YMQField where enable='1' and fieldno="+String.valueOf(fieldno);
		else
		    Hql = "from YMQField where enable='1'";
		return ymqfieldDao.DoQuery(Hql);
	}
	
	public List<YMQApply> QryApply(String employno)
	{
		String Hql = "from YMQApply where employno = " + employno;
		return ymqapplyDao.DoQuery(Hql);		
	}
	
	public List<YMQAssignResult> QryAssignResult(String employno)
	{
		if(employno == null || employno.isEmpty())
		{
			return ymqresultDao.DoQuery("from YMQAssignResult");
		}
		String Hql = "from YMQAssignResult where employno = " + employno;
		return ymqresultDao.DoQuery(Hql);
				
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
		List<ActivityTime> times = timeDao.DoQuery(hql);
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
