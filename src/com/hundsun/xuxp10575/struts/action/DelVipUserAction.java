package com.hundsun.xuxp10575.struts.action;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.hundsun.xuxp10575.beans.VipUser;
import com.hundsun.xuxp10575.service.VipUserManager;
import com.hundsun.xuxp10575.struts.form.QryVipUserForm;
import com.hundsun.xuxp10575.struts.form.ReturnInfo2;

import net.sf.json.JSONObject;

public class DelVipUserAction extends Action 
{

	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception 
	{
		QryVipUserForm delform = (QryVipUserForm)form;
		String employno = null;
		VipUserManager userManager = new VipUserManager();
		ReturnInfo2 returnInfo2 = new ReturnInfo2();
		if(delform != null)
		{
			employno = delform.getEmployno();
		}
		if(employno == null ||employno.isEmpty())
		{
			returnInfo2.setError_code("-102");
			returnInfo2.setError_info("用户不存在");
		}
		else
		{
			List<VipUser> users = userManager.Query(employno);
			if(users.size() > 0)
			{
				if(userManager.DelVipUser(users.get(0)))
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
		JSONObject jsondata = JSONObject.fromObject(returnInfo2);
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(jsondata.toString());	
		// TODO �Զ���ɵķ������
		return super.execute(mapping, form, request, response);
	}

}
