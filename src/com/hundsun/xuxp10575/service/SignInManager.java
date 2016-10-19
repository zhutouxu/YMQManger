package com.hundsun.xuxp10575.service;

import java.util.Calendar;
import java.util.List;

import com.hundsun.xuxp10575.beans.ActivityTime;
import com.hundsun.xuxp10575.beans.YMQAssignResult;
import com.hundsun.xuxp10575.constant.SignStatus;
import com.hundsun.xuxp10575.dao.BaseDao;
import com.hundsun.xuxp10575.utils.TimeParse;

public class SignInManager 
{
	private BaseDao<YMQAssignResult> ymqresultDao;
	private QryManager qryManager;
	
	public void setYmqresultDao(BaseDao<YMQAssignResult> ymqresultDao) {
		this.ymqresultDao = ymqresultDao;
	}
	public void setQryManager(QryManager qryManager) {
		this.qryManager = qryManager;
	}
	public String YMQSignIn(String employno)
	{
		String return_msg = null;
		List<YMQAssignResult> assignResults = qryManager.QryAssignResult(employno);
		if(assignResults.size() == 0)
		{
			return_msg = "今天无报名或报名未成功！";		
		}
		else
		{
			YMQAssignResult result = assignResults.get(0); 
			int checkvalue = CheckTime(result.getActivitytime());
			if(checkvalue == -1)
			{
				//还未开始
				return_msg = "活动时间未开始，请稍后签到！";	
			}
			else
			if(checkvalue == -2)
			{
				//活动已结束
				return_msg = "活动时段已结束！";	
			}
			else
			{
				if(result.getSignstatus() == SignStatus.SIGNYES)
				{
					//已签到
					return_msg = "您已签到！";	
				}
				else
				{
					//签到成功
					Dosign(result);
					return_msg = "签到成功！";
				}
			}
			ActivityTime time = result.getActivitytime();
			return_msg = return_msg + "\n您的活动时段是"+ TimeParse.parseHHmm(time.getBegintime()) + "-" +TimeParse.parseHHmm(time.getEndtime())
					+",场地：" + result.getFieldno();	
		}
		return return_msg;
	}
	private boolean Dosign(YMQAssignResult result)
	{		
		result.setSignstatus(SignStatus.SIGNYES);
		return ymqresultDao.DoUpdate(result);
	}
	private int CheckTime(ActivityTime time)
	{
		Calendar now = Calendar.getInstance();
		int NowMtime = now.get(Calendar.HOUR_OF_DAY)*60+now.get(Calendar.MINUTE);
		int startMtime = TimeParse.GetHour(time.getBegintime())*60 + TimeParse.GetMinute(time.getBegintime()) - 30;//提前半小时
		int endMtime = TimeParse.GetHour(time.getEndtime())*60 + TimeParse.GetMinute(time.getEndtime());
		if(NowMtime >= startMtime && NowMtime < endMtime)
		{
			return 0;
		}
		else
		if(NowMtime < startMtime)
		{
			return -1;
		}
		else
		{			
			return -2;
		}
	}	
}
