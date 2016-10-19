package com.hundsun.xuxp10575.struts.action;

import com.hundsun.xuxp10575.service.SignInManager;
import com.hundsun.xuxp10575.struts.form.ReturnInfo;
import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
public class YMQSignInAction extends ActionSupport 
{
	private SignInManager sInManager;
	private String userId;
	private ReturnInfo returnInfo;
	
	public void setsInManager(SignInManager sInManager) {
		this.sInManager = sInManager;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public ReturnInfo getReturnInfo() {
		return returnInfo;
	}
	@Override
	public String execute() throws Exception 
	{
		returnInfo = new ReturnInfo();
		String return_msg = sInManager.YMQSignIn(userId);		
		returnInfo.setReturn_code("0");
		returnInfo.setReturn_msg(return_msg);	

		return SUCCESS;
	}

}
