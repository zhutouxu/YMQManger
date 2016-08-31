package com.hundsun.xuxp10575.beans;

public class YMQAssignResult 
{
	private int assignno;
	private String employno;
	private int fieldno;
	//private int timeno;
	private ActivityTime activitytime;
	private String signstatus;
	public int getAssignno() {
		return assignno;
	}
	public void setAssignno(int assignno) {
		this.assignno = assignno;
	}
	public String getEmployno() {
		return employno;
	}
	public void setEmployno(String employno) {
		this.employno = employno;
	}
	public int getFieldno() {
		return fieldno;
	}
	public void setFieldno(int fieldno) {
		this.fieldno = fieldno;
	}
	public ActivityTime getActivitytime() {
		return activitytime;
	}
	public void setActivitytime(ActivityTime activitytime) {
		this.activitytime = activitytime;
	}
	/**public int getTimeno() {
		return timeno;
	}
	public void setTimeno(int timeno) {
		this.timeno = timeno;
	}*/
	public String getSignstatus() {
		return signstatus;
	}
	public void setSignstatus(String signstatus) {
		this.signstatus = signstatus;
	}
}
