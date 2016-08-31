package com.hundsun.xuxp10575.utils;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public final class TimeParse 
{
	private static DateFormat format = null;
	public static String parseHHmm(Date date)
	{
		String returnstr = null;
		format = new SimpleDateFormat("HH:mm");
		try {
			returnstr = format.format(date);
		} catch (Exception e) {
			// TODO: handle exception
			returnstr = null;
		}
		return returnstr;
	}
	public static int GetHour(Date date)
	{
		String str1 = parseHHmm(date);
		if(str1 != null)
		{
			return Integer.parseInt(str1.split(":")[0]);
		}
		else
			return 0;
	}
	public static int GetMinute(Date date)
	{
		String str1 = parseHHmm(date);
		if(str1 != null)
		{
			return Integer.parseInt(str1.split(":")[1]);
		}
		else
			return 0;
	}	
}
