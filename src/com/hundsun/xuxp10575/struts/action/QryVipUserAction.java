package com.hundsun.xuxp10575.struts.action;

import java.util.ArrayList;
import java.util.Date;
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
import com.hundsun.xuxp10575.struts.form.QryVipUserReturn;
import com.hundsun.xuxp10575.utils.JsonDateValueProcessor;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;

public class QryVipUserAction extends Action
{

	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception 
	{
		String employno = "";
		int pageno =0,pagesize=0;
		if(form != null)
		{
			QryVipUserForm qForm = (QryVipUserForm)form;
		    try{
			employno = qForm.getEmployno().trim();
			pageno = qForm.getPageno();
			pagesize = qForm.getPagesize();
		    }catch(Exception exception){
		    	employno = "";
		    }
		}
		VipUserManager manager = new VipUserManager();
		
		List<VipUser> users = manager.Query(employno);
		int totalcount= users.size();
		if(pageno != 0 && pagesize != 0)
		{
			int fromindex = (pageno-1)*pagesize;
			if(fromindex > totalcount)
			{
				return super.execute(mapping, form, request, response);
			}
			int toindex = pageno*pagesize;
			if(pageno*pagesize > totalcount)
				toindex = totalcount;
			users = users.subList(fromindex, toindex);
		}
		List<QryVipUserReturn> returndatas = new ArrayList<QryVipUserReturn>();
		for(VipUser user :users)
		{
			QryVipUserReturn returndata = new QryVipUserReturn();
			returndata.setEmployno(user.getEmployno());
			returndata.setEmployname(user.getEmployname());
			returndata.setStartdate(user.getStartdate());
			returndata.setMail(user.getMail());
			returndata.setTelephone(user.getTelephone());
			returndata.setDepartment(user.getDepartment());
			returndata.setTotalcount(totalcount);
			returndatas.add(returndata);
		}
		JSONArray userlist = JSonPack(returndatas);
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(userlist.toString());		
		// TODO �Զ���ɵķ������
		return super.execute(mapping, form, request, response);
	}
	
	private JSONArray JSonPack(Object object)
	{
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.registerJsonValueProcessor(Date.class, new JsonDateValueProcessor());
		JSONArray jsonArray = JSONArray.fromObject(object,jsonConfig);
		return jsonArray;
	}
}
