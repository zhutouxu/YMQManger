package com.hundsun.xuxp10575.struts.action;

import java.util.ArrayList;
import java.util.List;

import com.hundsun.xuxp10575.beans.ActivityTime;
import com.hundsun.xuxp10575.service.QryManager;
import com.hundsun.xuxp10575.struts.form.QryTimeReturn;
import com.hundsun.xuxp10575.struts.form.TimeData;
import com.hundsun.xuxp10575.utils.TimeParse;
import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
public class QryActivityTimeAction extends ActionSupport 
{
	private QryManager qryManager;
	private QryTimeReturn returndata;
	public QryTimeReturn getReturndata() {
		return returndata;
	}
	public void setQryManager(QryManager qryManager) {
		this.qryManager = qryManager;
	}
	@Override
	public String execute() throws Exception 
	{
		List<ActivityTime> times = qryManager.QryActivityTime(0);
		List<TimeData> timeDatas = new ArrayList<TimeData>();
		for(ActivityTime time : times)
		{
			TimeData data = new TimeData();
			data.setApplyType(time.getTimeno());
			data.setId(time.getTimeno());			
			data.setDesc(TimeParse.parseHHmm(time.getBegintime()) +"-"+TimeParse.parseHHmm(time.getEndtime()));
			timeDatas.add(data);
		}
		returndata = new QryTimeReturn();
		returndata.setData(timeDatas);
		returndata.setReturn_code("0");
		returndata.setReturn_msg("查询成功");	
		
		return SUCCESS;
	}

}
