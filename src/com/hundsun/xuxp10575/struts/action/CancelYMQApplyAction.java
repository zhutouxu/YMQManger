package com.hundsun.xuxp10575.struts.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.hundsun.xuxp10575.service.ApplyEnum;
import com.hundsun.xuxp10575.service.ApplyManager;
import com.hundsun.xuxp10575.struts.form.ReturnInfo;
import com.hundsun.xuxp10575.struts.form.YMQSignInForm;
import net.sf.json.JSONObject;

public class CancelYMQApplyAction extends Action 
{

	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception 
	{
		YMQSignInForm ymqSignInForm = (YMQSignInForm)form;
		String userId = null,authUserId = null;		
		ReturnInfo returnInfo = new ReturnInfo();
		if(ymqSignInForm != null)
		{
			userId = ymqSignInForm.getUserId();
			authUserId = ymqSignInForm.getAuthUserId();
		}
		ApplyManager applyManager = new ApplyManager(ApplyEnum.YMQApplySvr);
		//String userid = request.getSession().getAttribute(SessionAttribute.USER_ID).toString();
		if(applyManager.CancelApply(userId))
		{
			returnInfo.setReturn_code("0");
			returnInfo.setReturn_msg("取消报名成功");			
		}
		else
		{
			returnInfo.setReturn_code("-1");
			returnInfo.setReturn_msg("取消报名失败");		
		}
		JSONObject jsondata = JSONObject.fromObject(returnInfo);
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(jsondata.toString());
		// TODO �Զ���ɵķ������
		return super.execute(mapping, form, request, response);
	}

}
