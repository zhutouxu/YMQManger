package com.hundsun.xuxp10575.beans;

import java.util.Date;
import java.util.Set;

public class ActivityTime 
{
	private int timeno;
	private char activity_type;
	private Date begintime;
	private Date endtime;
	private Set<YMQApply> ymqapply;
	private Set<YMQAssignResult> ymqassign;
	public int getTimeno() {
		return timeno;
	}
	public void setTimeno(int timeno) {
		this.timeno = timeno;
	}
	public char getActivity_type() {
		return activity_type;
	}
	public void setActivity_type(char activity_type) {
		this.activity_type = activity_type;
	}
	public Date getBegintime() {
		return begintime;
	}
	public void setBegintime(Date begintime) {
		this.begintime = begintime;
	}
	public Date getEndtime() {
		return endtime;
	}
	public void setEndtime(Date endtime) {
		this.endtime = endtime;
	}
	public Set<YMQApply> getYmqapply() {
		return ymqapply;
	}
	public void setYmqapply(Set<YMQApply> ymqapply) {
		this.ymqapply = ymqapply;
	}
	public Set<YMQAssignResult> getYmqassign() {
		return ymqassign;
	}
	public void setYmqassign(Set<YMQAssignResult> ymqassign) {
		this.ymqassign = ymqassign;
	}
	
}
