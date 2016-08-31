package com.hundsun.xuxp10575.struts.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import com.hundsun.xuxp10575.service.SignInManager;
import com.hundsun.xuxp10575.struts.form.ReturnInfo;
import com.hundsun.xuxp10575.struts.form.YMQSignInForm;

import net.sf.json.JSONObject;

public class YMQSignInAction extends Action 
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
		SignInManager sInManager = new SignInManager();
		String return_msg = sInManager.YMQSignIn(userId);		

		returnInfo.setReturn_code("0");
		returnInfo.setReturn_msg(return_msg);
		JSONObject jsondata = JSONObject.fromObject(returnInfo);
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(jsondata.toString());			
		// TODO 自动生成的方法存根
		return super.execute(mapping, form, request, response);
	}

}
