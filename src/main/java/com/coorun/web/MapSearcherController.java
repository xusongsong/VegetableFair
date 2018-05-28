package com.coorun.web;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.coorun.entity.AttributeResult;
import com.coorun.entity.ConfigBean;
import com.coorun.entity.MapResult;
import com.coorun.entity.Menu;
import com.coorun.entity.MixedResult;
import com.coorun.factory.BaseFactory;
import com.coorun.om.base.bean.UserInfo;
import com.coorun.om.base.services.ILoginServices;
import com.coorun.om.base.util.Constants;
import com.coorun.services.AuthorizationService;
import com.coorun.services.MapSearcherService;
import com.coorun.util.Pager;
import com.coorun.util.RetResult;

/**
 * 搜索功能模块
 * 
 * @author DL
 * @createDate 2017-09-19
 */
@Controller
@RequestMapping(value = "mapSearcher")
public class MapSearcherController {
	@Resource
	ILoginServices loginService;

	/** 搜索功能 **/
	@Resource
	MapSearcherService mapSearcherService;

	/** 角色菜单列表权限 **/
	@Resource
	AuthorizationService authorizationService;

	/**
	 * 返回map页面
	 * 
	 * @param req
	 * @return
	 */
	@RequestMapping(value = "map.do", method = RequestMethod.POST)
	public String map(HttpServletRequest req) {
		UserInfo userInfo = (UserInfo) req.getSession().getAttribute(Constants.CURRENT_USER);
		// 菜单列表
		List<Menu> menuList = null;
		if (null != userInfo) {// 登录则
			req.setAttribute("userInfo", userInfo);
			menuList = authorizationService.menusQuery(userInfo);
		} else {// 没有登录，默认游客
			String userName = "guest";
			String passwd = "guest";
			com.coorun.om.base.util.RetResult retResult = loginService.login(userName, passwd);
			if (retResult.getSuccess() == "1") {
				UserInfo user = (UserInfo) retResult.getRecord();
				req.getSession().setAttribute(Constants.CURRENT_USER, user);
				req.getSession().setAttribute(Constants.CURRENT_SESSIONID, user.getSessionId());
				req.setAttribute("userInfo", user);
				menuList = authorizationService.menusQuery(user);
			}
		}
		req.setAttribute("menuList", menuList);
		String inputText = req.getParameter("inputText");
		String cityName = req.getParameter("cityName");
		String areaName = req.getParameter("areaName");
		req.setAttribute("inputText", inputText);
		req.setAttribute("cityName", cityName);
		req.setAttribute("areaName", areaName);
		// 通过配置文件拼接第三方服务路径
		ConfigBean config = BaseFactory.getConfig();
		if (config == null) {
			return null;
		}
		/** common **/
		req.setAttribute("serverIP", config.getServerIP());
		req.setAttribute("serverPort", config.getServerPort());
		req.setAttribute("authorizeIP", config.getAuthorizeIP());
		req.setAttribute("authorizePort", config.getAuthorizePort());
		req.setAttribute("projectIP", config.getProjectIP());
		req.setAttribute("projectPort", config.getProjectPort());
//		req.setAttribute("CMSIP", config.getCMSIP());
//		req.setAttribute("CMSPort", config.getCMSPort());
		req.setAttribute("defaultDOMDateValue", config.getDefaultDOMDateValue());
		req.setAttribute("defaultDOMMonthValue", config.getDefaultDOMMonthValue());
		req.setAttribute("defaultDEMDateValue", config.getDefaultDEMDateValue());
		req.setAttribute("defaultDEMMonthValue", config.getDefaultDEMMonthValue());
		req.setAttribute("artemisHost",config.getArtemisHost());
		req.setAttribute("artemisAppKey", config.getArtemisAppKey());
		req.setAttribute("artemisAppSecret", config.getArtemisAppSecret());
		req.setAttribute("playType",config.getPlayType());
		req.setAttribute("realPush",config.getRealPush());
		/** particular **/
		String reqType = "noPlan";
		String url = "http://" + config.getServerIP() + ":" + config.getServerPort();
		String serverAreacode1 = config.getServerAreacode1();
		req.setAttribute("reqType", reqType);
		req.setAttribute("planServerURL", url);
		req.setAttribute("serverAreacodeWrl", serverAreacode1);
		req.setAttribute("defaultLoadType", config.getDefaultLoadType());
		req.setAttribute("dataType", config.getDataType());
        req.setAttribute("mapClick", 4);
		return "map";
	}

	/**
	 * 属性查询功能
	 * 
	 * @param req
	 * @return RetResult<Pager<AttributeResult>>
	 */
	@RequestMapping(value = "attribute.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody RetResult<Pager<AttributeResult>> attribute(HttpServletRequest req) {
		/** 获取前端页面传来的值 **/
		String x = req.getParameter("x");
		String y = req.getParameter("y");
		// String x = "120.02075197471504";// 测试
		// String y = "30.35220035606828";// 测试
		int pageNo = 1;
		int pageSize = 10;
		int max = 200;
		/** 搜索功能---属性查询 **/
		List<AttributeResult> list = mapSearcherService.queryAttribute(x, y, max);
		// 0:处理失败 1:处理成功
		String success = null;
		// 处理消息
		String msg = null;
		/** 返回封装RetResult<AttributeResult>对象 **/
		RetResult<Pager<AttributeResult>> retResult = new RetResult<Pager<AttributeResult>>();
		if (list != null && list.size() > 0) {
			success = "1";
			msg = "成功";
			/** 分页功能 **/
			Pager<AttributeResult> pager = new Pager<AttributeResult>(list, list.size(), pageNo, pageSize);
			retResult.setRecord(pager);
		} else {
			success = "0";
			msg = "失败";
		}
		retResult.setMsg(msg);
		retResult.setSuccess(success);
		return retResult;
	}

	/**
	 * 搜索功能---混合查询
	 * 
	 * @param req
	 * @return RetResult<Pager<MixedResult>>
	 */
	@RequestMapping(value = "mixed.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody RetResult<Pager<MixedResult>> mixed(HttpServletRequest req) {
		/** 获取前端页面传来的值 **/
		String condition = req.getParameter("keyWord");
		// String condition = "铁心桥";// 测试
		int pageNo = Integer.valueOf(req.getParameter("pageNo"));
		int pageSize = 9;
		int max = 200;
		/** 搜索功能---混合查询 **/
		List<MixedResult> list = mapSearcherService.queryMixed(condition, max);
		// 0:处理失败 1:处理成功
		String success = null;
		// 处理消息
		String msg = null;
		/** 返回封装<Pager<MixedResult>>对象 **/
		RetResult<Pager<MixedResult>> retResult = new RetResult<Pager<MixedResult>>();
		if (list != null && list.size() > 0) {
			success = "1";
			msg = "成功";
			/** 分页功能 **/
			Pager<MixedResult> pager = new Pager<MixedResult>(list, list.size(), pageNo, pageSize);
			retResult.setRecord(pager);
		} else {
			success = "0";
			msg = "失败";
		}
		retResult.setMsg(msg);
		retResult.setSuccess(success);
		return retResult;
	}

	/**
	 * map搜索框下拉iframe
	 * 
	 * @return
	 */
	@RequestMapping(value = "searchFrame.do", method = RequestMethod.GET, produces = "text/html;charset=UTF-8")
	public String getSearchFrame() {
		return "iframe/SearchInputClick";
	}

	/**
	 * 城市列表下拉iframe
	 * 
	 * @return
	 */
	@RequestMapping(value = "maptoolCityFrame.do", method = RequestMethod.GET, produces = "text/html;charset=UTF-8")
	public String getMaptoolCityFrame() {
		return "iframe/CityResult";
	}

	/**
	 * 区域列表下拉iframe
	 * 
	 * @return
	 */
	@RequestMapping(value = "maptoolAreaFrame.do", method = RequestMethod.GET, produces = "text/html;charset=UTF-8")
	public String getMaptoolAreaFrame() {
		return "iframe/AreaResult";
	}

	/****************************** server接口(old) *****************************/

	/**
	 * 属性查询功能(old)
	 * 
	 * @param req
	 * @return RetResult<AttributeResult>
	 */
	@RequestMapping(value = "oldAttribute.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody RetResult<AttributeResult> attributeold(HttpServletRequest req) {
		/** 获取前端页面传来的值 **/
		String x = req.getParameter("x");
		String y = req.getParameter("y");
		int type = Integer.valueOf(req.getParameter("type"));
		int shptype = Integer.valueOf(req.getParameter("shptype"));
		/** 搜索功能---属性查询 **/
		AttributeResult attributeResult = mapSearcherService.queryAttributeOld(x, y, type, shptype);
		// 0:处理失败 1:处理成功
		String success = null;
		// 处理消息
		String msg = null;
		/** 返回封装RetResult<AttributeResult>对象 **/
		RetResult<AttributeResult> retResult = new RetResult<AttributeResult>();
		if (attributeResult != null) {
			success = "1";
			msg = "成功";
			retResult.setRecord(attributeResult);
		} else {
			success = "0";
			msg = "失败";
		}
		retResult.setMsg(msg);
		retResult.setSuccess(success);
		return retResult;
	}

	/**
	 * 搜索功能---关键字查询(old)
	 * 
	 * @param req
	 * @return RetResult<Pager<MapResult>>
	 */
	@RequestMapping(value = "serach.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody RetResult<Pager<MapResult>> serach(HttpServletRequest req) {
		/** 获取前端页面传来的值 **/
		String keyWord = req.getParameter("keyWord") == "" ? " " : req.getParameter("keyWord");
		int pageNo = Integer.valueOf(req.getParameter("pageNo"));
		int pageSize = 9;
		/** 搜索功能---关键字搜索 **/
		List<MapResult> list = mapSearcherService.queryByKeyWord(keyWord, pageNo, pageSize);
		// 0:处理失败 1:处理成功
		String success = null;
		// 处理消息
		String msg = null;
		/** 返回封装RetResult<Pager<MapResult>>对象 **/
		RetResult<Pager<MapResult>> retResult = new RetResult<Pager<MapResult>>();
		if (list != null && list.size() > 0) {
			success = "1";
			msg = "成功";
			/** 分页功能 **/
			Pager<MapResult> pager = new Pager<MapResult>(list, list.size(), pageNo, pageSize);
			retResult.setRecord(pager);
		} else {
			success = "0";
			msg = "失败";
		}
		retResult.setMsg(msg);
		retResult.setSuccess(success);
		return retResult;
	}
}
