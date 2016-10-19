package com.hundsun.xuxp10575.struts.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.apache.struts2.ServletActionContext;

import com.hundsun.xuxp10575.utils.MyLog;
import com.hundsun.xuxp10575.utils.SessionAttribute;
import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
public class LogoutAction extends ActionSupport 
{
	@Override
	public String execute() throws Exception 
	{
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession(false);
		
		if(session != null)
		{
			MyLog.LogInfo(session.getAttribute(SessionAttribute.USER_ID).toString() + "is LogOut");
			session.removeAttribute(SessionAttribute.USER_ID);
		}
		return SUCCESS;
	}
	
}
