package com.hundsun.xuxp10575.struts.action;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.hundsun.xuxp10575.beans.ActivityTime;
import com.hundsun.xuxp10575.beans.YMQAssignResult;
import com.hundsun.xuxp10575.constant.SignStatus;
import com.hundsun.xuxp10575.service.QryManager;
import com.hundsun.xuxp10575.struts.form.ActivityUser;
import com.hundsun.xuxp10575.struts.form.QryActivityUserReturn;
import com.hundsun.xuxp10575.utils.TimeParse;
import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
public class QryActivityUserAction extends ActionSupport 
{
	private QryManager qryManager;
	private String placeNo;
	private String authUserId;
	QryActivityUserReturn returninfo;
	public void setQryManager(QryManager qryManager) {
		this.qryManager = qryManager;
	}
	public String getPlaceNo() {
		return placeNo;
	}
	public void setPlaceNo(String placeNo) {
		this.placeNo = placeNo;
	}
	public String getAuthUserId() {
		return authUserId;
	}
	public void setAuthUserId(String authUserId) {
		this.authUserId = authUserId;
	}
	public QryActivityUserReturn getReturninfo() {
		return returninfo;
	}
	@Override
	public String execute() throws Exception 
	{
		List<YMQAssignResult> results = null;
		ActivityTime now = qryManager.GetNowTime();
		if(placeNo != null)
			results = qryManager.QryNowActivityUser(now,Integer.parseInt(placeNo));
		else
			results = qryManager.QryNowActivityUser(now,-1);
		
		List<ActivityUser> activityUsers = new ArrayList<ActivityUser>();
		returninfo = new QryActivityUserReturn();
		if(results == null || results.size() == 0)
		{
			returninfo.setReturn_code("0");
			returninfo.setReturn_msg("查询成功");
			returninfo.setData(activityUsers);
			if(now != null)
				returninfo.setTime(TimeParse.parseHHmm(now.getBegintime())+"-"+TimeParse.parseHHmm(now.getEndtime()));
			else
				returninfo.setTime(TimeParse.parseHHmm(new Date()));
		}
		else
		{
			returninfo.setReturn_code("0");
			returninfo.setReturn_msg("查询成功");
			for(YMQAssignResult result :results)
			{
				ActivityUser user = new ActivityUser();				
				user.setUserName(result.getEmployno());
				if(result.getSignstatus() == SignStatus.SIGNYES)
					user.setSignIn("已签到");
				else
					user.setSignIn("未签到");
				activityUsers.add(user);
			}
			returninfo.setData(activityUsers);
			returninfo.setTime(TimeParse.parseHHmm(now.getBegintime())+"-"+TimeParse.parseHHmm(now.getEndtime()));
		}
		return SUCCESS;
	}

}
