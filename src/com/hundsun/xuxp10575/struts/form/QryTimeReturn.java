package com.hundsun.xuxp10575.struts.form;

import java.util.List;

import com.hundsun.xuxp10575.struts.form.TimeData;

public class QryTimeReturn
{
	private String return_code;
	private String return_msg;
	private List<TimeData> data;
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
	public List<TimeData> getData() {
		return data;
	}
	public void setData(List<TimeData> data) {
		this.data = data;
	}
}