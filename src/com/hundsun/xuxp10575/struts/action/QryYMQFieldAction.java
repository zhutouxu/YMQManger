package com.hundsun.xuxp10575.struts.action;

import java.util.ArrayList;
import java.util.List;

import com.hundsun.xuxp10575.beans.YMQField;
import com.hundsun.xuxp10575.service.QryManager;
import com.hundsun.xuxp10575.struts.form.QryTimeReturn;
import com.hundsun.xuxp10575.struts.form.TimeData;
import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
public class QryYMQFieldAction extends ActionSupport 
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
		List<YMQField> fields = qryManager.QryYMQField(0);
		List<TimeData> timeDatas = new ArrayList<TimeData>();
		for(YMQField field : fields)
		{
			TimeData data = new TimeData();
			data.setApplyType(field.getFieldno());
			data.setId(field.getFieldno());			
			data.setDesc(field.getFieldname());
			timeDatas.add(data);
		}
	    returndata = new QryTimeReturn();
		returndata.setData(timeDatas);
		returndata.setReturn_code("0");
		returndata.setReturn_msg("查询成功");	
		// TODO 自动生成的方法存根
		return SUCCESS;
	}

}
