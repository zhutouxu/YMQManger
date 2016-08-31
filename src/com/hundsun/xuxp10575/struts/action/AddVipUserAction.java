package com.hundsun.xuxp10575.struts.action;

import java.util.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.hundsun.xuxp10575.struts.form.AddVipUserForm;
import com.hundsun.xuxp10575.struts.form.ReturnInfo2;

import net.sf.json.JSONObject;

import com.hundsun.xuxp10575.beans.VipUser;
import com.hundsun.xuxp10575.service.VipUserManager;

public class AddVipUserAction extends Action 
{

	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception 	
	
	{
		AddVipUserForm addVipUserForm = (AddVipUserForm)form;
		VipUser user = new VipUser();
		VipUserManager vipUserManager = new VipUserManager();
		user.setEmployno(addVipUserForm.getEmployno());
		user.setEmployname(addVipUserForm.getEmployname());
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		String datestr = addVipUserForm.getStartdate();
		Date date = null;
		long datelong;
		try{
			datelong = format.parse(datestr).getTime();
			date = new Date(datelong);
		}
		catch(ParseException exception)
		{
			date = new Date();
		}
		user.setStartdate(date);
		user.setTelephone(addVipUserForm.getTelephone());
		user.setMail(addVipUserForm.getMail());
		user.setDepartment(addVipUserForm.getDepartment());
		if(!vipUserManager.AddVipUser(user))
		{
			ReturnInfo2 returnInfo2 = new ReturnInfo2();
			returnInfo2.setError_code("-101");
			returnInfo2.setError_info("用户已存在！");
			JSONObject jsondata = JSONObject.fromObject(returnInfo2);
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(jsondata.toString());				
		}
		return super.execute(mapping, addVipUserForm, request, response);
	}
	
}
