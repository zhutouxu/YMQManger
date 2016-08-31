package com.hundsun.xuxp10575.constant;

import java.util.HashMap;

import net.sf.json.util.JSONUtils;


public class ApplyStatus 
{
	//所有状态
	public static final String APPLYDEFALUT = "";
	
	//已申请
	public static final String APPLYSUBMIT = "0";
	
	//已取消
	public static final String APPLYCANCEL = "1";
	
	//申请成功
	public static final String APPLYSUCCESS = "2";
	
	//申请失败
	public static final String APPLYFAIL = "3";	
	
	public static final HashMap<String, String> DictMap = new HashMap<String,String>();
	
	static
	{
		DictMap.put("0", "已申请");
		DictMap.put("1", "已取消");
		DictMap.put("2", "申请成功");
		DictMap.put("3", "申请失败");
	}
}
