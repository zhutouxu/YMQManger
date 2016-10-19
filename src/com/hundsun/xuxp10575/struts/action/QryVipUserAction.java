package com.hundsun.xuxp10575.struts.action;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.hundsun.xuxp10575.beans.VipUser;
import com.hundsun.xuxp10575.service.VipUserManager;
import com.hundsun.xuxp10575.struts.form.QryVipUserReturn;
import com.hundsun.xuxp10575.utils.JsonDateValueProcessor;
import com.opensymphony.xwork2.ActionSupport;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;

@SuppressWarnings("serial")
public class QryVipUserAction extends ActionSupport
{
	private VipUserManager vipmgr;
	private String employno;
	private int pageno;
	private int pagesize;
	List<QryVipUserReturn> returndatas;

	public void setVipmgr(VipUserManager vipmgr) {
		this.vipmgr = vipmgr;
	}

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
	public List<QryVipUserReturn> getReturndatas() {
		return returndatas;
	}

	@Override
	public String execute() throws Exception 
	{		
		List<VipUser> users = vipmgr.Query(employno);
		int totalcount= users.size();
		returndatas = new ArrayList<QryVipUserReturn>();
		if(pageno != 0 && pagesize != 0)
		{
			int fromindex = (pageno-1)*pagesize;
			if(fromindex > totalcount)
			{
				return SUCCESS;
			}
			int toindex = pageno*pagesize;
			if(pageno*pagesize > totalcount)
				toindex = totalcount;
			users = users.subList(fromindex, toindex);
		}
		for(VipUser user :users)
		{
			QryVipUserReturn returndata = new QryVipUserReturn();
			returndata.setEmployno(user.getEmployno());
			returndata.setEmployname(user.getEmployname());
			returndata.setStartdate(user.getStartdate());
			returndata.setMail(user.getMail());
			returndata.setTelephone(user.getTelephone());
			returndata.setDepartment(user.getDepartment());
			returndata.setTotalcount(totalcount);
			returndatas.add(returndata);
		}
		return SUCCESS;
	}
	
	private JSONArray JSonPack(Object object)
	{
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.registerJsonValueProcessor(Date.class, new JsonDateValueProcessor());
		JSONArray jsonArray = JSONArray.fromObject(object,jsonConfig);
		return jsonArray;
	}
}
