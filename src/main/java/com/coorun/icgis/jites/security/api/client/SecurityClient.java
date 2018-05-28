package com.coorun.icgis.jites.security.api.client;



import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.coorun.icgis.jites.common.bean.vo.Children;
import com.coorun.icgis.jites.common.util.HttpUtil;
import com.coorun.icgis.jites.common.util.JSONUtils;
import com.coorun.icgis.jites.security.api.vo.ClimbInfoRecord;
import com.coorun.icgis.jites.security.api.vo.ClimbRecordRequest;
import com.coorun.icgis.jites.security.api.vo.VideoInfo;
import com.coorun.icgis.jites.security.api.vo.WifiInfoRecord;



/**
 * Security 第三方接口请求
 * @author lichao
 *
 */
public class SecurityClient {

	private static Logger logger = Logger.getLogger(SecurityClient.class);
	
	
	//WIFI信息列表
	private static String SECURITY_WIFI_INFO_URL = "http://janus.sshmt.com/api/wifi";
	
	//WIFI连接记录列表
	private static String SECURITY_WIFI_RECORD_URL = "http://janus.sshmt.com/api/wifilog";
	
	//查询防攀爬设备
	private static String SECURITY_NO_CLIMB_URL = "http://58.210.81.123:1239/fpp-master/index.php/Service/Node/getNodes";
	
	//根据设备名称获取视频地址
	private static String SECURITY_NO_CLIMB_VIDEO_URL = "http://58.210.81.123:1239/fpp-master/index.php/Service/Node/getVideoByNode";
	
	//获取防攀爬报警记录
	private static String SECURITY_NO_CLIMB_WARNING_URL = "http://58.210.81.123:1239/fpp-master/index.php/Service/Node/getNodeRecord";
	
	
	
	/**
	 * WIFI信息列表
	 * @param uuid
	 * @return
	 * @throws Exception
	 */
	public static List<Children> securityWifiInfo(String uuid) throws Exception{
		List<Children> childrens = new ArrayList<>();
		Map<String, Object> maps = new HashMap<>();
		maps.put("UUID", uuid);
		String net = HttpUtil.net(SECURITY_WIFI_INFO_URL, maps, "GET");
		JSONObject parseObject = JSON.parseObject(net);
		if("0".equals(parseObject.getString("code"))) {
			String string = parseObject.getString("data");
			if(!StringUtils.isBlank(string) && !StringUtils.trim(string).equals("[]")) {
				childrens = (List<Children>) JSONUtils.stringToCollectionType(string, List.class, Children.class);
			}
		}
		return childrens;
	}
	
	
	
	
	
	/**
	 * WIFI连接记录列表
	 * @param id
	 * @param startTime
	 * @param endTime
	 * @return
	 * @throws Exception
	 */
	public static List<WifiInfoRecord> securityWifiRecord(String id,String startTime,String endTime ) throws Exception{
		List<WifiInfoRecord> infoRecords = new ArrayList<>();
		Map<String, Object> maps = new HashMap<>();
		maps.put("id", id);
		maps.put("startTime", startTime);
		maps.put("endTime", endTime);
		String net = HttpUtil.net(SECURITY_WIFI_RECORD_URL, maps, "GET");
		JSONObject parseObject = JSON.parseObject(net);
		if("0".equals(parseObject.getString("code"))) {
			String string = parseObject.getString("data");
			if(!StringUtils.isBlank(string) && !StringUtils.trim(string).equals("[]")) {
				infoRecords = (List<WifiInfoRecord>) JSONUtils.stringToCollectionType(string, List.class, WifiInfoRecord.class);
			}
		}
		return infoRecords;
	}
	
	
	
	
	/**
	 * 根据UUID查询防攀爬设备 
	 * @param uuid
	 * @return
	 * @throws Exception
	 */
	public static List<Children> securityClimbInfo(String communityId) throws Exception{
		List<Children> childrens = new ArrayList<>();
		Map<String, Object> maps = new HashMap<>();
		maps.put("communityId", communityId);
		String net = HttpUtil.net(SECURITY_NO_CLIMB_URL, maps, "GET");
		JSONObject parseObject = JSON.parseObject(net);
		if("200".equals(parseObject.getString("status"))) {
			String string = parseObject.getString("data");
			if(!StringUtils.isBlank(string) && !StringUtils.trim(string).equals("[]")) {
				childrens = (List<Children>) JSONUtils.stringToCollectionType(string, List.class, Children.class);
			}
		}
		return childrens;
	}
	
	
	
	/**
	 * 根据设备名称获取视频地址
	 * @param serialNo
	 * @return
	 * @throws Exception
	 */
	public static List<VideoInfo> getVideoByNode(String serialNo) throws Exception{
		List<VideoInfo> infos = new ArrayList<>();
		Map<String, Object> maps = new HashMap<>();
		maps.put("serial_no", serialNo);
		String net = HttpUtil.net(SECURITY_NO_CLIMB_VIDEO_URL, maps, "POST");
		JSONObject parseObject = JSON.parseObject(net);
		if("200".equals(parseObject.getString("status"))) {
			String string = parseObject.getString("data");
			if(!StringUtils.isBlank(string) && !StringUtils.trim(string).equals("[]")) {
				infos = (List<VideoInfo>) JSONUtils.stringToCollectionType(string, List.class, VideoInfo.class);
			}
		}
		return infos;
	}
	
	
	
	/**
	 * 获取防攀爬报警记录
	 * @param floorId
	 * @param startTime
	 * @param endTime
	 * @return
	 * @throws Exception
	 */
	public static List<ClimbInfoRecord> securityClimbRecord(ClimbRecordRequest request) throws Exception{
		List<ClimbInfoRecord> infoRecords = new ArrayList<>();
		//Map<String, Object> maps = getRequestParams(request);
		String param = JSONUtils.converterToString(request);
		//String net = HttpUtil.net(SECURITY_NO_CLIMB_WARNING_URL, maps, "POST");
		String net = HttpUtil.doPostByJson(SECURITY_NO_CLIMB_WARNING_URL, param);
		JSONObject parseObject = JSON.parseObject(net);
		if("200".equals(parseObject.getString("status"))) {
			String string = parseObject.getString("data");
			if(!StringUtils.isBlank(string) && !StringUtils.trim(string).equals("[]")) {
				infoRecords = (List<ClimbInfoRecord>) JSONUtils.stringToCollectionType(string, List.class, ClimbInfoRecord.class);
			}
		}
		return infoRecords;
	}
	
	
	
	/**
	 * 封装防攀爬请求参数
	 * @param request
	 * @return
	 */
	public static Map<String, Object> getRequestParams(ClimbRecordRequest request) {
		Map<String, Object> maps = new HashMap<>();
		if(StringUtils.isNotBlank(request.getCommunityId())) {
			maps.put("communityId", request.getCommunityId());
		}
		if(StringUtils.isNotBlank(request.getDeviceId())){
			maps.put("deviceId", request.getDeviceId());
		}
		if(StringUtils.isNotBlank(request.getFloorId())) {
			maps.put("floorId", request.getFloorId());
		}
		maps.put("startTime", request.getStartTime());
		maps.put("endTime", request.getEndTime());
		return maps;
	}
}
