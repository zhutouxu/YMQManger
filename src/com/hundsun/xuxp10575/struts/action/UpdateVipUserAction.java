package com.hundsun.xuxp10575.struts.action;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.hundsun.xuxp10575.beans.VipUser;
import com.hundsun.xuxp10575.service.VipUserManager;
import com.hundsun.xuxp10575.struts.form.AddVipUserForm;

public class UpdateVipUserAction extends Action 
{

	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception 
	{
		AddVipUserForm addVipUserForm = (AddVipUserForm)form;
		VipUserManager vipUserManager = new VipUserManager();
		VipUser user = vipUserManager.Query(addVipUserForm.getEmployno()).get(0);
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
		vipUserManager.EditVipUser(user);
		// TODO 自动生成的方法存根
		return super.execute(mapping, form, request, response);
	}

}
