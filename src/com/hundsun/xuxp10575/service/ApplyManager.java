package com.hundsun.xuxp10575.service;

public class ApplyManager 
{
	private IApplySvr applySvr = null;
	
	public ApplyManager(ApplyEnum applyEnum)
	{
		try {
			applySvr = (IApplySvr) Class.forName("com.hundsun.xuxp10575.service."+applyEnum.toString()).newInstance();
		} catch (InstantiationException e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}
	}
	
	public boolean AddApply(String employno,int timeno)
	{
		return applySvr.AddApply(employno, timeno);
	}
	
	public boolean CancelApply(String employno)	
	{
		return applySvr.CancelApply(employno);
	}
}
