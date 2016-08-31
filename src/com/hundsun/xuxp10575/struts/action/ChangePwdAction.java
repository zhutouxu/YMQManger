package com.hundsun.xuxp10575.struts.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.hundsun.xuxp10575.service.LoginManager;
import com.hundsun.xuxp10575.struts.form.ChangePwdForm;
import com.hundsun.xuxp10575.struts.form.ReturnInfo2;

import net.sf.json.JSONObject;

public class ChangePwdAction extends Action 
{

	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception 
	{
		// TODO �Զ���ɵķ������
		ChangePwdForm changePwdForm = (ChangePwdForm)form;
		String name="",NewPwd="",OldPwd="";
		ReturnInfo2 returnInfo2 = new ReturnInfo2();
		//name = request.getSession().getAttribute(SessionAttribute.USER_ID).toString();
		if(form != null)
		{
			name = changePwdForm.getName() == null ? name : changePwdForm.getName();
			NewPwd = changePwdForm.getNewpwd()== null ? NewPwd : changePwdForm.getNewpwd();
			OldPwd = changePwdForm.getOldpwd() == null ? OldPwd : changePwdForm.getOldpwd();					
		}
		LoginManager loginManager = new LoginManager();
		if(loginManager.ChangePassword(name, NewPwd, OldPwd) == 0)
		{
			returnInfo2.setError_code("0");
			returnInfo2.setError_info("修改密码成功");
		}
		else
		{
			returnInfo2.setError_code("-52");
			returnInfo2.setError_info("原密码错误！");
		}
		JSONObject jsondata = JSONObject.fromObject(returnInfo2);
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(jsondata.toString());	
		return super.execute(mapping, form, request, response);
	}

}
