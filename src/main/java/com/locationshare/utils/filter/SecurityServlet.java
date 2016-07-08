package com.locationshare.utils.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;

import com.locationshare.app.model.User;
/**
 * @author Jason_zh
 * @date 2016年6月1日
 * @version 1.0
 */
public class SecurityServlet extends HttpServlet implements Filter{
	 private static final long serialVersionUID = 1L;  
	 public void doFilter(ServletRequest arg0, ServletResponse arg1, FilterChain arg2) throws IOException, ServletException {  
         HttpServletRequest request=(HttpServletRequest)arg0;     
         HttpServletResponse response  =(HttpServletResponse) arg1;      
         HttpSession session = request.getSession(true);       
         User user_role = (User)session.getAttribute("user");//登录用户
         String url=request.getRequestURI();
         if(user_role == null) {
        	 boolean isAjaxRequest = isAjaxRequest(request);
              //判断获取的路径不为空且不是访问登录页面或执行登录操作时跳转     
              if(url!=null && !url.equals("") && ( url.indexOf("register")<0 && url.indexOf("login")<0 )) {
            	  if (isAjaxRequest) {
      				response.setCharacterEncoding("UTF-8");
      				response.sendError(HttpStatus.UNAUTHORIZED.value(),"您已经太长时间没有操作，请重新登录");
              	  }else{
              		response.setCharacterEncoding("UTF-8");
      				response.sendError(HttpStatus.UNAUTHORIZED.value(),"请先登录");
              	  }
            	  //response.sendRedirect(request.getContextPath() + "/user/login.do");     
                  return ;     
              }
          }
          arg2.doFilter(arg0, arg1);     
          return;     
	  } 
	 
	 
	 /** 
	     * 判断是否为Ajax请求 
	     * 
	     * @param request HttpServletRequest 
	     * @return 是true, 否false 
	     */  
	    public static boolean isAjaxRequest(HttpServletRequest request) {  
	        return request.getRequestURI().startsWith("/api");  
//	        String requestType = request.getHeader("X-Requested-With");  
//	        return requestType != null && requestType.equals("XMLHttpRequest");  
	    }
	    
	  public void init(FilterConfig arg0) throws ServletException {  
	  }
	 
	  
}  
