package com.hundsun.xuxp10575.struts.action;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.hundsun.xuxp10575.beans.ActivityTime;
import com.hundsun.xuxp10575.service.QryManager;
import com.hundsun.xuxp10575.struts.form.QryTimeReturn;
import com.hundsun.xuxp10575.struts.form.TimeData;
import com.hundsun.xuxp10575.utils.TimeParse;

import net.sf.json.JSONObject;

public class QryActivityTimeAction extends Action 
{

	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception 
	{
		QryManager qryManager = new QryManager();
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
		QryTimeReturn returndata = new QryTimeReturn();
		returndata.setData(timeDatas);
		returndata.setReturn_code("0");
		returndata.setReturn_msg("查询成功");
		JSONObject jsondata = JSONObject.fromObject(returndata);
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(jsondata.toString());		
		// TODO �Զ���ɵķ������
		return super.execute(mapping, form, request, response);
	}

}
