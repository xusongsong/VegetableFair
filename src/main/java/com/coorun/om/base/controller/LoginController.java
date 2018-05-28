package com.coorun.om.base.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.coorun.entity.ConfigBean;
import com.coorun.entity.Menu;
import com.coorun.factory.BaseFactory;
import com.coorun.om.base.bean.UserInfo;
import com.coorun.om.base.services.ILoginServices;
import com.coorun.om.base.util.Constants;
import com.coorun.om.base.util.MethodFactory;
import com.coorun.om.base.util.RetResult;
import com.coorun.services.AuthorizationService;


/*************************
 *
 * Author : Billy Create 
 * Date : 2017年12月7日 上午10:49:10 
 * Desc : 用户登录及获取用户权限信息
 *
 **************************/
@Controller
@RequestMapping(value = "login")
public class LoginController extends BaseController {
//	Logger log = Logger.getLogger(getClass());

	ILoginServices loginService;

	/** 角色菜单列表权限 **/
	@Resource
	AuthorizationService authorizationService;

	/**
	 * 根据用户名及密码，校验用户信息，并跳转到初始化页面
	 * 
	 * @param userName
	 * @param passwd
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/login", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody RetResult login(@RequestParam String userName, @RequestParam String passwd,
			HttpServletRequest request, HttpServletResponse response) {
		RetResult retResult = loginService.login(userName, passwd);
		List<Menu> menuList = null;
		if (retResult.getSuccess() == "1") {
			UserInfo user = (UserInfo) retResult.getRecord();
			menuList = authorizationService.menusQuery(user);
			request.getSession().setAttribute(Constants.CURRENT_USER, user);
			request.getSession().setAttribute(Constants.USERNAME, userName);
			request.getSession().setAttribute(Constants.PASSWORD, passwd);
			request.getSession().setAttribute(Constants.CURRENT_SESSIONID, user.getSessionId());
			request.getSession().setAttribute("menuList", menuList);
			String remberMe = MethodFactory.getParamStr(request, "remberMe", "");
			if ("1".equals(remberMe)) {
				String sessionId = user.getSessionId();
				String userInfo = userName + "," + passwd + "," + sessionId;
				Cookie loginCookie = new Cookie("omLoginInfo", userInfo);
				loginCookie.setMaxAge(60 * 60 * 24 * 30);
				loginCookie.setPath("login/ompageinit");
				response.addCookie(loginCookie);
			}
		}
		return retResult;
	}

	/**
	 * 带登陆信息跳转到CMS服务页面
	 * 
	 * @return
	 */
	@RequestMapping(value = "/CMS")
	public String CMS(HttpServletRequest request) {
		// 通过配置文件拼接第三方服务路径
		ConfigBean config = BaseFactory.getConfig();
		if (config == null) {
			return null;
		}
		request.setAttribute("CMSIP", config.getCMSIP());
		request.setAttribute("CMSPort", config.getCMSPort());
		String username = (String) request.getSession().getAttribute(Constants.USERNAME);
		String password = (String) request.getSession().getAttribute(Constants.PASSWORD);
		if ((username == null)||(password == null)) {
			return null;
		}
		request.setAttribute("username", username);
		request.setAttribute("password", password);
		// request.setAttribute("username", "admin");// 测试
		// request.setAttribute("password", "admin");// 测试
		return "login";
	}

	/**
	 * 退出
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/loginout")
	public String loginout(HttpServletRequest request) {

		UserInfo userInfo = (UserInfo) request.getSession().getAttribute(Constants.CURRENT_USER);
		request.getSession().removeAttribute(Constants.CURRENT_USER);
		request.getSession().removeAttribute(Constants.USERNAME);
		request.getSession().removeAttribute(Constants.PASSWORD);
		request.getSession().removeAttribute(Constants.CURRENT_SESSIONID);
		request.getSession().invalidate();
		if (null != userInfo) {
			loginService.loginout(userInfo.getSessionId());
		}

		return "index";
	}

	@RequestMapping(value = "/ompageinit")
	public String omPageInit() {
		return "index";
	}

	@RequestMapping(value = "/privilege")
	public String privilege() {
		return "index";
	}

	@Autowired
	public void setLoginService(ILoginServices loginService) {
		this.loginService = loginService;
	}
}
