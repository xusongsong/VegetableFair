package com.coorun.services;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

/**
 * 规划功能接口
 * 
 * @author cd
 * @createDate 2017-10-18
 */
public interface PlanService {
	
	/**
	 * 根据区域编码获取方案列表
	 * 
	 * @param areacode,区域编码
	 * @param projectName,方案名称关键字,可为""字符串
	 * @return 返回方案列表集合
	 */
	JSONArray makePlanTree(String areacode, String projectName);
	
	/**
	 * 根据PID获取方案列表
	 * 
	 * @param id,方案信息对应ID
	 * @param modelLevel,方案列表层级
	 * @param fatherId,元素上一级父类ID
	 * @return 返回方案列表集合
	 */
	JSONObject makePlanTreeByPID(String id, String modelLevel, String fatherId);
	
	/**
	 * 获取当前页控规结果集
	 * 
	 * @param code,查询关键字
	 * @param pageNo,当前页
	 * @param pageSize,每页显示条数
	 * @return 返回控规列表集合
	 */
	JSONObject makeRegulatoryTree(String code, String pageNo, String pageSize);
	
}
