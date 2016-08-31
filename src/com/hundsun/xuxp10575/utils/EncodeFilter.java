package com.hundsun.xuxp10575.utils;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

public class EncodeFilter implements Filter 
{

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		// TODO �Զ����ɵķ������
		
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		// TODO �Զ����ɵķ������
		HttpServletResponse httpServletResponse = (HttpServletResponse) response;
		httpServletResponse.setHeader("Access-Control-Allow-Origin", "*"); //���������ʱ��� 
		httpServletResponse.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE"); 
		httpServletResponse.setHeader("Access-Control-Max-Age", "3600"); //���ù���ʱ�� 
		httpServletResponse.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, client_id, uuid, Authorization"); 
		httpServletResponse.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // ֧��HTTP 1.1. 
		httpServletResponse.setHeader("Pragma", "no-cache"); // ֧��HTTP 1.0. response.setHeader("Expires", "0"); 	
		request.setCharacterEncoding("UTF-8");
		httpServletResponse.setCharacterEncoding("UTF-8");
		chain.doFilter(request, httpServletResponse);
	}

	@Override
	public void destroy() {
		// TODO �Զ����ɵķ������
		
	}

}
