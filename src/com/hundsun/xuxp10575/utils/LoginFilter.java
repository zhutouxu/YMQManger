package com.hundsun.xuxp10575.utils;

import java.io.CharArrayWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;
import javax.servlet.http.HttpSession;

import com.hundsun.xuxp10575.struts.form.ReturnInfo2;

import net.sf.json.JSONObject;


public class LoginFilter implements Filter 
{	
	Map<String, String> params = new HashMap<String, String>();

	@Override
	public void destroy() {
		// TODO �Զ���ɵķ������
		
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException 
	{
		// TODO �Զ���ɵķ������
		HttpServletRequest httpServletRequest = (HttpServletRequest)request;
		HttpServletResponse httpServletResponse = (HttpServletResponse) response;		
		HttpSession hSession = httpServletRequest.getSession();
		String username = (String)hSession.getAttribute(SessionAttribute.USER_ID);
		String redirect = (String)hSession.getAttribute("Redirect");
		String path = httpServletRequest.getRequestURI();
		/**if(username != null || path.contains("login.do"))
		{
			chain.doFilter(httpServletRequest, httpServletResponse);
		}
		else
		{
			ReturnInfo2 returnInfo2 = new ReturnInfo2();
			returnInfo2.setError_code("-52");
			returnInfo2.setError_info("δ��¼");
			JSONObject jsondata = JSONObject.fromObject(returnInfo2);
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(jsondata.toString());				
		}*/
		chain.doFilter(httpServletRequest, httpServletResponse);
	}

	@Override
	public void init(FilterConfig config) throws ServletException {
		// TODO �Զ���ɵķ������
		Enumeration<String> names = config.getInitParameterNames();
		while(names.hasMoreElements())
		{
			String name = names.nextElement();
			params.put(name, config.getInitParameter(name));
		}
	}

}

 class ResponseWrapper extends HttpServletResponseWrapper 
 {
	private PrintWriter cachedWriter;
	private CharArrayWriter bufferedWriter;
 
	public ResponseWrapper(HttpServletResponse response) {
		super(response);
		// ��������Ǳ��淵�ؽ��ĵط�
		bufferedWriter = new CharArrayWriter();
		// ����ǰ�װPrintWriter�ģ������н��ͨ�����PrintWriterд�뵽bufferedWriter��
		cachedWriter = new PrintWriter(bufferedWriter);
		
	}
 
	@Override
	public PrintWriter getWriter() {
		return cachedWriter;
	}
 
	/**
	 * ��ȡԭʼ��HTMLҳ�����ݡ�
	 * @return
	 */
	public String getResult() {
		return bufferedWriter.toString();
	}
}