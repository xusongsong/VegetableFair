package com.coorun.factory;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Repository;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.coorun.entity.AppKeyResult;
import com.coorun.entity.ArtemisByNode;
import com.coorun.entity.ArtemisTreeNode;
import com.coorun.entity.ConfigBean;
import com.coorun.entity.VideoInfo;
import com.hikvision.artemis.sdk.ArtemisHttpUtil;
import com.hikvision.artemis.sdk.config.ArtemisConfig;

/**
 * 大华接口调用工厂类
 * @author shine
 *
 */
@Repository(value = "artemisFactory")
public class ArtemisFactory {
	private static String ARTEMIS_PATH;

	static {
		ARTEMIS_PATH = "/artemis";
	}

	/**
	 * 分页获取全部的监控点信息
	 * @param paramMap
	 * @return
	 */
	public List<VideoInfo> findCameraInfoPage(Map<String,String> paramMap) {
		List <VideoInfo> list = new ArrayList<VideoInfo>();
		if (ARTEMIS_PATH.equals("/artemis")) {
			final String url = ARTEMIS_PATH + "/api/common/v1/remoteCameraInfoRestService/findCameraInfoPage";
			JSONObject jsonObject  = getInfo(paramMap, url);
			if(jsonObject == null){
				return list;
			}
			String stateNum = "200";
			//状态值判定
			if(stateNum.equals(jsonObject.getString("code"))){
				JSONArray jsonArr = jsonObject.getJSONArray("data");
				if(jsonArr.size() > 0){
					for(int i = 0; i < jsonArr.size(); i++){
						VideoInfo videoInfo = new VideoInfo();
						String cameraId = ((JSONObject)jsonArr.get(i)).getString("cameraId");
						String indexCode = ((JSONObject)jsonArr.get(i)).getString("indexCode");
						String name = ((JSONObject)jsonArr.get(i)).getString("name");
						String parentIndexCode = ((JSONObject)jsonArr.get(i)).getString("parentIndexCode");
						String cameraType = ((JSONObject)jsonArr.get(i)).getString("cameraType");
						String pixel = ((JSONObject)jsonArr.get(i)).getString("pixel");
						String latitude = ((JSONObject)jsonArr.get(i)).getString("latitude");
						String longitude = ((JSONObject)jsonArr.get(i)).getString("longitude");
						String description = ((JSONObject)jsonArr.get(i)).getString("description");
						String isOnline = ((JSONObject)jsonArr.get(i)).getString("isOnline");
						String controlUnitName = ((JSONObject)jsonArr.get(i)).getString("controlUnitName");
						String decodeTag = ((JSONObject)jsonArr.get(i)).getString("decodeTag");
						String createTime = ((JSONObject)jsonArr.get(i)).getString("createTime");
						String updateTime = ((JSONObject)jsonArr.get(i)).getString("updateTime");
						videoInfo.setCameraId(cameraId);
						videoInfo.setIndexCode(indexCode);
						videoInfo.setName(name);
						videoInfo.setParentIndexCode(parentIndexCode);
						videoInfo.setCameraType(cameraType);
						videoInfo.setPixel(pixel);
						videoInfo.setLatitude(latitude);
						videoInfo.setLongitude(longitude);
						videoInfo.setDescription(description);
						videoInfo.setIsOnline(isOnline);
						videoInfo.setControlUnitName(controlUnitName);
						videoInfo.setDecodeTag(decodeTag);
						videoInfo.setCreateTime(createTime);
						videoInfo.setUpdateTime(updateTime);
						list.add(videoInfo);
					}
				}
			}
		}
		return list;
	}

	/**
	 * 获取监控暗钥信息
	 * @param paramMap
	 * @return
	 */
	public AppKeyResult securityParam(Map<String,String> paramMap) {
		AppKeyResult appKeyResult = new AppKeyResult();
		if (ARTEMIS_PATH.equals("/artemis")) {
			final String url = ARTEMIS_PATH + "/api/artemis/v1/agreementService/securityParam/appKey/" + BaseFactory.getConfig().getArtemisAppKey();
			Map<String, String> path = getRequestUrl(url);
			String reuslt = ArtemisHttpUtil.doGetArtemis(path, null, null, null);
//			JSONObject jsonObject  = getInfo(paramMap, url);
			JSONObject jsonObject  = JSON.parseObject(reuslt);
			
			if(jsonObject == null){
				return appKeyResult;
			}
			String stateNum = "0";
			//状态值判定
			if(stateNum.equals(jsonObject.getString("code"))){
				String appSecret =  jsonObject.getJSONObject("data").getString("appSecret");
				String time =  jsonObject.getJSONObject("data").getString("time");
				String timeSecret = jsonObject.getJSONObject("data").getString("timeSecret");
				appKeyResult.setAppSecret(appSecret);
				appKeyResult.setTime(time);
				appKeyResult.setTimeSecret(timeSecret);
			}
		}
		return appKeyResult;
	}

	/**
	 * 分页获取组织树
	 * @param paramMap
	 * @return
	 */
	public List<ArtemisTreeNode> findControlUnitPage(Map<String,String> paramMap) {
		List <ArtemisTreeNode> list = new ArrayList<ArtemisTreeNode>();
		if (ARTEMIS_PATH.equals("/artemis")) {
			final String url = ARTEMIS_PATH + "/api/common/v1/remoteControlUnitRestService/findControlUnitPage";
			JSONObject jsonObject  = getInfo(paramMap, url);
			if(jsonObject == null){
				return list;
			}
			String stateNum = "200";
			//状态值判定
			if(stateNum.equals(jsonObject.getString("code"))){
				JSONArray jsonArr = jsonObject.getJSONArray("data");
				if(jsonArr.size() > 0){
					for(int i = 0; i < jsonArr.size(); i++){
						ArtemisTreeNode artemisTreeNode = new ArtemisTreeNode();
						String page = jsonObject.getJSONObject("page").getString("page");
						String total = jsonObject.getJSONObject("page").getString("total");
						String createTime = ((JSONObject)jsonArr.get(i)).getString("createTime");
						String indexCode = ((JSONObject)jsonArr.get(i)).getString("indexCode");
						String name = ((JSONObject)jsonArr.get(i)).getString("name");
						String parentIndexCode = ((JSONObject)jsonArr.get(i)).getString("parentIndexCode");
						String parentTree = ((JSONObject)jsonArr.get(i)).getString("parentTree");
						String unitLevel = ((JSONObject)jsonArr.get(i)).getString("unitLevel");
						String unitType = ((JSONObject)jsonArr.get(i)).getString("unitType");
						String updateTime = ((JSONObject)jsonArr.get(i)).getString("updateTime");
						artemisTreeNode.setIndexCode(indexCode);
						artemisTreeNode.setName(name);
						artemisTreeNode.setParentIndexCode(parentIndexCode);
						artemisTreeNode.setParentTree(parentTree);
						artemisTreeNode.setUnitLevel(unitLevel);
						artemisTreeNode.setUnitType(unitType);
						artemisTreeNode.setCreateTime(createTime);
						artemisTreeNode.setUpdateTime(updateTime);
						artemisTreeNode.setPage(page);
						artemisTreeNode.setTotal(total);
						list.add(artemisTreeNode);
					}
				}
			}
		}
		return list;
	}

	/**
	 * 根据组织编号分页获取监控点信息
	 * @param paramMap
	 * @return
	 */
	public List<ArtemisByNode> findCameraInfoPageByTreeNode(Map<String,String> paramMap) {
		List <ArtemisByNode> list = new ArrayList<ArtemisByNode>();
		if (ARTEMIS_PATH.equals("/artemis")) {
			final String url = ARTEMIS_PATH + "/api/common/v1/remoteControlUnitRestService/findCameraInfoPageByTreeNode";
			JSONObject jsonObject  = getInfo(paramMap, url);
			if(jsonObject == null){
				return list;
			}
			String stateNum = "200";
			//状态值判定
			if(stateNum.equals(jsonObject.getString("code"))){
				JSONArray jsonArr = jsonObject.getJSONArray("data");
				if(jsonArr.size() > 0){
					for(int i = 0; i < jsonArr.size(); i++){
						ArtemisByNode artemisByNode = new ArtemisByNode();
						String page = jsonObject.getJSONObject("page").getString("page");
						String total = jsonObject.getJSONObject("page").getString("total");
						String cameraId = ((JSONObject)jsonArr.get(i)).getString("cameraId");
						String indexCode = ((JSONObject)jsonArr.get(i)).getString("indexCode");
						String name = ((JSONObject)jsonArr.get(i)).getString("name");
						String parentIndexCode = ((JSONObject)jsonArr.get(i)).getString("parentIndexCode");
						String cameraType = ((JSONObject)jsonArr.get(i)).getString("cameraType");
						String pixel = ((JSONObject)jsonArr.get(i)).getString("pixel");
						String latitude = ((JSONObject)jsonArr.get(i)).getString("latitude");
						String longitude = ((JSONObject)jsonArr.get(i)).getString("longitude");
						String description = ((JSONObject)jsonArr.get(i)).getString("description");
						String isOnline = ((JSONObject)jsonArr.get(i)).getString("isOnline");
						String decodeTag = ((JSONObject)jsonArr.get(i)).getString("decodetag");
						String createTime = ((JSONObject)jsonArr.get(i)).getString("createTime");
						String updateTime = ((JSONObject)jsonArr.get(i)).getString("updateTime");
						artemisByNode.setCameraId(cameraId);
						artemisByNode.setIndexCode(indexCode);
						artemisByNode.setName(name);
						artemisByNode.setParentIndexCode(parentIndexCode);
						artemisByNode.setCameraType(cameraType);
						artemisByNode.setPixel(pixel);
						artemisByNode.setLatitude(latitude);
						artemisByNode.setLongitude(longitude);
						artemisByNode.setDescription(description);
						artemisByNode.setIsOnline(isOnline);
						artemisByNode.setDecodetag(decodeTag);
						artemisByNode.setCreateTime(createTime);
						artemisByNode.setUpdateTime(updateTime);
						artemisByNode.setPage(page);
						artemisByNode.setTotal(total);
						list.add(artemisByNode);
					}
				}
			}
		}
		return list;
	}

	/**
	 * 根据监控点编号获取RTSP流地址
	 * @param indexCode 设备编号
	 * @return rtsp地址
	 */
	public String queryRTSPUrl(final String indexCode) {
		//获取配置文件信息
//		ConfigBean config = BaseFactory.getConfig();
//		ArtemisConfig.host =config.getArtemisHost();
//		/*网关服务器ip端口*/
//		ArtemisConfig.appKey =config.getArtemisAppKey();
//		/*秘钥appkey*/
//		ArtemisConfig.appSecret =config.getArtemisAppSecret();
//
//		Map<String, String> path = new HashMap<String, String>(2){
//			{
//				put("https://", ARTEMIS_PATH + "/api/vms/v1/rtsp/basic/" + indexCode);
//			}
//		};

		Map<String, String> path = getRequestUrl(ARTEMIS_PATH + "/api/vms/v1/rtsp/basic/" + indexCode);
		String reuslt = ArtemisHttpUtil.doGetArtemis(path, null, null, null);

		JSONObject jsonObject = JSONObject.parseObject(reuslt);
		if (null != jsonObject) {
			return jsonObject.getString("data");
		}
		return null;
	}

	/**
	 * 获取第三方服务请求数据
	 * @param paramMap
	 * @param url
	 * @return
	 */
	public static JSONObject getInfo(Map<String,String> paramMap,final String url){
//		//获取配置文件信息
//		ConfigBean config = BaseFactory.getConfig();
//		ArtemisConfig.host =config.getArtemisHost();
//		/*网关服务器ip端口*/
//		ArtemisConfig.appKey =config.getArtemisAppKey();
//		/*秘钥appkey*/
//		ArtemisConfig.appSecret =config.getArtemisAppSecret();
//		/*秘钥appSecret */
//		Map<String, String> path = new HashMap<String, String>(2){
//			{
//				put("https://", url);
//			}
//		};

//		直接请求海康接口
//		String   result   =   ArtemisHttpUtil.doGetArtemis(getRequestUrl(url), paramMap, null, null);
		
//		对返回数据进行缓存
		String result = getResultFromCache(getRequestUrl(url), paramMap);
		return JSON.parseObject(result);
	}

	/**
	 * 获取请求地址
	 * 
	 * @param url 请求地址
	 * @return 组装后请求地址
	 */
	private static Map<String, String> getRequestUrl(final String url) {
		//获取配置文件信息
		ConfigBean config = BaseFactory.getConfig();
		ArtemisConfig.host =config.getArtemisHost();
		/*网关服务器ip端口*/
		ArtemisConfig.appKey =config.getArtemisAppKey();
		/*秘钥appkey*/
		ArtemisConfig.appSecret =config.getArtemisAppSecret();
		/*秘钥appSecret */
		Map<String, String> path = new HashMap<String, String>(2){
			{
				put("https://", url);
			}
		};
		
		return path;
	}
	
	private static final Logger LOG = Logger.getLogger(ArtemisFactory.class);
	/**缓存请求数据*/
	private static final ConcurrentMap<List, String> HIK_RESPONSE = new ConcurrentHashMap<>();
	/**
	 * 获取数据
	 *
	 * @param path 请求地址
	 * @param paramMap 请求参数
	 * @return 请求结果
	 */
	public static String getResultFromCache(Map<String, String> path, Map<String, String> paramMap) {
		List<Map<String, String>> req = new ArrayList<>();
		req.add(path);
		req.add(paramMap);

		if (!HIK_RESPONSE.containsKey(req)) {
			String result = ArtemisHttpUtil.doGetArtemis(path, paramMap, null, null);
			HIK_RESPONSE.putIfAbsent(req, result);
			LOG.debug("获取数据，并放进缓存, path: " + path + " paramMap: " + result);
			return result;
		} else {
			String result = HIK_RESPONSE.get(req);
			LOG.debug("从缓存直接获取" + path + " paramMap" + result);
			return result;
		}
	}
}
