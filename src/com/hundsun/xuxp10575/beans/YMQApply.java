package com.hundsun.xuxp10575.beans;

import java.util.Date;

public class YMQApply extends Object
{
	private String applyno;
	private Date applydate;
	private String employno;
	//private int timeno;
	private char vipflag;
	private String applystatus;
	private ActivityTime activitytime;
	
	public String getApplyno() {
		return applyno;
	}
	public void setApplyno(String applyno) {
		this.applyno = applyno;
	}
	public Date getApplydate() {
		return applydate;
	}
	public void setApplydate(Date applydate) {
		this.applydate = applydate;
	}
	public String getEmployno() {
		return employno;
	}
	public void setEmployno(String employno) {
		this.employno = employno;
	}
	public char getVipflag() {
		return vipflag;
	}
	public void setVipflag(char vipflag) {
		this.vipflag = vipflag;
	}
	/**public int getTimeno() {
		return timeno;
	}
	public void setTimeno(int timeno) {
		this.timeno = timeno;
	}*/
	public String getApplystatus() {
		return applystatus;
	}
	public void setApplystatus(String applystatus) {
		this.applystatus = applystatus;
	}
	public ActivityTime getActivitytime() {
		return activitytime;
	}
	public void setActivitytime(ActivityTime activityTime) {
		this.activitytime = activityTime;
	}
	
	@Override
	public boolean equals(Object obj) 
	{
		if(this == obj)
			return true;
		if(obj instanceof YMQApply)
		{
			YMQApply apply2 = (YMQApply)obj;
			if(apply2.getApplyno().equals(this.getApplyno()))
				return true;
		}
		return false;
	}
	@Override
	public int hashCode() 
	{
		return Integer.valueOf(this.getApplyno());
	}	
	
}
