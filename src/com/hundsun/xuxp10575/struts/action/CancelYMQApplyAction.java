package com.hundsun.xuxp10575.struts.action;

import com.hundsun.xuxp10575.service.IApplySvr;
import com.hundsun.xuxp10575.struts.form.ReturnInfo;
import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
public class CancelYMQApplyAction extends ActionSupport 
{
	private IApplySvr applysvr;
	private String userId;
	private ReturnInfo returnInfo;
	public ReturnInfo getReturnInfo() {
		return returnInfo;
	}
	public void setApplysvr(IApplySvr applysvr) {
		this.applysvr = applysvr;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	@Override
	public String execute() throws Exception 
	{
		returnInfo = new ReturnInfo();
		if(applysvr.CancelApply(userId))
		{
			returnInfo.setReturn_code("0");
			returnInfo.setReturn_msg("取消报名成功");			
		}
		else
		{
			returnInfo.setReturn_code("-1");
			returnInfo.setReturn_msg("取消报名失败");		
		}
		return SUCCESS;
	}

}
