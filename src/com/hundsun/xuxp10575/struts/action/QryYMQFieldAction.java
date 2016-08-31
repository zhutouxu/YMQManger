package com.hundsun.xuxp10575.struts.action;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.hundsun.xuxp10575.beans.YMQField;
import com.hundsun.xuxp10575.service.QryManager;
import com.hundsun.xuxp10575.struts.form.QryTimeReturn;
import com.hundsun.xuxp10575.struts.form.TimeData;
import net.sf.json.JSONObject;

public class QryYMQFieldAction extends Action 
{

	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception 
	{
		QryManager qryManager = new QryManager();
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
		QryTimeReturn returndata = new QryTimeReturn();
		returndata.setData(timeDatas);
		returndata.setReturn_code("0");
		returndata.setReturn_msg("查询成功");
		JSONObject jsondata = JSONObject.fromObject(returndata);
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(jsondata.toString());		
		// TODO 自动生成的方法存根
		return super.execute(mapping, form, request, response);
	}

}
