package com.coorun.icgis.jites.geodo.api.client;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.alibaba.fastjson.JSON;
import com.coorun.icgis.jites.common.util.HttpUtil;
import com.coorun.icgis.jites.common.util.JSONUtils;
import com.coorun.icgis.jites.geodo.api.bean.BuildingInfo;
import com.coorun.icgis.jites.geodo.api.bean.CensusItemInfo;
import com.coorun.icgis.jites.geodo.api.bean.CommunityGenraalInfo;
import com.coorun.icgis.jites.geodo.api.bean.CommunityTreeInfo;
import com.coorun.icgis.jites.geodo.api.bean.FamilyPeopleInfo;
import com.coorun.icgis.jites.geodo.api.bean.GeodoToken;
import com.coorun.icgis.jites.geodo.api.bean.HealthItemInfo;
import com.coorun.icgis.jites.geodo.api.bean.PeopleHourseInfo;
import com.coorun.icgis.jites.geodo.api.bean.PersonImageInfo;
import com.coorun.icgis.jites.geodo.api.bean.PersonInfo;
import com.coorun.icgis.jites.geodo.api.bean.SnameHourseInfo;
import com.coorun.icgis.jites.geodo.api.response.CommunityTreeInfoResponse;
import com.coorun.icgis.jites.geodo.api.response.HealthItemInfoResponse;

import net.sf.json.JSONObject;


/**
 * geodoEarth 第三方接口请求
 * @author zhuyong
 *
 */
public class GeodoClient {
	
	private static Logger logger = Logger.getLogger(GeodoClient.class);
	
//	private static String GEODO_REQUEST_RUL = "http://124.16.134.55:8181/geodoEarth/rest/property/queryToken";
	private static String GEODO_REQUEST_RUL = "http://106.14.24.63:8081/scmp/rest/property/queryToken";
	// 图片资源前缀
	private static String PREFIX_IMAGE = "http://106.14.24.63:8081/scmp/resources/image/";
	
	/**
	 * 根据用户登录来获取 请求 token
	 * @return
	 */
	public static GeodoToken geoDoTokenByLogin(String loginName, String password) throws Exception {
		GeodoToken geodoToken = new GeodoToken();
		String requestUrl = "http://106.14.24.63:8081/scmp/rest/user/login";
		Map<String, Object> params = new HashMap<>();
		params.put("loginName", loginName);
		params.put("pswd", password);
		String resultStr = HttpUtil.net(requestUrl, params, "POST");
		JSONObject jsonObject = JSONObject.fromObject(resultStr);
		if (jsonObject != null) {
			try {
				String code = jsonObject.getString("code");
				geodoToken.setCode(code);
				geodoToken.setMsg(jsonObject.getString("msg"));
				if (code.equals("200")) {
					geodoToken.setToken(jsonObject.getJSONObject("data").getString("token"));
				}
			} catch (Exception e) {
				logger.error("login exception : data = "+JSONUtils.converterToString(jsonObject));
				e.printStackTrace();
			}
		}
		return geodoToken;
	}
	
	/**
	 * 人口数据获取
	 * @param token
	 * @param params
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public static List<PersonInfo> geoDoPopulationPersonInfo(String token, String params) throws Exception {
		List<PersonInfo> personInfos = new ArrayList<>();
		Map<String, Object> maps = getRequestParams("28", token, params);
		String resultStr = HttpUtil.net(GEODO_REQUEST_RUL, maps, "POST");
		Map<String, Object> stringToObject = (Map<String, Object>) JSONUtils.StringToObject(resultStr, Map.class);
		if (stringToObject.get("code").toString().equals("200")) {
			Map<String, Object> data = (Map<String, Object>) stringToObject.get("data");
			String rows = JSONUtils.converterToString(data.get("rows"));
			if (!StringUtils.isBlank(rows) && !StringUtils.trim(rows).equals("[]")) {
				personInfos = (List<PersonInfo>) JSONUtils.stringToCollectionType(rows, List.class, PersonInfo.class);
			}
		}
		return personInfos;
	}
	
	
	/**
	 * 人查房
	 * @param token
	 * @param params
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public static List<PeopleHourseInfo> geoDoPopulationPersonHourseInfo(String token, String params) throws Exception{
		List<PeopleHourseInfo> hourseInfos = null;
		Map<String, Object> maps = getRequestParams("28", token, params);
		maps.put("fileds", "*");
		String request_url = "http://106.14.24.63:8081/scmp/rest/community/getPeople";
		String resultStr = HttpUtil.net(request_url, maps, "POST");
		Map<String, Object> stringToObject = (Map<String, Object>) JSONUtils.StringToObject(resultStr, Map.class);
		if (stringToObject.get("rows") != null) {
			String rows = JSONUtils.converterToString(stringToObject.get("rows"));
			if (!rows.equals("[]")) {
				hourseInfos = (List<PeopleHourseInfo>) JSONUtils.stringToCollectionType(rows, List.class, PeopleHourseInfo.class);
			}
		}
		return hourseInfos;
	}
	
	/**
	 * 房查人
	 * @param token
	 * @param params
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public static List<SnameHourseInfo> geoDoPopulationSnameHourseInfo(String token, String params) throws Exception {
		List<SnameHourseInfo> retList = null;
		Map<String, Object> maps = getRequestParams("28", token, params);
		String request_url = "http://106.14.24.63:8081/scmp/rest/community/getPeopleBySname";
		String resultStr = HttpUtil.net(request_url, maps, "POST");
		Map<String, Object> stringToObject = (Map<String, Object>) JSONUtils.StringToObject(resultStr, Map.class);
		if (stringToObject.get("rows") != null) {
			String rows = JSONUtils.converterToString(stringToObject.get("rows"));
			if (!rows.equals("[]")) {
				retList = (List<SnameHourseInfo>) JSONUtils.stringToCollectionType(rows, List.class, SnameHourseInfo.class);
			}
		}
		return retList;
	}
	
	/**
	 * 获取人口图片接口
	 * @param token
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public static List<PersonImageInfo> geoDoPopulationPersonImageInfo(String token, String params) throws Exception {
		List<PersonImageInfo> personImageInfos = new ArrayList<>();
		Map<String, Object> maps = getRequestParams("27", token, params);
		String resultStr = HttpUtil.net(GEODO_REQUEST_RUL, maps, "POST");
		Map<String, Object> stringToObject = (Map<String, Object>) JSONUtils.StringToObject(resultStr, Map.class);
		if (stringToObject.get("code").toString().equals("200")) {
			Map<String, Object> data = (Map<String, Object>) stringToObject.get("data");
			String rows = JSONUtils.converterToString(data.get("rows"));
			if (!StringUtils.isBlank(rows) && !StringUtils.trim(rows).equals("[]")) {
				personImageInfos = (List<PersonImageInfo>) JSONUtils.stringToCollectionType(rows, List.class, PersonImageInfo.class);
				for (PersonImageInfo pii : personImageInfos) {
					pii.setImgurl(PREFIX_IMAGE + pii.getImgurl());
				}
			}
		}
		return personImageInfos;
	}
	
	/**
	 * 建筑房屋数据获取
	 * @param token
	 * @param params
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public static List<BuildingInfo> geoDoPopulationBuildingInfo(String token, String params) throws Exception {
		List<BuildingInfo> buildingInfos = null;
		Map<String, Object> maps = getRequestParams("29", token, params);
		String resultStr = HttpUtil.net(GEODO_REQUEST_RUL, maps, "POST");
		Map<String, Object> stringToObject = (Map<String, Object>) JSONUtils.StringToObject(resultStr, Map.class);
		Map<String, Object> data = (Map<String, Object>) stringToObject.get("data");
		if (data != null) {
			String rows = JSONUtils.converterToString(data.get("rows"));
			if (!rows.equals("[]")) {
				buildingInfos = (List<BuildingInfo>) JSONUtils.stringToCollectionType(rows, List.class, BuildingInfo.class);
			}
		}
		return buildingInfos;
	}
	
	/**
	 * 获取男女人口/户籍类型比例
	 * @param token
	 * @param params
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public static List<CensusItemInfo> geoDoPopulationStatisticsCensusSex(String token, String type) throws Exception {
		List<CensusItemInfo> itemInfos = null;
		Map<String, Object> maps = new HashMap<>();
		maps.put("sid", 26);
		maps.put("type", type);
		maps.put("id", "2");
		maps.put("grade", "0");
		maps.put("cid", "53");
		maps.put("token", token);
		String request_url = "http://106.14.24.63:8081/scmp/rest/building/getTowAnylizeInfo";
		String resultStr = HttpUtil.net(request_url, maps, "POST");
		if (!StringUtils.isBlank(resultStr)) {
			itemInfos = (List<CensusItemInfo>) JSONUtils.stringToCollectionType(resultStr, List.class, CensusItemInfo.class);
		}
		return itemInfos;
	}
	
	/**
	 * 获取人口健康状态，婚姻状态，文化程度，政治面貌，年龄分布数据统计
	 * @param token
	 * @param params
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public static HealthItemInfoResponse geoDoPopulationStatisticsManys(String token, String type) throws Exception {
		HealthItemInfoResponse healthItemInfoResponse = null;
		Map<String, Object> maps = new HashMap<>();
		maps.put("sid", 26);
		maps.put("type", type);
		maps.put("id", "2");
		maps.put("grade", "0");
		maps.put("cid", "53");
		maps.put("token", token);
		String request_url = "http://106.14.24.63:8081/scmp/rest/building/getManyAnylizeInfo";
		String resultStr = HttpUtil.net(request_url, maps, "POST");
		if (!StringUtils.isBlank(resultStr)) {
			healthItemInfoResponse = new HealthItemInfoResponse();
			Map<String, Object> object = (Map<String, Object>) JSONUtils.StringToObject(resultStr, Map.class);
			// 健康字段
			Object fields = object.get("fields");
			if (fields != null) {
				List<String> fiList = Arrays.asList(fields.toString().split(","));
				healthItemInfoResponse.setFields(fiList);
			}
			// 楼号健康数据
			Object data = object.get("data");
			if (data != null) {
				List<HealthItemInfo> healList = (List<HealthItemInfo>) JSONUtils.stringToCollectionType(data.toString(), 
						List.class, HealthItemInfo.class);
				healthItemInfoResponse.setHealthItemInfos(healList);
			}
		}
		return healthItemInfoResponse;
	}
	
	/**
	 * 社区每栋楼总人口统计
	 * @param token
	 * @return
	 */
	public static List<CommunityGenraalInfo> geoDoCommunityGenraal(String token) throws Exception {
		List<CommunityGenraalInfo> list = null;
		Map<String, Object> maps = getRequestParams("28", token, null);
		maps.put("id", "53");
		String request_url = "http://106.14.24.63:8081/scmp/rest/front/getCommunityGenraalInfo";
		String resultStr = HttpUtil.net(request_url, maps, "POST");
		if (!StringUtils.isBlank(resultStr)) {
			com.alibaba.fastjson.JSONObject jsonObject = JSON.parseObject(resultStr);
			list = fillCommunityGenList(jsonObject);
		}
		return list;
	}
	
	/**
	 * 社区楼号单元树结构
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static List<CommunityTreeInfoResponse> geoDoPopulationCommunityTree() throws Exception {
		List<CommunityTreeInfoResponse> responses = null;
		Map<String, Object> maps = new HashMap<>();
		maps.put("sid", "28");
		maps.put("uuid", "660f3afb-0abb-4254-8cc7-f866e36293ad");
		String request_url = "http://106.14.24.63:8081/scmp/rest/front/getCommunityTree";
		String resultStr = HttpUtil.net(request_url, maps, "POST");
		if (!StringUtils.isBlank(resultStr)) {
			responses = new ArrayList<>();
			List<CommunityTreeInfo> treeList = (List<CommunityTreeInfo>) JSONUtils.stringToCollectionType(resultStr, List.class, CommunityTreeInfo.class);
			for (CommunityTreeInfo ctInfo : treeList) {
				String pid = ctInfo.getPid();
				String id = ctInfo.getId();
				if (pid.equals("0")) {
					boolean isExist = false;
					for (CommunityTreeInfoResponse checkTree : responses) {
						if (checkTree.getId().equals(id)) {
							isExist = true;
						}
					}
					if (isExist == false) {
						String name = ctInfo.getName();
						String pname = ctInfo.getPname();
						CommunityTreeInfoResponse infoRes = new CommunityTreeInfoResponse(id, name, pid, pname);
						responses.add(infoRes);
					}
				} else {
					int position = -1;
					for (int i = 0; i < responses.size(); i++) {
						String itemId = responses.get(i).getId();
						if (pid.equals(itemId)) {
							position = i;
						}
					}
					if (position != -1) {
						String name = ctInfo.getName();
						String pname = ctInfo.getPname();
						CommunityTreeInfoResponse infoRes = new CommunityTreeInfoResponse(id, name, pid, pname);
						CommunityTreeInfoResponse entity = responses.get(position);
						if (entity.getCommunityTreeInfoResponses() != null) {
							entity.getCommunityTreeInfoResponses().add(infoRes);
						} else {
							List<CommunityTreeInfoResponse> subList = new ArrayList<>();
							subList.add(infoRes);
							entity.setCommunityTreeInfoResponses(subList);
						}
						
						
					}
					
				}
			}
		}
		return responses;
	}
	
	
	/**
	 * 人查家庭成员
	 * @param token
	 * @param params
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public static List<FamilyPeopleInfo> geoDoPopulationFamilyPeople(String token, String params) throws Exception {
		List<FamilyPeopleInfo> retList = null;
		Map<String, Object> maps = getRequestParams("28", token, params);
		maps.put("fileds", "*");
		String request_url = "http://106.14.24.63:8081/scmp/rest/community/getPeople";
		String resultStr = HttpUtil.net(request_url, maps, "POST");
		Map<String, Object> stringToObject = (Map<String, Object>) JSONUtils.StringToObject(resultStr, Map.class);
		if (stringToObject.get("rows") != null) {
			String rows = JSONUtils.converterToString(stringToObject.get("rows"));
			if (!rows.equals("[]")) {
				retList = (List<FamilyPeopleInfo>) JSONUtils.stringToCollectionType(rows, List.class, FamilyPeopleInfo.class);
			}
		}
		return retList;
	}
	
	
	/**
	 * 获取请求参数
	 * @param sid
	 * @param token
	 * @param whereCause
	 * @return
	 */
	public static Map<String, Object> getRequestParams(String sid, String token, String whereCause) {
		Map<String, Object> maps = new HashMap<>();
		maps.put("sid", sid);
		maps.put("token", token);
		if (!StringUtils.isBlank(whereCause)) {
			maps.put("whereCause", whereCause);
		}
		return maps;
	}
	
	/**
	 * communityGen 数据填充
	 * @param jsonObject
	 * @return
	 */
	private static List<CommunityGenraalInfo> fillCommunityGenList(com.alibaba.fastjson.JSONObject jsonObject) {
		List<CommunityGenraalInfo> genList = null;
		if (jsonObject != null) {
			genList = new ArrayList<>();
			com.alibaba.fastjson.JSONObject subJson1 = jsonObject.getJSONObject("#build158");
			CommunityGenraalInfo info1 = new CommunityGenraalInfo(subJson1.getString("name"), subJson1.getString("sname"), subJson1.getString("count"), subJson1.getString("count2"), subJson1.getString("sname2"));
			com.alibaba.fastjson.JSONObject subJson2 = jsonObject.getJSONObject("#build155");
			CommunityGenraalInfo info2 = new CommunityGenraalInfo(subJson2.getString("name"), subJson2.getString("sname"), subJson2.getString("count"), subJson2.getString("count2"), subJson2.getString("sname2"));
			com.alibaba.fastjson.JSONObject subJson3 = jsonObject.getJSONObject("#build152");
			CommunityGenraalInfo info3 = new CommunityGenraalInfo(subJson3.getString("name"), subJson3.getString("sname"), subJson3.getString("count"), subJson3.getString("count2"), subJson3.getString("sname2"));
			com.alibaba.fastjson.JSONObject subJson4 = jsonObject.getJSONObject("#build157");
			CommunityGenraalInfo info4 = new CommunityGenraalInfo(subJson4.getString("name"), subJson4.getString("sname"), subJson4.getString("count"), subJson4.getString("count2"), subJson4.getString("sname2"));
			com.alibaba.fastjson.JSONObject subJson5 = jsonObject.getJSONObject("#build156");
			CommunityGenraalInfo info5 = new CommunityGenraalInfo(subJson5.getString("name"), subJson5.getString("sname"), subJson5.getString("count"), subJson5.getString("count2"), subJson5.getString("sname2"));
			com.alibaba.fastjson.JSONObject subJson6 = jsonObject.getJSONObject("#build154");
			CommunityGenraalInfo info6 = new CommunityGenraalInfo(subJson6.getString("name"), subJson6.getString("sname"), subJson6.getString("count"), subJson6.getString("count2"), subJson6.getString("sname2"));
			com.alibaba.fastjson.JSONObject subJson7 = jsonObject.getJSONObject("#build159");
			CommunityGenraalInfo info7 = new CommunityGenraalInfo(subJson7.getString("name"), subJson7.getString("sname"), subJson7.getString("count"), subJson7.getString("count2"), subJson7.getString("sname2"));
			com.alibaba.fastjson.JSONObject subJson8 = jsonObject.getJSONObject("#build160");
			CommunityGenraalInfo info8 = new CommunityGenraalInfo(subJson8.getString("name"), subJson8.getString("sname"), subJson8.getString("count"), subJson8.getString("count2"), subJson8.getString("sname2"));
			com.alibaba.fastjson.JSONObject subJson9 = jsonObject.getJSONObject("#build161");
			CommunityGenraalInfo info9 = new CommunityGenraalInfo(subJson9.getString("name"), subJson9.getString("sname"), subJson9.getString("count"), subJson9.getString("count2"), subJson9.getString("sname2"));
			com.alibaba.fastjson.JSONObject subJson10 = jsonObject.getJSONObject("#build162");
			CommunityGenraalInfo info10 = new CommunityGenraalInfo(subJson10.getString("name"), subJson10.getString("sname"), subJson10.getString("count"), subJson10.getString("count2"), subJson10.getString("sname2"));
			genList.add(info1);
			genList.add(info2);
			genList.add(info3);
			genList.add(info4);
			genList.add(info5);
			genList.add(info6);
			genList.add(info7);
			genList.add(info8);
			genList.add(info9);
			genList.add(info10);
		}
		return genList;
	}
}
