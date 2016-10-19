package com.hundsun.xuxp10575.struts.action;

import com.hundsun.xuxp10575.service.LoginManager;
import com.hundsun.xuxp10575.struts.form.ReturnInfo2;
import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
public class ChangePwdAction extends ActionSupport 
{
	private LoginManager mgr;
	private String name;
	private String oldpwd;
	private String newpwd;
	private ReturnInfo2 returnInfo;
	
	public void setMgr(LoginManager mgr) {
		this.mgr = mgr;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getOldpwd() {
		return oldpwd;
	}
	public void setOldpwd(String oldpwd) {
		this.oldpwd = oldpwd;
	}
	public String getNewpwd() {
		return newpwd;
	}
	public void setNewpwd(String newpwd) {
		this.newpwd = newpwd;
	}	
	public ReturnInfo2 getReturnInfo() {
		return returnInfo;
	}
	public void setReturnInfo2(ReturnInfo2 returnInfo) {
		this.returnInfo = returnInfo;
	}
	@Override
	public String execute() throws Exception
	{
		returnInfo = new ReturnInfo2();
		if(mgr.ChangePassword(name, newpwd, oldpwd) == 0)
		{
			returnInfo.setError_code("0");
			returnInfo.setError_info("修改密码成功");
		}
		else
		{
			returnInfo.setError_code("-52");
			returnInfo.setError_info("原密码错误！");
		}
		return SUCCESS;
	}

	
	/**public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception 
	{
		// TODO �Զ���ɵķ������
		ChangePwdForm changePwdForm = (ChangePwdForm)form;
		String name="",NewPwd="",OldPwd="";
		ReturnInfo2 returnInfo2 = new ReturnInfo2();
		//name = request.getSession().getAttribute(SessionAttribute.USER_ID).toString();
		if(form != null)
		{
			name = changePwdForm.getName() == null ? name : changePwdForm.getName();
			NewPwd = changePwdForm.getNewpwd()== null ? NewPwd : changePwdForm.getNewpwd();
			OldPwd = changePwdForm.getOldpwd() == null ? OldPwd : changePwdForm.getOldpwd();					
		}
		LoginManager loginManager = new LoginManager();
		if(loginManager.ChangePassword(name, NewPwd, OldPwd) == 0)
		{
			returnInfo2.setError_code("0");
			returnInfo2.setError_info("修改密码成功");
		}
		else
		{
			returnInfo2.setError_code("-52");
			returnInfo2.setError_info("原密码错误！");
		}
		JSONObject jsondata = JSONObject.fromObject(returnInfo2);
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(jsondata.toString());	
		return super.execute(mapping, form, request, response);
	}
	*/
}
