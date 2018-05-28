package com.coorun.web;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.coorun.entity.Coverage;
import com.coorun.entity.Layer;
import com.coorun.om.base.bean.UserInfo;
import com.coorun.om.base.util.Constants;
import com.coorun.services.LayerService;
import com.coorun.util.RetResult;

/**
 * 图层功能的controller层
 * 
 * @author cd
 * @createDate 2017-09-12
 */
@Controller
@RequestMapping(value="layerManager")
public class LayerManagerController {
	@Resource
	private LayerService layerService;
	
	/**
	 * 向前端返回模型列表结果集
	 * 
	 * @param req
	 * @return
	 */
	@RequestMapping(value="queryLayerTree", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody RetResult<List<Map<String, Object>>> queryLayerTree(HttpServletRequest req){
		
		/** 获取前端页面传来的值**/
		String areacode = req.getParameter("areacode");
		String type = req.getParameter("type");
		/** 列表获取 ---模型**/
		List<Map<String, Object>> list = layerService.makeLayerTree(areacode, type);
		// 0:处理失败 1:处理成功
		String success = null;
		// 处理消息
		String msg = null;
		// 返回给前端的封装对象
		RetResult<List<Map<String, Object>>> retResult = new RetResult<List<Map<String, Object>>>();
		if (list != null && list.size() > 0) {
			success = "1";
			msg = "成功";
			// 返回结果集
			retResult.setRecord(list);
		} else {
			success = "0";
			msg = "失败";
		}
		retResult.setMsg(msg);
		retResult.setSuccess(success);
		return retResult;

	}
	
	/**
	 * 向前端返回根据ID查询得到的模型列表结果集
	 * 
	 * @param req
	 * @return
	 */
	@RequestMapping(value="queryLayerByNodeID", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody RetResult<List<String>> queryLayerByNodeID(HttpServletRequest req){
		
		/** 获取前端页面传来的值**/
		String areacode = req.getParameter("areacode");
		String type = req.getParameter("type");
		String nodeID = req.getParameter("nodeID");
		int rank = Integer.parseInt(req.getParameter("rank"));
		/** 列表获取---根据ID查询**/
		List<String> list = layerService.queryLayersByNodeID(areacode, type, nodeID, rank);
		// 0:处理失败 1:处理成功
		String success = null;
		// 处理消息
		String msg = null;
		// 返回给前端的封装对象
		RetResult<List<String>> retResult = new RetResult<List<String>>();
		if (list != null && list.size() > 0) {
			success = "1";
			msg = "成功";
			// 返回结果集
			retResult.setRecord(list);
		} else {
			success = "0";
			msg = "失败";
		}
		retResult.setMsg(msg);
		retResult.setSuccess(success);
		return retResult;

	}
	
	/**
	 * 向前端返回倾斜摄影列表结果集
	 * 
	 * @param req
	 * @return
	 */
	@RequestMapping(value="makeOSGBLayerTree", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody RetResult<List<Layer>> makeOSGBLayerTree(HttpServletRequest req){
		
		/** 获取前端页面传来的值**/
		String areacode = req.getParameter("areacode");
		String type = req.getParameter("type");
		/** 列表获取---倾斜摄影**/
		List<Layer> list = layerService.makeOSGBLayerTree(areacode, type);
		// 0:处理失败 1:处理成功
		String success = null;
		// 处理消息
		String msg = null;
		// 返回给前端的封装对象
		RetResult<List<Layer>> retResult = new RetResult<List<Layer>>();
		if (list != null && list.size() > 0) {
			success = "1";
			msg = "成功";
			// 返回结果集
			retResult.setRecord(list);
		} else {
			success = "0";
			msg = "失败";
		}
		retResult.setMsg(msg);
		retResult.setSuccess(success);
		return retResult;

	}
	
	/**
	 * 向前端返回倾斜摄影/bim列表结果集(老接口)
	 * 
	 * @param req
	 * @return
	 */
	@RequestMapping(value="makeServerListTree", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody RetResult<JSONObject> makeServerListTree(HttpServletRequest req){
		
		/** 获取前端页面传来的值**/
		String type = req.getParameter("type");
		/** 列表获取---倾斜摄影/bim**/
		JSONObject list = layerService.makeServerListTree(type);
		// 0:处理失败 1:处理成功
		String success = null;
		// 处理消息
		String msg = null;
		// 返回给前端的封装对象
		RetResult<JSONObject> retResult = new RetResult<JSONObject>();
		if (list != null && list.size() > 0) {
			success = "1";
			msg = "成功";
			// 返回结果集
			retResult.setRecord(list);
		} else {
			success = "0";
			msg = "失败";
		}
		retResult.setMsg(msg);
		retResult.setSuccess(success);
		return retResult;

	}
	/**
	 * OSGB,BIM,terrain,image图层列表
	 * @param req
	 * @return
	 */
	@RequestMapping(value = "getCoverageList", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public RetResult<List<Coverage>> getCoverageList(HttpServletRequest req) {
		/** 获取前端页面传来的值 **/
		String cityCode = req.getParameter("cityCode");
		String stype = req.getParameter("stype");
		String sname = req.getParameter("sname");
		if(sname == null){
			sname = "";
		}
		/** 图层列表获取**/
		List<Coverage> list = layerService.getCoverageList(cityCode, stype, sname);
		// 0:处理失败 1:处理成功
		String success = null;
		// 处理消息
		String msg = null;
		// 封装对象
		RetResult<List<Coverage>> retResult = new RetResult<List<Coverage>>();
		if (list != null && list.size() > 0) {
			success = "1";
			msg = "成功";
			retResult.setRecord(list);
		} else {
			success = "0";
			msg = "失败";
		}
		retResult.setMsg(msg);
		retResult.setSuccess(success);
		return retResult;

	}
	/**
	 * 获取该用户ID下的所有服务名
	 * @param req
	 * @return
	 */
	@RequestMapping(value = "getSnameByUserID", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public RetResult<List<String>> getSnameByUserID(HttpServletRequest req) {
		/** 获取前端页面传来的值 **/
		String userID = (String) req.getSession().getAttribute(Constants.CURRENT_SESSIONID);
		System.out.println(userID);
		String stype = req.getParameter("stype");
		String sname = "";
		/** 图层列表获取**/
		List<String> list = layerService.getSnameByUserID(userID, sname, stype);
		// 0:处理失败 1:处理成功
		String success = null;
		// 处理消息
		String msg = null;
		// 封装对象
		RetResult<List<String>> retResult = new RetResult<List<String>>();
		if (list != null && list.size() > 0) {
			success = "1";
			msg = "成功";
			retResult.setRecord(list);
		} else {
			success = "0";
			msg = "失败";
		}
		retResult.setMsg(msg);
		retResult.setSuccess(success);
		return retResult;

	}
	
	/**
	 * 向前端返回模型列表结果集
	 * 
	 * @param req
	 * @return
	 */
	@RequestMapping(value="queryLayerTreeNew", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody RetResult<List<Map<String, Object>>> queryLayerTreeNew(HttpServletRequest req){
		
		/** 获取前端页面传来的值**/
		String sname = req.getParameter("sname");
		String type = req.getParameter("type");
		String dataType = req.getParameter("dataType");
		/** 列表获取 ---模型**/
		List<Map<String, Object>> list = layerService.makeLayerTreeNew(sname, type, dataType);
		// 0:处理失败 1:处理成功
		String success = null;
		// 处理消息
		String msg = null;
		// 返回给前端的封装对象
		RetResult<List<Map<String, Object>>> retResult = new RetResult<List<Map<String, Object>>>();
		if (list != null && list.size() > 0) {
			success = "1";
			msg = "成功";
			// 返回结果集
			retResult.setRecord(list);
		} else {
			success = "0";
			msg = "失败";
		}
		retResult.setMsg(msg);
		retResult.setSuccess(success);
		return retResult;

	}
	
	/**
	 * 向前端返回根据ID查询得到的模型列表结果集
	 * 
	 * @param req
	 * @return
	 */
	@RequestMapping(value="queryLayerByNodeIDNew", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody RetResult<List<String>> queryLayerByNodeIDNew(HttpServletRequest req){
		
		/** 获取前端页面传来的值**/
		String sname = req.getParameter("sname");
		String type = req.getParameter("type");
		String dataType = req.getParameter("dataType");
		String nodeID = req.getParameter("nodeID");
		int rank = Integer.parseInt(req.getParameter("rank"));
		/** 列表获取---根据ID查询**/
		List<String> list = layerService.queryLayersByNodeIDNew(sname, type, dataType, nodeID, rank);
		// 0:处理失败 1:处理成功
		String success = null;
		// 处理消息
		String msg = null;
		// 返回给前端的封装对象
		RetResult<List<String>> retResult = new RetResult<List<String>>();
		if (list != null && list.size() > 0) {
			success = "1";
			msg = "成功";
			// 返回结果集
			retResult.setRecord(list);
		} else {
			success = "0";
			msg = "失败";
		}
		retResult.setMsg(msg);
		retResult.setSuccess(success);
		return retResult;

	}
	
	public LayerService getLayerServices() {
		return layerService;
	}

	public void setLayerServices(LayerService layerServices) {
		this.layerService = layerServices;
	}
	
}
