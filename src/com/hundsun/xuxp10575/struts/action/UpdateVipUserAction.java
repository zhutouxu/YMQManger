package com.hundsun.xuxp10575.struts.action;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.hundsun.xuxp10575.beans.VipUser;
import com.hundsun.xuxp10575.service.VipUserManager;
import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
public class UpdateVipUserAction extends ActionSupport 
{
	private VipUserManager vipmgr;
	private String employno;
	private String employname;
	private String startdate;
	private String telephone;
	private String mail;
	private String department;
	
	public void setVipmgr(VipUserManager vipmgr) {
		this.vipmgr = vipmgr;
	}
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
	public String getStartdate() {
		return startdate;
	}
	public void setStartdate(String startdate) {
		this.startdate = startdate;
	}
	public String getTelephone() {
		return telephone;
	}
	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	public String getMail() {
		return mail;
	}
	public void setMail(String mail) {
		this.mail = mail;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	@Override
	public String execute() throws Exception 
	{
		VipUser user = vipmgr.Query(employno).get(0);
		user.setEmployname(employname);
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Date date = null;
		long datelong;
		try{
			datelong = format.parse(startdate).getTime();
			date = new Date(datelong);
		}
		catch(ParseException exception)
		{
			date = new Date();
		}
		user.setStartdate(date);
		user.setTelephone(telephone);
		user.setMail(mail);
		user.setDepartment(department);
		vipmgr.EditVipUser(user);

		return SUCCESS;
	}

}
