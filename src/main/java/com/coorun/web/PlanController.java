package com.coorun.web;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.coorun.entity.ConfigBean;
import com.coorun.factory.BaseFactory;
import com.coorun.om.base.bean.UserInfo;
import com.coorun.om.base.util.Constants;
import com.coorun.services.PlanService;
import com.coorun.util.RetResult;

/**
 * 图层规划功能的controller层
 * 
 * @author cd
 * @createDate 2017-10-18
 */
@Controller
@RequestMapping(value="plan")
public class PlanController {
	@Resource
	private PlanService planService;
	
	/**
	 * 向前端返回方案列表结果集
	 * 
	 * @param req
	 * @return
	 */
	@RequestMapping(value="makePlanTree", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody RetResult<JSONArray> makePlanTree(HttpServletRequest req){
		
		/** 获取前端页面传来的值**/
		String areacode = req.getParameter("areacode");
		String projectName = req.getParameter("projectName");
		/** 列表获取 ---方案**/
		JSONArray array = planService.makePlanTree(areacode, projectName);
		// 0:处理失败 1:处理成功
		String success = null;
		// 处理消息
		String msg = null;
		// 返回给前端的封装对象
		RetResult<JSONArray> retResult = new RetResult<JSONArray>();
		if (array != null && array.size() > 0) {
			success = "1";
			msg = "成功";
			// 返回结果集
			retResult.setRecord(array);
		} else {
			success = "0";
			msg = "失败";
		}
		retResult.setMsg(msg);
		retResult.setSuccess(success);
		return retResult;

	}
	
	/**
	 * 向前端返回方案列表结果集
	 * 
	 * @param req
	 * @return
	 */
	@RequestMapping(value="makePlanTreeByPID", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody RetResult<JSONObject> makePlanTreeByPID(HttpServletRequest req){
		
		/** 获取前端页面传来的值**/
		String id = req.getParameter("id");
		String modelLevel = req.getParameter("modelLevel");
		String fatherId = req.getParameter("fatherId");
		/** 列表获取 ---方案**/
		JSONObject obj = planService.makePlanTreeByPID(id, modelLevel, fatherId);
		// 0:处理失败 1:处理成功
		String success = null;
		// 处理消息
		String msg = null;
		// 返回给前端的封装对象
		RetResult<JSONObject> retResult = new RetResult<JSONObject>();
		if (obj != null && obj.size() > 0) {
			success = "1";
			msg = "成功";
			// 返回结果集
			retResult.setRecord(obj);
		} else {
			success = "0";
			msg = "失败";
		}
		retResult.setMsg(msg);
		retResult.setSuccess(success);
		return retResult;

	}
	
	/**
	 * 返回前端图片展示页面
	 * 
	 * @param req
	 * @return
	 */
	@RequestMapping(value="redirectURL",method=RequestMethod.GET,produces = "application/json;charset=UTF-8")
	public String redirectURL(HttpServletRequest request) throws Exception{
		request.setCharacterEncoding("UTF-8");
		String path = request.getParameter("url");
		path = new String(path.getBytes("ISO-8859-1"),"UTF-8");
		request.setAttribute("url", path);
		return "MyJsp";
	}
	
	/**
	 * 获取当前页控规结果集
	 * 
	 * @param req
	 * @return
	 */
	@RequestMapping(value="makeRegulatoryTree", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody RetResult<JSONObject> makeRegulatoryTree(HttpServletRequest req) throws Exception{
		
		/** 获取前端页面传来的值**/
		String code = req.getParameter("code");
		String pageNo = req.getParameter("pageNo");
		String pageSize = req.getParameter("pageSize");
		/** 列表获取 ---方案**/
		JSONObject obj = planService.makeRegulatoryTree(code, pageNo, pageSize);
		// 0:处理失败 1:处理成功
		String success = null;
		// 处理消息
		String msg = null;
		// 返回给前端的封装对象
		RetResult<JSONObject> retResult = new RetResult<JSONObject>();
		if (obj != null && obj.size() > 0) {
			success = "1";
			msg = "成功";
			// 返回结果集
			retResult.setRecord(obj);
		} else {
			success = "0";
			msg = "失败";
		}
		retResult.setMsg(msg);
		retResult.setSuccess(success);
		return retResult;
	}
	
	/**
	 * 返回规划页面
	 * 
	 * @return
	 */
	@RequestMapping(value = "plan.do", method = RequestMethod.POST)
	public String plan(HttpServletRequest req) {
		String inputText = req.getParameter("inputTextForPlan");
		String cityName = req.getParameter("cityNameForPlan");
		String areaName = req.getParameter("areaNameForPlan");
		String reqType = req.getParameter("regulatoryPlan");
		// 通过配置文件拼接第三方服务路径
		ConfigBean config = BaseFactory.getConfig();
		if (config == null) {
			return null;
		}
		String url = "http://" + config.getServerIP() + ":" + config.getServerPort();
		String serverAreacode1 = config.getServerAreacode1();
		//获取登录session用户
		UserInfo userInfo = (UserInfo)req.getSession().getAttribute(Constants.CURRENT_USER);
		if(null != userInfo){//登录则
			req.setAttribute("userInfo", userInfo);
		}
		req.setAttribute("inputText", inputText);
		req.setAttribute("cityName", cityName);
		req.setAttribute("areaName", areaName);
		
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
		/** particular **/
		req.setAttribute("reqType", reqType);
		req.setAttribute("planServerURL", url);
		req.setAttribute("serverAreacodeWrl", serverAreacode1);
		req.setAttribute("defaultLoadType", config.getDefaultLoadType());
		req.setAttribute("dataType", config.getDataType());

		return "map";
	}
	
}
