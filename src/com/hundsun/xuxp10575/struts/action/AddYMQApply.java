package com.hundsun.xuxp10575.struts.action;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.hundsun.xuxp10575.beans.ActivityTime;
import com.hundsun.xuxp10575.beans.YMQApply;
import com.hundsun.xuxp10575.constant.ApplyStatus;
import com.hundsun.xuxp10575.service.ApplyEnum;
import com.hundsun.xuxp10575.service.ApplyManager;
import com.hundsun.xuxp10575.service.QryManager;
import com.hundsun.xuxp10575.struts.form.AddYMQApplyForm;
import com.hundsun.xuxp10575.struts.form.ReturnInfo;
import com.hundsun.xuxp10575.utils.TimeParse;

import net.sf.json.JSONObject;

public class AddYMQApply extends Action 
{
	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception 
	{
		AddYMQApplyForm applyForm = (AddYMQApplyForm)form;
		String UserId = null;
		int SignUpId = 0;
		if(applyForm != null)
		{
			UserId = applyForm.getUserId();
			SignUpId = applyForm.getSignUpId();
		}
		ApplyManager applyManager = new ApplyManager(ApplyEnum.YMQApplySvr);
		QryManager qryManager = new QryManager();
		ReturnInfo returnInfo = new ReturnInfo();
		//String UserId = request.getSession().getAttribute(SessionAttribute.USER_ID).toString();
		List<YMQApply> applylists = qryManager.QryApply(UserId);
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
			boolean result = applyManager.AddApply(UserId,SignUpId);
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
		JSONObject jsondata = JSONObject.fromObject(returnInfo);
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(jsondata.toString());		
		// TODO 自动生成的方法存根
		return super.execute(mapping, form, request, response);
	}

}
