package com.hundsun.xuxp10575.struts.action;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.hundsun.xuxp10575.beans.ActivityTime;
import com.hundsun.xuxp10575.beans.YMQAssignResult;
import com.hundsun.xuxp10575.constant.SignStatus;
import com.hundsun.xuxp10575.service.QryManager;
import com.hundsun.xuxp10575.struts.form.ActivityUser;
import com.hundsun.xuxp10575.struts.form.QryActivityUserForm;
import com.hundsun.xuxp10575.struts.form.QryActivityUserReturn;
import com.hundsun.xuxp10575.utils.TimeParse;

import net.sf.json.JSONObject;

public class QryActivityUserAction extends Action 
{

	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception 
	{
		String fieldno = null,auth_userid =  null;
		List<YMQAssignResult> results = null;
		QryActivityUserForm activityUserForm = (QryActivityUserForm)form;
		if(activityUserForm != null)
		{
			fieldno = activityUserForm.getPlaceNo();
			auth_userid = activityUserForm.getAuthUserId();
		}
		QryManager qryManager = new QryManager();
		ActivityTime now = qryManager.GetNowTime();
		if(fieldno != null)
			results = qryManager.QryNowActivityUser(now,Integer.parseInt(fieldno));
		else
			results = qryManager.QryNowActivityUser(now,-1);
		
		List<ActivityUser> activityUsers = new ArrayList<ActivityUser>();
		QryActivityUserReturn returninfo = new QryActivityUserReturn();
		if(results == null || results.size() == 0)
		{
			returninfo.setReturn_code("0");
			returninfo.setReturn_msg("查询成功");
			returninfo.setData(null);
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
		JSONObject jsondata = JSONObject.fromObject(returninfo);
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(jsondata.toString());				
		// TODO �Զ���ɵķ������
		return super.execute(mapping, form, request, response);
	}

}
