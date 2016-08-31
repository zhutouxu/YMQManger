package com.hundsun.xuxp10575.struts.form;

import org.apache.struts.action.ActionForm;

public class ChangePwdForm extends ActionForm 
{
	private String name;
	private String oldpwd;
	private String newpwd;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getOldpwd() {
		return oldpwd;
	}
	public void setOldpwd(String oldpwd) {
		this.oldpwd = oldpwd;
	}
	public String getNewpwd() {
		return newpwd;
	}
	public void setNewpwd(String newpwd) {
		this.newpwd = newpwd;
	}

}
