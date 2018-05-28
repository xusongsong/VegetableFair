package com.coorun.factory;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Repository;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.coorun.entity.ConfigBean;
import com.coorun.util.ServerRequest;

/**
 * 规划数据工厂类,用于获取Server方案列表数据并对外返回方案列表集合
 * 
 * @author cd
 * @createDate 2017-10-18
 */
@Repository(value = "planFactory")
public class PlanFactory {
	
	Logger logger = Logger.getLogger(LayerFactory.class);
	
	/**
	 * 通过url获取规划方案结果集
	 * 
	 * @param areacode,区域编码
	 * @param projectName,方案名称关键字,可为""字符串
	 * @return 返回方案列表集合
	 */
	public JSONArray getPlanList(String areacode, String projectName) {
			
		/**通过配置文件拼接第三方服务路径**/
		ConfigBean config = BaseFactory.getConfig();
		String url = "http://" + config.getServerIP() + ":" + config.getAuthorizePort();
		
		JSONObject jsonObject = null;
		
		String type = "/coo-server/plan/getProjectInfo?";
		String callback = "callback=back&";
		String data = null;
		try {
			data = "data={'areacode':'" + URLEncoder.encode(areacode, "UTF8") + "','projectName':'" + URLEncoder.encode(projectName, "UTF8") + "'}";
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		/**拼接第三方服务请求路径**/
		String serverUrl = url + type + callback + data;
		String jsonData = ServerRequest.getResultByURL(serverUrl);
		//字符串截取
		String string = jsonData.substring(5,jsonData.length()-1);	
		//把字符串转换成json格式
		jsonObject = JSON.parseObject(string);
		JSONArray jsonArray = createPlanList(jsonObject);
		return jsonArray;
		
	}
	
	/**
	 * 生成方案列表结果集对象
	 * 
	 * @param jsonObject,接收结果集对象
	 * @return 返回方案列表集合
	 */
	public static JSONArray createPlanList(JSONObject jsonObject){
		
		//把json格式的数据转换成数组
		JSONArray jsonArray = jsonObject.getJSONObject("results").getJSONArray("serviceInfo");
		return jsonArray;
		
	}
	
	/**
	 * 通过PID获取方案结果集
	 * 
	 * @param id,方案信息对应ID
	 * @param modelLevel,方案列表层级
	 * @param fatherId,元素上一级父类ID
	 * @return 返回方案列表集合
	 */
	public JSONObject getPlanListByPID(String id, String modelLevel, String fatherId) {
		
		if(fatherId == null){
			fatherId = "";
		}
		//通过配置文件拼接第三方服务路径
		ConfigBean config = BaseFactory.getConfig();
		String url = "http://" + config.getServerIP() + ":" + config.getAuthorizePort();
		
		JSONObject jsonObject = null;
		
		String type = "/coo-server/plan/getPlanFileTree?";
		String callback = "callback=1&";
		String data = null;
		try {
			data = "data={'id':'" + URLEncoder.encode(id, "UTF8") + "','modelLevel':'" + URLEncoder.encode(modelLevel, "UTF8") + "','fatherId':'" + URLEncoder.encode(fatherId, "UTF8") + "'}";
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		// 拼接第三方服务请求路径
		String serverUrl = url + type + callback + data;
		String jsonData = ServerRequest.getResultByURL(serverUrl);
		//字符串截取
		String string = jsonData.substring(2,jsonData.length()-1);	
		//把字符串转换成json格式
		jsonObject = JSON.parseObject(string);
		JSONObject jsonObjectReq = createPlanListByPID(jsonObject);
		return jsonObjectReq;
		
	}
	
	/**
	 * 生成方案列表结果集对象
	 * 
	 * @param jsonObject,接收结果集对象
	 * @return 返回方案列表集合
	 */
	public static JSONObject createPlanListByPID(JSONObject jsonObject){
		
		//把json格式的数据转换成数组
		JSONObject jsonArray = jsonObject.getJSONObject("results");
		return jsonArray;
		
	}
	
	/**
	 * 获取当前页控规结果集
	 * 
	 * @param code,查询关键字
	 * @param pageNo,当前页
	 * @param pageSize,每页显示条数
	 * @return 返回控规列表集合
	 */
	public JSONObject getRegulatoryList(String code, String pageNo, String pageSize) {
			
		/**通过配置文件拼接第三方服务路径**/
		ConfigBean config = BaseFactory.getConfig();
		String url = "http://" + config.getServerIP() + ":" + config.getAuthorizePort();
		
		JSONObject jsonObject = null;
		
		String type = "/coo-server/kg/getKGByCode?";
		String callback = "callback=json_callback&";
		String data = null;
		try {
			data = "data={'code':'" + URLEncoder.encode(code, "UTF8") + "','pageNo':'" + URLEncoder.encode(pageNo, "UTF8") + "','pageSize':'" + URLEncoder.encode(pageSize, "UTF8") + "'}";
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		/**拼接第三方服务请求路径**/
		String serverUrl = url + type + callback + data;
		String jsonData = ServerRequest.getResultByURL(serverUrl);
		//字符串截取
		String string = jsonData.substring(14,jsonData.length()-1);	
		//把字符串转换成json格式
		jsonObject = JSON.parseObject(string);
		return jsonObject;
		
	}
	
	public static void main(String[] args) {
//		JSONArray str = getPlanList("330100", "大关");
//		System.out.println(str);
		PlanFactory planFactory = new PlanFactory();
		JSONObject str1 = planFactory.getPlanListByPID("161", "2", "");
		System.out.println(str1);
//		JSONObject str2 = planFactory.getRegulatoryList("E1", "1", "10");
//		System.out.println(str2);
	}
	
}
