package com.hundsun.xuxp10575.struts.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.hundsun.xuxp10575.service.*;
import com.hundsun.xuxp10575.struts.form.ReturnInfo2;
import com.hundsun.xuxp10575.struts.form.ReturnToken;
import com.hundsun.xuxp10575.utils.SessionAttribute;
import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
public class LoginAction extends ActionSupport
{
	private String username;
	private String userpwd;
	private ReturnInfo2 returnInfo2;
	private ReturnToken returnToken;
	
	public String getUsername()
	{
		return username;
	}
	
	public String getUserpwd()
	{
		return userpwd;
	}
	
	public void setUsername(String name)
	{
		this.username = name;
	}
	
	public void setUserpwd(String pwd)
	{
		this.userpwd = pwd;
	}	
	
	public ReturnToken getReturnToken() {
		return returnToken;
	}

	public ReturnInfo2 getReturnInfo2() {
		return returnInfo2;
	}

	@Override
	public String execute() throws Exception 
	{
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpServletResponse response = ServletActionContext.getResponse();
		//LoginManager loginManager = new LoginManager();
		ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
		LoginManager loginManager = context.getBean("loginManager",LoginManager.class);
		if(loginManager.DoLogin(username, userpwd))
		{
			returnToken = new ReturnToken();
			returnToken.setUser_id(username);
			request.getSession().setAttribute(SessionAttribute.USER_ID, username);
			returnInfo2 = new ReturnInfo2();
			returnInfo2.setError_code("0");
			returnInfo2.setError_info("登录成功！");
			return SUCCESS;
		}
		else
		{
			returnInfo2 = new ReturnInfo2();
			returnInfo2.setError_code("-51");
			returnInfo2.setError_info("用户名与密码不匹配！");	
			return ERROR;
		}		
		// TODO 自动生成的方法存根
	}
	/**
	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception
	{
		LoginActionForm actionForm = (LoginActionForm)form;
		String name = actionForm.getUsername();
		String pwd = actionForm.getUserpwd();	
		LoginManager loginManager = new LoginManager();
		if(loginManager.DoLogin(name, pwd))
		{
			ReturnToken returnToken = new ReturnToken();
			returnToken.setUser_id(name);
			JSONObject jsondata = JSONObject.fromObject(returnToken);
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(jsondata.toString());
			request.getSession().setAttribute(SessionAttribute.USER_ID, name);
			//return mapping.findForward("success");
		}
		else
		{
			ReturnInfo2 returnInfo2 = new ReturnInfo2();
			returnInfo2.setError_code("-51");
			returnInfo2.setError_info("用户名与密码不匹配！");
			JSONObject jsondata = JSONObject.fromObject(returnInfo2);
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(jsondata.toString());			
		}		
		return super.execute(mapping, actionForm, request, response);
	}*/
	
}
