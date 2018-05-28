package com.coorun.services.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.coorun.factory.PlanFactory;
import com.coorun.services.PlanService;

/**
 * 规划功能serviceImpl层
 * 
 * @author cd
 * @createDate 2017-10-18
 */
@Service("PlanService")
public class PlanServiceImpl implements PlanService{
	
	@Resource
	PlanFactory planFactory;

	/**
	 * 根据区域编码获取方案列表实现
	 * 
	 * @param areacode,区域编码
	 * @param projectName,方案名称关键字,可为""字符串
	 * @return 返回方案列表集合
	 */
	@Override
	public JSONArray makePlanTree(String areacode, String projectName){
		
		JSONArray jsonArray = planFactory.getPlanList(areacode, projectName);
		return jsonArray;
		
	}
	
	/**
	 * 根据PID获取方案列表实现
	 * 
	 * @param id,方案信息对应ID
	 * @param modelLevel,方案列表层级
	 * @param fatherId,元素上一级父类ID
	 * @return 返回方案列表集合
	 */
	@Override
	public JSONObject makePlanTreeByPID(String id, String modelLevel, String fatherId){
		
		JSONObject jsonObject = planFactory.getPlanListByPID(id, modelLevel, fatherId);
		return jsonObject;
		
	}
	
	/**
	 * 获取当前页控规结果集
	 * 
	 * @param code,查询关键字
	 * @param pageNo,当前页
	 * @param pageSize,每页显示条数
	 * @return 返回控规列表集合
	 */
	@Override
	public JSONObject makeRegulatoryTree(String code, String pageNo, String pageSize){
		
		System.out.println(code + "," + pageNo + "," + pageSize);
		JSONObject jsonObject = planFactory.getRegulatoryList(code, pageNo, pageSize);
		return jsonObject;
		
	}
	
	public static void main(String[] args) {
		PlanServiceImpl impl = new PlanServiceImpl();
//		JSONArray array = impl.makePlanTree("330100", "");
		JSONObject array1 = impl.makePlanTreeByPID("161", "2", "");
		System.out.println(array1);
//		JSONObject array2 = impl.makeRegulatoryTree("E1", "1", "10");
//		System.out.println(array2);
	}
	
}
