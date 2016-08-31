package com.hundsun.xuxp10575.struts.form;

import org.apache.struts.action.ActionForm;

public class LoginActionForm extends ActionForm
{
	private String username;
	private String userpwd;
	
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
}
