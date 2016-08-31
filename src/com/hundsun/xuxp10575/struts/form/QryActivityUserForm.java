package com.hundsun.xuxp10575.struts.form;

import org.apache.struts.action.ActionForm;

public class QryActivityUserForm extends ActionForm 
{
	private String placeNo;
	private String authUserId;
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
}
