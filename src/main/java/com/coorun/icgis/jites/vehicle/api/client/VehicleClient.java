package com.coorun.icgis.jites.vehicle.api.client;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.BeanMap;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.coorun.icgis.jites.common.bean.vo.Children;
import com.coorun.icgis.jites.common.util.HttpUtil;
import com.coorun.icgis.jites.common.util.JSONUtils;
import com.coorun.icgis.jites.vehicle.api.vo.CarInfo;
import com.coorun.icgis.jites.vehicle.api.vo.TrafficFlowInfo;
import com.coorun.icgis.jites.vehicle.api.vo.VehicleAccessRecord;
import com.coorun.icgis.jites.vehicle.api.vo.VehicleAccessRecordRequest;
import com.coorun.icgis.jites.vehicle.api.vo.VehicleTrailInfo;

public class VehicleClient {

	
	private static Logger logger = Logger.getLogger(VehicleClient.class);
	
	//根据UUID查询车辆设备  
	private static String VEHICLE_DEVICE_INFO_URL = "http://58.210.81.123:1239/plate-web/index.php/Service/Vehicle/clientLists";
	
	//根据车牌获取车辆信息
	private static String VEHICLE_INFO_GETPLATES = "http://58.210.81.123:1239/plate-web/index.php/Service/Vehicle/getPlates";
	
	//获取今天的车流量信息（如果为零，则今天没有车流量记录）
	private static String VEHICLE_TRAFFIC_FLOW = "http://58.210.81.123:1239/plate-web/index.php/Service/Vehicle/getPlateTrack";
	
	//查询车辆出入记录
	private static String VEHICLE_GETPLATE_RECORD = "http://58.210.81.123:1239/plate-web/index.php/Service/Vehicle/getPlateRecord";
	
	//获取车辆记录的视频截图
	private static String VEHICLE_GETPLATE_IMG = "http://58.210.81.123:1239/plate-web/index.php/Service/Vehicle/getPlateImg";
	
	//统计车辆轨迹
	private static String VEHICLE_GETPLATE_TRAIL = "http://58.210.81.123:1239/plate-web/index.php/Service/Vehicle/getPlateTrail";

	/**
	 * 根据车牌获取车辆信息
	 * @param communityIds
	 * @return
	 * @throws Exception
	 */
	public static List<Children> vehicleDeviceInfo(String communityIds) throws Exception{
		List<Children> childrens = new ArrayList<>();
		Map<String, Object> maps = new HashMap<>();
		maps.put("communityIds", communityIds);
		String net = HttpUtil.net(VEHICLE_DEVICE_INFO_URL, maps, "POST");
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
	 * 根据车牌获取车辆信息
	 * @param communityIds
	 * @param carId (车牌号（模糊查询）)
	 * @return
	 * @throws Exception
	 */
	public static List<CarInfo> vehicleGetPlates(String communityId,String carId) throws Exception{
		List<CarInfo> infos = new ArrayList<>();
		Map<String, Object> maps = new HashMap<>();
		maps.put("communityId", communityId);
		maps.put("carId", carId);
		String net = HttpUtil.net(VEHICLE_INFO_GETPLATES, maps, "POST");
		JSONObject parseObject = JSON.parseObject(net);
		if("200".equals(parseObject.getString("status"))) {
			String string = parseObject.getString("data");
			if(!StringUtils.isBlank(string) && !StringUtils.trim(string).equals("[]")) {
				infos = (List<CarInfo>) JSONUtils.stringToCollectionType(string, List.class, CarInfo.class);
			}
		}
		return infos;
	}
	
	
	
	/**
	 * 获取今天的车流量信息（如果为零，则今天没有车流量记录）
	 * @param communityIds
	 * @return
	 * @throws Exception
	 */
	public static TrafficFlowInfo vehicleTrafficFlow(String communityIds) throws Exception {
		TrafficFlowInfo infos = new TrafficFlowInfo();
		Map<String, Object> maps = new HashMap<>();
		maps.put("communityIds", communityIds);
		String net = HttpUtil.net(VEHICLE_TRAFFIC_FLOW, maps, "POST");
		if(!StringUtils.isBlank(net) && !StringUtils.trim(net).equals("{0}")) {
			//JSONObject parseObject = JSON.parseObject(net);
			infos = (TrafficFlowInfo) JSONUtils.StringToObject(net, TrafficFlowInfo.class);
			if("200".equals(infos.getStatus())) {
				return infos;
			}
		}
		return infos;
	}
	
	
	
	/**
	 * 查询车辆出入记录
	 * @param accessRecordRequest
	 * @return
	 * @throws Exception
	 */
	public static List<VehicleAccessRecord> vehicleDeviceRecord(VehicleAccessRecordRequest accessRecordRequest) throws Exception {
		List<VehicleAccessRecord> accessRecords = new ArrayList<>();
		Map<String, Object> maps = accessRecordRequestToMap(accessRecordRequest);
		String net = HttpUtil.net(VEHICLE_GETPLATE_RECORD, maps, "POST");
		JSONObject parseObject = JSON.parseObject(net);
		if("200".equals(parseObject.getString("status"))) {
			String string = parseObject.getString("data");
			if(!StringUtils.isBlank(string) && !StringUtils.trim(string).equals("[]")) {
				accessRecords = (List<VehicleAccessRecord>) JSONUtils.stringToCollectionType(string, List.class, VehicleAccessRecord.class);
			}
		}
		return accessRecords;
	}
	
	
	
	
	/**
	 * 获取车辆记录的视频截图
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public static String vehicleVedioPic(String id) throws Exception {
		Map<String, Object> maps = new HashMap<>();
		maps.put("id", id);		
		String net = HttpUtil.net(VEHICLE_GETPLATE_IMG, maps, "POST");
		JSONObject parseObject = JSON.parseObject(net);
		String string = "";
		if("200".equals(parseObject.getString("status"))) {
			string = parseObject.getString("data");
			if(StringUtils.isBlank(string)) {
				string = "";
			}
		}
		return string;
	}
	
	
	
	/**
	 * 统计车辆轨迹
	 * @param uuid
	 * @param carId
	 * @param start
	 * @param end
	 * @return
	 * @throws Exception
	 */
	public static List<VehicleTrailInfo> vehicleTrailInfo(String uuid,String carId,String start,String end) throws Exception{
		List<VehicleTrailInfo> infos = new ArrayList<>();
		Map<String, Object> maps = new HashMap<>();
		maps.put("uuid", uuid);	
		maps.put("carId", carId);
		if(StringUtils.isNotBlank(start)) {
			maps.put("start", start);
		}
		if(StringUtils.isNotBlank(end)) {
			maps.put("end", end);
		}
		String net = HttpUtil.net(VEHICLE_GETPLATE_TRAIL, maps, "POST");
		JSONObject parseObject = JSON.parseObject(net);
		if("200".equals(parseObject.getString("status"))) {
			String string = parseObject.getString("data");
			if(!StringUtils.isBlank(string) && !StringUtils.trim(string).equals("[]")) {
				infos = (List<VehicleTrailInfo>) JSONUtils.stringToCollectionType(string, List.class, VehicleTrailInfo.class);
			}
		}
		return infos;
	}
	
	
	/**
	 * 对象转map
	 * @param accessRecordRequest
	 * @return
	 */
	public static Map<String, Object>accessRecordRequestToMap(VehicleAccessRecordRequest accessRecordRequest) {
		Map<String, Object> map =new HashMap<>();  
	    if (accessRecordRequest != null) {  
	    	if(StringUtils.isNotBlank(accessRecordRequest.getCommunityId()))  {
	    		map.put("communityId", accessRecordRequest.getCommunityId());
	    	}
			if(StringUtils.isNotBlank(accessRecordRequest.getCarId()))  {
				map.put("carId", accessRecordRequest.getCarId());  		
			}
			if(StringUtils.isNotBlank(accessRecordRequest.getCarType()))  {
				map.put("carType", accessRecordRequest.getCarType());
			}
			if(StringUtils.isNotBlank(accessRecordRequest.getDeviceId()))  {
				map.put("deviceId", accessRecordRequest.getDeviceId());
			}
			if(StringUtils.isNotBlank(accessRecordRequest.getEndTime()))  {
				map.put("endTime", accessRecordRequest.getEndTime());
			}
			if(StringUtils.isNotBlank(accessRecordRequest.getInoutType()))  {
				map.put("inoutType", accessRecordRequest.getInoutType());
			}
			if(StringUtils.isNotBlank(accessRecordRequest.getStartTime()))  {
				map.put("startTime", accessRecordRequest.getStartTime());
			}
	    }  
	    return map;
	}
}


