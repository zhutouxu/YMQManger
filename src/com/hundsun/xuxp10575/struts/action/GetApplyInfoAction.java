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
import com.hundsun.xuxp10575.beans.ActivityTime;
import com.hundsun.xuxp10575.beans.YMQApply;
import com.hundsun.xuxp10575.beans.YMQAssignResult;
import com.hundsun.xuxp10575.beans.YMQField;
import com.hundsun.xuxp10575.service.QryManager;
import com.hundsun.xuxp10575.struts.form.ApplyInfoReturn;
import com.hundsun.xuxp10575.struts.form.GetApplyInfoForm;
import com.hundsun.xuxp10575.utils.JsonDateValueProcessor;
import com.hundsun.xuxp10575.utils.TimeParse;
import com.hundsun.xuxp10575.constant.ApplyStatus;
import com.hundsun.xuxp10575.constant.SignStatus;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;

public class GetApplyInfoAction extends Action 
{

	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception 
	{
		GetApplyInfoForm inputparam = (GetApplyInfoForm)form;
		String applystatus=ApplyStatus.APPLYDEFALUT,signstatus = SignStatus.SIGNDEFALUT;
		int timeno=0,fieldno=0,pageno=0,pagesize=0;
		if(form != null)
		{
			applystatus = inputparam.getApplystatus() == null ? applystatus:inputparam.getApplystatus();
			signstatus = inputparam.getSignstatus() == null ? applystatus:inputparam.getSignstatus();
			timeno = inputparam.getTimeno();
			fieldno = inputparam.getFieldno();
			pageno = inputparam.getPageno();
			pagesize = inputparam.getPagesize();
		}
		List<ApplyInfoReturn> applyInfoReturns = new ArrayList<ApplyInfoReturn>();
		QryManager qryManager = new QryManager();
		List<ActivityTime> times = qryManager.QryActivityTime(timeno);
		List<YMQField> fields = qryManager.QryYMQField(fieldno);
		for(ActivityTime time : times)
		{			
			List<YMQApply> applies = new ArrayList<YMQApply>(time.getYmqapply());
			List<YMQAssignResult> assignResults = new ArrayList<YMQAssignResult>(time.getYmqassign()); 
			
			for(YMQApply apply : applies)
			{
				if(!applystatus.equals("") && !applystatus.equals(apply.getApplystatus()))
					continue;
				YMQAssignResult result = GetAssignFromList(assignResults, apply.getEmployno());
				if(!signstatus.equals(""))
				{
					if(result== null)
						continue;
					if(!signstatus.equals(result.getSignstatus()))
						continue;						
				}
				if(fieldno != 0)
				{
					if(result == null || result.getFieldno() != fieldno)
						continue;
				}				
				ApplyInfoReturn info = new ApplyInfoReturn();
				info.setEmployno(apply.getEmployno());
				//info.setEmployname(apply.get);
				info.setApplydate(apply.getApplydate());
				info.setTimeno(TimeParse.parseHHmm(time.getBegintime())+"-"+TimeParse.parseHHmm(time.getEndtime()));
				info.setApplystatus(ApplyStatus.DictMap.get(apply.getApplystatus()));
				if(result != null)
				{
					YMQField field = GetFieldFromList(fields, result.getFieldno());
					if(field != null)
						info.setFieldno(field.getFieldname());
					info.setSignstatus(SignStatus.DictMap.get(result.getSignstatus()));
				}
				applyInfoReturns.add(info);
			}
		}
		//PageQryApplyInfoReturn returndata = new PageQryApplyInfoReturn();
		int totalcount = applyInfoReturns.size();
		if(pageno != 0 && pagesize != 0)
		{
			int fromindex = (pageno-1)*pagesize;
			if(fromindex > totalcount)
				return super.execute(mapping, form, request, response);
			int toindex = pageno*pagesize;
			if(pageno*pagesize  > totalcount)
				toindex = totalcount;
		    applyInfoReturns = applyInfoReturns.subList(fromindex, toindex);
		}
		for(int i=0;i<applyInfoReturns.size();i++)
		{
			applyInfoReturns.get(i).setTotalcount(totalcount);
		}
		//returndata.setTotal_count(totalcount);		
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.registerJsonValueProcessor(Date.class, new JsonDateValueProcessor());
		JSONArray jsonArray = JSONArray.fromObject(applyInfoReturns,jsonConfig);
		//JSONObject jsondata = JSONObject.fromObject(returndata, jsonConfig);
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(jsonArray.toString());
		// TODO 
		return super.execute(mapping, form, request, response);
	}
	
	
	private YMQAssignResult GetAssignFromList(List<YMQAssignResult> assignResults,String employno)
	{
		for(YMQAssignResult assignResult : assignResults)
		{
			if(assignResult.getEmployno().equals(employno))
				return assignResult;
		}
		return null;
	}
	
	private YMQField GetFieldFromList(List<YMQField> fields,int fieldno)
	{
		for(YMQField field : fields)
		{
			if(field.getFieldno() == fieldno)
				return field;
		}
		return null;
	}
}
