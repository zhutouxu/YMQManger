package com.hundsun.xuxp10575.utils;

import java.util.TimerTask;

import com.hundsun.xuxp10575.service.AssignEnum;
import com.hundsun.xuxp10575.service.AssignMangager;


public class AssignTask extends TimerTask 
{
	@Override
	public void run() 
	{
		// TODO �Զ����ɵķ������
		(new AssignMangager(AssignEnum.YMQAssignSvr)).Assign();
	}

}
