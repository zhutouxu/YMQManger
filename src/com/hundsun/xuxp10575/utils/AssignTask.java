package com.hundsun.xuxp10575.utils;

import java.util.TimerTask;

import com.hundsun.xuxp10575.service.AssignEnum;
import com.hundsun.xuxp10575.service.AssignMangager;


public class AssignTask extends TimerTask 
{
	@Override
	public void run() 
	{
		// TODO 自动生成的方法存根
		(new AssignMangager(AssignEnum.YMQAssignSvr)).Assign();
	}

}
