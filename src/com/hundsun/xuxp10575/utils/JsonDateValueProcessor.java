package com.hundsun.xuxp10575.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;

public class JsonDateValueProcessor implements JsonValueProcessor 
{
	String formatstr = "yyyy-MM-dd";
	public JsonDateValueProcessor() 
	{
		// TODO �Զ����ɵĹ��캯�����
	}
	
	public JsonDateValueProcessor(String formatstr) 
	{
		// TODO �Զ����ɵĹ��캯�����
		this.formatstr = formatstr;
	}

	@Override
	public Object processArrayValue(Object arg0, JsonConfig arg1) {
		// TODO �Զ����ɵķ������
		return process(arg0);
	}

	@Override
	public Object processObjectValue(String arg0, Object arg1, JsonConfig arg2) {
		// TODO �Զ����ɵķ������
		return process(arg1);
	}
	
	private Object process(Object value)
	{
		if(value instanceof Date)
		{
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat(formatstr);
			return simpleDateFormat.format(value);
		}
		return value == null ? "":value.toString();
	}
}
