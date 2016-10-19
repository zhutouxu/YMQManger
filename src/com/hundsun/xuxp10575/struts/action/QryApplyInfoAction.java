package com.hundsun.xuxp10575.struts.action;

import java.util.Calendar;
import java.util.List;

import com.hundsun.xuxp10575.beans.ActivityTime;
import com.hundsun.xuxp10575.beans.YMQApply;
import com.hundsun.xuxp10575.beans.YMQAssignResult;
import com.hundsun.xuxp10575.constant.ApplyStatus;
import com.hundsun.xuxp10575.service.QryManager;
import com.hundsun.xuxp10575.struts.form.ReturnInfo;
import com.hundsun.xuxp10575.utils.TimeParse;
import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
public class QryApplyInfoAction extends ActionSupport 
{
	private String userId;
	private QryManager qryManager;
	private ReturnInfo returnInfo;
	public void setQryManager(QryManager qryManager) {
		this.qryManager = qryManager;
	}
	public ReturnInfo getReturnInfo() {
		return returnInfo;
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
		String return_msg=null,return_code = null;		
		
		List<YMQApply> lists = qryManager.QryApply(userId);
		if(lists.size() == 0)
		{
			return_code = "1000";
			return_msg = "今天您没有报名！";
		}
		else
		{
			if(CheckForCancelApply(lists))
			{
				return_code = "1000";
				return_msg = "今天您没有报名！";
			}
			else
			{
				Calendar calendar = Calendar.getInstance();
				if(calendar.get(Calendar.HOUR_OF_DAY) < 16)
				{
					return_code = "1000";
					return_msg = "您的报名已提交！请在16：00之后查询报名结果";
				}
				else
				{
					List<YMQAssignResult> results = qryManager.QryAssignResult(userId);
					if(results.size() == 0)
					{
						return_code = "1000";
						return_msg = "很抱歉，您的报名没有成功！欢迎下次报名";
					}
					else
					{
						ActivityTime time = results.get(0).getActivitytime();
						return_code = "1000";
						return_msg = "恭喜您报名成功！您的活动时段是"+ TimeParse.parseHHmm(time.getBegintime()) + "-" +TimeParse.parseHHmm(time.getEndtime())
								+",场地：" + results.get(0).getFieldno();
					}
				}
			}
		}
		returnInfo = new ReturnInfo();
		returnInfo.setReturn_msg(return_msg);
		returnInfo.setReturn_code(return_code);

		return SUCCESS; 
	}
	
	//全部都是取消的委托，返回true，否则返回false
	private boolean CheckForCancelApply(List<YMQApply> lists)
	{
		for(YMQApply apply :lists)
		{
			if(!apply.getApplystatus().equals(ApplyStatus.APPLYCANCEL))
				return false;
		}
		return true;
	}
}
