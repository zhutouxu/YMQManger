package com.hundsun.xuxp10575.service;

public class AssignMangager 
{
	private IAssignSvr assignSvr = null;
	public AssignMangager(AssignEnum assignEnum)
	{
		try {
			assignSvr = (IAssignSvr) Class.forName("com.hundsun.xuxp10575.service."+assignEnum.toString()).newInstance();
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
		// TODO 自动生成的构造函数存根
	}
	public void Assign()
	{
		assignSvr.Assign();
	}
}
