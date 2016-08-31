package com.hundsun.xuxp10575.struts.form;

import org.apache.struts.action.ActionForm;

public class GetApplyInfoForm extends ActionForm 
{
	private String applystatus;
	private String signstatus;
	private int timeno;
	private int fieldno;
	private int pageno;
	private int pagesize;

	public String getApplystatus() {
		return applystatus;
	}
	public void setApplystatus(String applystatus) {
		this.applystatus = applystatus;
	}
	public String getSignstatus() {
		return signstatus;
	}
	public void setSignstatus(String signstatus) {
		this.signstatus = signstatus;
	}
	public int getTimeno() {
		return timeno;
	}
	public void setTimeno(int timeno) {
		this.timeno = timeno;
	}
	public int getFieldno() {
		return fieldno;
	}
	public void setFieldno(int fieldno) {
		this.fieldno = fieldno;
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
