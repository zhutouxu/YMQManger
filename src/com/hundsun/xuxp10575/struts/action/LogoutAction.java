package com.hundsun.xuxp10575.struts.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.hundsun.xuxp10575.utils.SessionAttribute;

public class LogoutAction extends Action 
{

	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception 
	{
		HttpSession session = request.getSession(false);
		if(session != null)
		{
			session.removeAttribute(SessionAttribute.USER_ID);
		}
		// TODO �Զ����ɵķ������
		return super.execute(mapping, form, request, response);
	}
	
}
