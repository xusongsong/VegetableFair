package com.coorun.web;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.coorun.entity.AppKeyResult;
import com.coorun.entity.ArtemisByNode;
import com.coorun.entity.ArtemisTreeNode;
import com.coorun.entity.ConfigBean;
import com.coorun.entity.VideoInfo;
import com.coorun.factory.BaseFactory;
import com.coorun.services.ArtemisService;
import com.coorun.util.RetResult;

/**
 * 对接海康接口Controller层
 *
 * @author shine
 * @createDate 2018-03-25
 */
@Controller
@RequestMapping(value = "artemis")
public class ArtemisController {
	// 场景管理(路径、视点)
	@Resource
	ArtemisService artemisService;

	/**
	 * 通用模块功能-查询所有监控视频
	 *
	 * @param req
	 * @return RetResult<String>
	 */
	@RequestMapping(value = "findCameraInfoPage")
	public @ResponseBody
	RetResult findCameraInfoPage(HttpServletRequest req) {
		List<VideoInfo> list = new ArrayList<VideoInfo>();
		RetResult retResult = null;
		/** 获取前端页面传来的值 **/
		String start = req.getParameter("start");
		String size = req.getParameter("size");
		String orderby = req.getParameter("orderby");
		String order = req.getParameter("order");
		Map<String, String> paramMap = new HashMap<String, String>();
		paramMap.put("start", start);
		paramMap.put("size", size);
		paramMap.put("orderby", orderby);
		paramMap.put("order", order);
		list = artemisService.findCameraInfoPage(paramMap);
		if (list != null && list.size() > 0) {
			retResult = new RetResult("1", "查询成功", list);
		} else {
			retResult = new RetResult("0", "查询失败");
		}
		return retResult;
	}

	/**
	 * 通用模块功能-根据appKey获取加密协议
	 *
	 * @param req
	 * @return RetResult<String>
	 */
	@RequestMapping(value = "securityParam")
	public @ResponseBody
	RetResult securityParam(HttpServletRequest req) {
		AppKeyResult appKeyResult = new AppKeyResult();
		RetResult retResult = null;
		ConfigBean config = BaseFactory.getConfig();
		//获取配置文件中的秘钥
		String appKey = config.getArtemisAppKey();
		Map<String, String> paramMap = new HashMap<String, String>();
		paramMap.put("appKey", appKey);
		appKeyResult = artemisService.securityParam(paramMap);
		if (appKeyResult != null) {
			retResult = new RetResult("1", "查询成功", appKeyResult);
		} else {
			retResult = new RetResult("0", "查询失败");
		}
		return retResult;
	}

	/**
	 * 根据组织编号分页获取监控点信息
	 *
	 * @param req
	 * @return RetResult<String>
	 */
	@RequestMapping(value = "findCameraInfoPageByTreeNode")
	public @ResponseBody
	RetResult findCameraInfoPageByTreeNode(HttpServletRequest req) {
		List<ArtemisByNode> list = new ArrayList<ArtemisByNode>();
		RetResult retResult = null;
		/** 获取前端页面传来的值 **/
		String treeNode = req.getParameter("treeNode");
		String start = req.getParameter("start");
		String size = req.getParameter("size");
		String orderby = req.getParameter("orderby");
		String order = req.getParameter("order");
		Map<String, String> paramMap = new HashMap<String, String>();
		paramMap.put("treeNode", treeNode);
		paramMap.put("start", start);
		paramMap.put("size", size);
		paramMap.put("orderby", orderby);
		paramMap.put("order", order);
		list = artemisService.findCameraInfoPageByTreeNode(paramMap);
		if (list != null && list.size() > 0) {
			retResult = new RetResult("1", "查询成功", list);
		} else {
			retResult = new RetResult("0", "查询失败");
		}
		return retResult;
	}

	/**
	 * 分页获取组织树
	 *
	 * @param req
	 * @return RetResult<String>
	 */
	@RequestMapping(value = "findControlUnitPage")
	public @ResponseBody
	RetResult findControlUnitPage(HttpServletRequest req) {
		List<ArtemisTreeNode> list = new ArrayList<ArtemisTreeNode>();
		RetResult retResult = null;
		/** 获取前端页面传来的值 **/
		String start = req.getParameter("start");
		String size = req.getParameter("size");
		String orderby = req.getParameter("orderby");
		String order = req.getParameter("order");
		Map<String, String> paramMap = new HashMap<String, String>();
		paramMap.put("start", start);
		paramMap.put("size", size);
		paramMap.put("orderby", orderby);
		paramMap.put("order", order);
		list = artemisService.findControlUnitPage(paramMap);
		if (list != null && list.size() > 0) {
			retResult = new RetResult("1", "查询成功", list);
		} else {
			retResult = new RetResult("0", "查询失败");
		}
		return retResult;
	}

	/**
	 * 根据监控点编号获取RTSP流地址
	 *
	 * @param request
	 * @return RetResult<String>
	 */
	@RequestMapping(value = "rtspUrlQuery")
	public @ResponseBody
	RetResult queryRtspUrl(HttpServletRequest request) {
		String indexCode = request.getParameter("indexCode");
		String result = artemisService.queryRTSPUrl(indexCode);
		RetResult retResult;
		if (result != null && !"".equals(result)) {
			retResult = new RetResult("1", "查询成功", result);
		} else {
			retResult = new RetResult("0", "查询失败");
		}
		return retResult;
	}
}
