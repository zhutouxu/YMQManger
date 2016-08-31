package com.hundsun.xuxp10575.utils;

import java.io.FileInputStream;
import java.util.Calendar;
import java.util.Timer;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;

public class MyListener implements ServletContextListener 
{
	private static final long PERIOD_DAY = 24 * 60 * 60 * 1000;  
	private Timer timer;
	@Override
	public void contextInitialized(ServletContextEvent sce) 
	{
		// TODO 自动生成的方法存根
		timer = new Timer();
		Calendar calendar = Calendar.getInstance();
		int hour=0,minute=0;
		String assigntime = this.GetConfigTime(sce);
		hour = Integer.parseInt(assigntime.split(":")[0]);
		minute = Integer.parseInt(assigntime.split(":")[1]);
		calendar.set(Calendar.HOUR_OF_DAY, hour);
		calendar.set(Calendar.MINUTE, minute);
		calendar.set(Calendar.SECOND,0);
		timer.schedule(new AssignTask(), calendar.getTime(),PERIOD_DAY);	
	}

	@Override
	public void contextDestroyed(ServletContextEvent sce) 
	{
		// TODO 自动生成的方法存根
		timer.cancel();
	}
	
	private String GetConfigTime(ServletContextEvent sce)
	{
		String assigntime = null;
		DocumentBuilderFactory dBuilderFactory = DocumentBuilderFactory.newInstance();
		try{
		DocumentBuilder dBuilder = dBuilderFactory.newDocumentBuilder();
		Document document = dBuilder.parse(new FileInputStream(sce.getServletContext().getRealPath("WEB-INF/comm_config.xml")));
		assigntime = document.getElementsByTagName("assign_time").item(0).getFirstChild().getNodeValue();
		}
		catch(Exception e)
		{
			assigntime = "16:00";
		}
		if(assigntime == null)
		{
			assigntime = "16:00";
		}
		return assigntime;
	}
}
