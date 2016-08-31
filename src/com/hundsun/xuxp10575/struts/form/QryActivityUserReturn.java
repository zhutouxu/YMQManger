package com.hundsun.xuxp10575.struts.form;

import java.util.List;

public class QryActivityUserReturn 
{
	private String return_code;
	private String return_msg;
	private List<ActivityUser> data;
	private String time;
	public String getReturn_code() {
		return return_code;
	}
	public void setReturn_code(String return_code) {
		this.return_code = return_code;
	}
	public String getReturn_msg() {
		return return_msg;
	}
	public void setReturn_msg(String return_msg) {
		this.return_msg = return_msg;
	}
	public List<ActivityUser> getData() {
		return data;
	}
	public void setData(List<ActivityUser> data) {
		this.data = data;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
}
