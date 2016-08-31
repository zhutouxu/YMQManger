package com.hundsun.xuxp10575.service;

public class AssignMangager 
{
	private IAssignSvr assignSvr = null;
	public AssignMangager(AssignEnum assignEnum)
	{
		try {
			assignSvr = (IAssignSvr) Class.forName("com.hundsun.xuxp10575.service."+assignEnum.toString()).newInstance();
		} catch (InstantiationException e) {
			// TODO �Զ����ɵ� catch ��
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO �Զ����ɵ� catch ��
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO �Զ����ɵ� catch ��
			e.printStackTrace();
		}
		// TODO �Զ����ɵĹ��캯�����
	}
	public void Assign()
	{
		assignSvr.Assign();
	}
}
