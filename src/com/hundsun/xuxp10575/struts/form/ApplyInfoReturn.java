package com.hundsun.xuxp10575.struts.form;

import java.util.Date;

public class ApplyInfoReturn 
{
	private String employno;
	private String employname;
	private Date applydate;
	private String timeno;
	private String applystatus;
	private String signstatus;
	private String fieldno;
	private int totalcount;
	
	public String getEmployno() {
		return employno;
	}
	public void setEmployno(String employno) {
		this.employno = employno;
	}
	public String getEmployname() {
		return employname;
	}
	public void setEmployname(String employname) {
		this.employname = employname;
	}
	public Date getApplydate() {
		return applydate;
	}
	public void setApplydate(Date applydate) {
		this.applydate = applydate;
	}
	public String getTimeno() {
		return timeno;
	}
	public void setTimeno(String timeno) {
		this.timeno = timeno;
	}
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
	public String getFieldno() {
		return fieldno;
	}
	public void setFieldno(String fieldno) {
		this.fieldno = fieldno;
	}
	public int getTotalcount() {
		return totalcount;
	}
	public void setTotalcount(int totalcount) {
		this.totalcount = totalcount;
	}
}
