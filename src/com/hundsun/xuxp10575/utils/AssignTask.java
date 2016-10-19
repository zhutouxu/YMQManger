package com.hundsun.xuxp10575.utils;

import java.util.TimerTask;

import com.hundsun.xuxp10575.service.IAssignSvr;


public class AssignTask extends TimerTask 
{
	IAssignSvr assignsvr;
	public void setAssignsvr(IAssignSvr assignsvr) {
		this.assignsvr = assignsvr;
	}
	@Override
	public void run() 
	{
		// TODO �Զ���ɵķ������
		assignsvr.Assign();
	}

}
