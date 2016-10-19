package com.hundsun.xuxp10575.struts.action;

import java.util.List;

import com.hundsun.xuxp10575.beans.VipUser;
import com.hundsun.xuxp10575.service.VipUserManager;
import com.hundsun.xuxp10575.struts.form.ReturnInfo2;
import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
public class DelVipUserAction extends ActionSupport 
{
	private VipUserManager vipmgr;
	private String employno;
	private ReturnInfo2 returnInfo2;
	public String getEmployno() {
		return employno;
	}
	public void setEmployno(String employno) {
		this.employno = employno;
	}
	public ReturnInfo2 getReturnInfo2() {
		return returnInfo2;
	}
	public void setVipmgr(VipUserManager vipmgr) {
		this.vipmgr = vipmgr;
	}
	@Override
	public String execute() throws Exception 
	{
		returnInfo2 = new ReturnInfo2();
		if(employno == null ||employno.isEmpty())
		{
			returnInfo2.setError_code("-102");
			returnInfo2.setError_info("用户不存在");
		}
		else
		{
			List<VipUser> users = vipmgr.Query(employno);
			if(users.size() > 0)
			{
				if(vipmgr.DelVipUser(users.get(0)))
				{
					returnInfo2.setError_code("0");
					returnInfo2.setError_info("删除成功");
				}
				else
				{
					returnInfo2.setError_code("-103");
					returnInfo2.setError_info("删除失败");
				}
			}
			else 
			{
				returnInfo2.setError_code("-102");
				returnInfo2.setError_info("用户不存在");
			}
		}		
		return SUCCESS;
	}

}
