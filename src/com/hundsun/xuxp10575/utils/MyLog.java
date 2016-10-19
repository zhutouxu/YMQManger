package com.hundsun.xuxp10575.utils;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.aspectj.lang.JoinPoint;

public class MyLog
{
	private static Logger logsvr = LogManager.getLogger(MyLog.class.getName());

	public void before(JoinPoint joinPoint)
	{
		String args = "";
		for(Object obj : joinPoint.getArgs())
		{
			if(obj != null)
			{
				args = args + obj.toString() + ",";
			}
		}
		logsvr.info("before method,args is " + args + joinPoint.getTarget().toString() +" " + joinPoint.getSignature().getName());
	}
	
	public void afterReturn(JoinPoint joinPoint,Object result)
	{
		logsvr.info("after method,result is " + result.toString());
	}

	public static void LogInfo(String msg)
	{
		logsvr.info(msg);
	}
}
