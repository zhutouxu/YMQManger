package com.hundsun.xuxp10575.struts.form;

import org.apache.struts.action.ActionForm;

public class YMQSignInForm	extends ActionForm 
{
	private String userId;
	private String authUserId;
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getAuthUserId() {
		return authUserId;
	}
	public void setAuthUserId(String authUserId) {
		this.authUserId = authUserId;
	}
}
