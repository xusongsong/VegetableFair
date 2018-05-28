package com.coorun.om.base.interceptor;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.coorun.entity.Menu;
import com.coorun.om.base.bean.UserInfo;
import com.coorun.om.base.util.Constants;

/*************************
 *
 * Author : Billy Create Date : 2017年10月24日 上午9:18:12 Desc :
 *
 **************************/
public class CommonInterceptor extends HandlerInterceptorAdapter {

	private final Logger logger = Logger.getLogger(getClass());

	private final String LOGINPAGE = "";

	/**
	 * 在业务处理器处理请求之前被调用 如果返回false 从当前的拦截器往回执行所有拦截器的afterCompletion(),再退出拦截器链
	 * 如果返回true 执行下一个拦截器,直到所有的拦截器都执行完毕 再执行被拦截的Controller 然后进入拦截器链,
	 * 从最后一个拦截器往回执行所有的postHandle() 接着再从最后一个拦截器往回执行所有的afterCompletion()
	 */
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		if ("GET".equalsIgnoreCase(request.getMethod())) {
//			RequestUtil.saveRequest();
		}
		logger.info("==============执行顺序: 1、preHandle================");
		String requestUri = request.getRequestURI();
		String contextPath = request.getContextPath();
		String url = requestUri.substring(contextPath.length());
		if(requestUri.contains("/login/index") || requestUri.contains("/login/login") || requestUri.contains("/mapSearcher/map.do") ){
			return true;
		}
//		UserInfo userInfo = (UserInfo)request.getSession().getAttribute(Constants.CURRENT_USER);
//		List<Menu> menuList = (List<Menu>)request.getSession().getAttribute("menuList");
//		if (userInfo == null) {
//			//判断是否为ajax异步请求
//			String XRequested =request.getHeader("X-Requested-With");
//			if("XMLHttpRequest".equals(XRequested)){
//                response.getWriter().write("IsAjax");
//            }else{
//            	logger.info("Interceptor：跳转到login页面！");
//    			request.getRequestDispatcher("/WEB-INF/pages/privilege.jsp").forward(request, response);
//            }
//			return false;
//		} else{
//			//判断当前用户是否有方案权限
//			if(requestUri.contains("/plan/plan.do")){
//				//有规划数据权限则跳转页面
//				for(Menu menu : menuList){
//					if("XT010201".equals(menu.getId())){
//						return true;
//					}
//				}
//				//无则跳转无权限页面
//				logger.info("Interceptor：跳转到login页面！");
//    			request.getRequestDispatcher("/WEB-INF/pages/privilege.jsp").forward(request, response);
//    			return false;
//			}
//		}
			return true;
	}

	/**
	 * 在业务处理器处理请求执行完成后,生成视图之前执行的动作 可在modelAndView中加入数据，比如当前时间
	 */
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		logger.info("==============执行顺序: 2、postHandle================");
		if (modelAndView != null) { // 加入当前时间
			modelAndView.addObject("var", "测试postHandle");
		}
	}

	/**
	 * 在DispatcherServlet完全处理完请求后被调用,可用于清理资源等
	 * 
	 * 当有拦截器抛出异常时,会从当前拦截器往回执行所有的拦截器的afterCompletion()
	 */
	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		logger.info("==============执行顺序: 3、afterCompletion================");
	}

}
