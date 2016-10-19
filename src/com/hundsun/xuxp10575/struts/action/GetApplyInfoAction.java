package com.hundsun.xuxp10575.struts.action;

import java.util.ArrayList;
import java.util.List;
import com.hundsun.xuxp10575.beans.ActivityTime;
import com.hundsun.xuxp10575.beans.YMQApply;
import com.hundsun.xuxp10575.beans.YMQAssignResult;
import com.hundsun.xuxp10575.beans.YMQField;
import com.hundsun.xuxp10575.service.QryManager;
import com.hundsun.xuxp10575.struts.form.ApplyInfoReturn;
import com.hundsun.xuxp10575.utils.TimeParse;
import com.opensymphony.xwork2.ActionSupport;
import com.hundsun.xuxp10575.constant.ApplyStatus;
import com.hundsun.xuxp10575.constant.SignStatus;

@SuppressWarnings("serial")
public class GetApplyInfoAction extends ActionSupport 
{
	private String applystatus = ApplyStatus.APPLYDEFALUT;
	private String signstatus = SignStatus.SIGNDEFALUT;
	private int timeno;
	private int fieldno;
	private int pageno;
	private int pagesize;
	private QryManager qryManager;
	private List<ApplyInfoReturn> applyInfoReturns;

	public List<ApplyInfoReturn> getApplyInfoReturns() {
		return applyInfoReturns;
	}
	public void setQryManager(QryManager qryManager) {
		this.qryManager = qryManager;
	}
	public String getApplystatus() {
		return applystatus;
	}
	public void setApplystatus(String applystatus) {
		this.applystatus = applystatus;
	}
	public String getSignstatus() {
		return signstatus;
	}
	public void setSignstatus(String signstatus) {
		this.signstatus = signstatus;
	}
	public int getTimeno() {
		return timeno;
	}
	public void setTimeno(int timeno) {
		this.timeno = timeno;
	}
	public int getFieldno() {
		return fieldno;
	}
	public void setFieldno(int fieldno) {
		this.fieldno = fieldno;
	}
	public int getPageno() {
		return pageno;
	}
	public void setPageno(int pageno) {
		this.pageno = pageno;
	}
	public int getPagesize() {
		return pagesize;
	}
	public void setPagesize(int pagesize) {
		this.pagesize = pagesize;
	}
	@Override
	public String execute() throws Exception 
	{
		applyInfoReturns = new ArrayList<ApplyInfoReturn>();
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
		int totalcount = applyInfoReturns.size();
		if(pageno != 0 && pagesize != 0)
		{
			int fromindex = (pageno-1)*pagesize;
			if(fromindex > totalcount)
				return SUCCESS;
			int toindex = pageno*pagesize;
			if(pageno*pagesize  > totalcount)
				toindex = totalcount;
		    applyInfoReturns = applyInfoReturns.subList(fromindex, toindex);
		}
		for(int i=0;i<applyInfoReturns.size();i++)
		{
			applyInfoReturns.get(i).setTotalcount(totalcount);
		}	
		// TODO 
		return SUCCESS;
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
