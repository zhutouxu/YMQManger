package com.hundsun.xuxp10575.struts.form;

import org.apache.struts.action.ActionForm;

public class QryVipUserForm extends ActionForm 
{
	private String employno;
	private int pageno;
	private int pagesize;

	public String getEmployno() {
		return employno;
	}

	public void setEmployno(String employno) {
		this.employno = employno;
	}

	public int getPageno() {
		return pageno;
	}

	public void setPageno(int pageno) {
		this.pageno = pageno;
	}

	public int getPagesize() {
		return pagesize;
	}

	public void setPagesize(int pagesize) {
		this.pagesize = pagesize;
	}
}
