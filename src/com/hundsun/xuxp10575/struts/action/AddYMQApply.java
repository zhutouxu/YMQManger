package com.hundsun.xuxp10575.struts.action;

import java.util.List;

import com.hundsun.xuxp10575.beans.ActivityTime;
import com.hundsun.xuxp10575.beans.YMQApply;
import com.hundsun.xuxp10575.constant.ApplyStatus;
import com.hundsun.xuxp10575.service.IApplySvr;
import com.hundsun.xuxp10575.service.QryManager;
import com.hundsun.xuxp10575.struts.form.ReturnInfo;
import com.hundsun.xuxp10575.utils.TimeParse;
import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
public class AddYMQApply extends ActionSupport 
{
	private IApplySvr applysvr;
	private QryManager qryManager;
	private String userId;
	private int signUpId;
	private ReturnInfo returnInfo;
	public void setApplysvr(IApplySvr applysvr) {
		this.applysvr = applysvr;
	}
	public void setQryManager(QryManager qryManager) {
		this.qryManager = qryManager;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public int getSignUpId() {
		return signUpId;
	}
	public void setSignUpId(int signUpId) {
		this.signUpId = signUpId;
	}	
	public ReturnInfo getReturnInfo() {
		return returnInfo;
	}
	@Override
	public String execute() throws Exception 
	{
		returnInfo = new ReturnInfo();
		List<YMQApply> applylists = qryManager.QryApply(userId);
		boolean haveapply = false; 
		if(applylists.size() > 0)
		{
			for(YMQApply apply :applylists)
			{
				if(!apply.getApplystatus().equals(ApplyStatus.APPLYCANCEL))
				{
					ActivityTime time = apply.getActivitytime();
					returnInfo.setReturn_code("0");
					returnInfo.setReturn_msg("您已报名！您预约的活动时段是:"+TimeParse.parseHHmm(time.getBegintime())+"-"+TimeParse.parseHHmm(time.getEndtime()));
					haveapply = true;
					break;
				}
			}
		}
		if(!haveapply)
		{
			boolean result = applysvr.AddApply(userId,signUpId);
			if(result)
			{
				returnInfo.setReturn_code("0");
				returnInfo.setReturn_msg("您的报名已提交，请等待报名结果通知！");
			}
			else
			{
				returnInfo.setReturn_code("-1");
				returnInfo.setReturn_msg("报名失败！");
			}
		}	
		// TODO 自动生成的方法存根
		return SUCCESS;
	}

}
