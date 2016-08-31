package com.hundsun.xuxp10575.constant;

import java.util.HashMap;

public class SignStatus 
{
	//所有状态
	public static final String SIGNDEFALUT = "";
	
	//未签到
	public static final String SIGNNO = "0";
	
	//已签到
	public static final String SIGNYES = "1";
	
	public static final HashMap<String, String> DictMap = new HashMap<String,String>();
	
	static
	{
		DictMap.put("0", "未签到");
		DictMap.put("1", "已签到");
	}	
}
