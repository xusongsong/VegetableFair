package com.coorun.factory;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Repository;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.coorun.entity.ConfigBean;
import com.coorun.entity.Coverage;
import com.coorun.entity.Layer;
import com.coorun.entity.LayerAttribute;
import com.coorun.util.ServerRequest;

/**
 * 图层工厂类,用于获取Server图层数据并对外返回图层Map集合
 * 
 * @author cd
 * @createDate 2017-09-20
 */
@Repository(value = "layerFactory")
public class LayerFactory {
	
	Logger logger = Logger.getLogger(LayerFactory.class);
	Layer layer = null;
	//图层默认加载
	private static Map<String, Object> layerCache = new ConcurrentHashMap<String, Object>();  
	//城市要素信息默认加载
	private static Map<String, Object> cityfactorCache = new ConcurrentHashMap<String, Object>();
	//城市编码信息默认加载
	private static Map<String, Object> districtCache = new ConcurrentHashMap<String, Object>(); 
	
	/**
	 * 创建模型LayerMap对象
	 * 
	 * @param jsonObject,接收结果集对象
	 * @param type,访问的服务类型
	 * @return 返回图层的Map集合
	 */
	private List<Map<String, List<Layer>>> createLayer(JSONObject jsonObject, String type) {
		Map<String, List<Layer>> map1 = new HashMap<String, List<Layer>>();
		Map<String, List<Layer>> map2 = new HashMap<String, List<Layer>>();
		Map<String, List<Layer>> map3 = new HashMap<String, List<Layer>>();
		Map<String, List<Layer>> map4 = new HashMap<String, List<Layer>>();
		List<Map<String, List<Layer>>> mapList = new ArrayList<Map<String, List<Layer>>>();
		String c3sType = "c3s";
		String wrlType = "wrl";
		if(c3sType.equals(type)){
			/**c3s模型加载**/
			
		}else if(wrlType.equals(type)){
			/**wrl模型加载**/
			//把json格式的数据转换成数组
			JSONArray jsonArray = jsonObject.getJSONObject("results").getJSONArray("serviceInfo");
			String areacode = null;
			for(int i=0;i<jsonArray.size();i++){
				List<Layer> map1List = new ArrayList<Layer>();
				layer = new Layer();
				areacode = ((JSONObject)jsonArray.get(i)).getString("areacode");
				layer.setLayerID(((JSONObject)jsonArray.get(i)).getString("areacode"));
				layer.setLayerName(((JSONObject)jsonArray.get(i)).getString("name"));
				layer.setLevel("1");
				map1List.add(layer);
				/**取到第二层图层对象**/
				JSONArray map1Array = ((JSONObject)jsonArray.get(i)).getJSONArray("resources");
				List<Layer> map2List = new ArrayList<Layer>();
				for(int j=0;j<map1Array.size();j++){
					layer = new Layer();
					layer.setLayerID((((JSONObject)map1Array.get(j)).getString("areacode") + "_" +  ((JSONObject)map1Array.get(j)).getString("type")));
					layer.setLayerName(((JSONObject)map1Array.get(j)).getString("sname"));
					layer.setLayerType(((JSONObject)map1Array.get(j)).getString("type"));
					layer.setParentID(((JSONObject)map1Array.get(j)).getString("areacode"));
					layer.setLevel("2");
					map2List.add(layer);
					/**取到第三层图层对象**/
					JSONArray map2Array = ((JSONObject)map1Array.get(j)).getJSONArray("sheetDesignations");
					List<Layer> map3List = new ArrayList<Layer>();
					for(int k=0;k<map2Array.size();k++){
						layer = new Layer();
						layer.setLayerID(((JSONObject)map1Array.get(j)).getString("areacode") + "_" + ((JSONObject)map1Array.get(j)).getString("type") + "_" + map2Array.get(k).toString());
						layer.setCityID(((JSONObject)map1Array.get(j)).getString("areacode"));
						layer.setFeatureID(map2Array.get(k).toString());
						layer.setParentID((((JSONObject)map1Array.get(j)).getString("areacode") + "_" +  ((JSONObject)map1Array.get(j)).getString("type")));
						layer.setLayerName(map2Array.get(k).toString());
						layer.setLayerType("wrl");
						layer.setPath(((JSONObject)map1Array.get(j)).getString("url"));
						layer.setLevel("3");
						map3List.add(layer);
					}
					map3.put(areacode, map3List);
					map2List.addAll(map3List);
				}
				map2.put(areacode, map2List);
				map1List.addAll(map2List);
				map1.put(areacode, map1List);
			}
			mapList.add(map1);
			mapList.add(map2);
			mapList.add(map3);
//			System.out.println(map1);
//			System.out.println(map2);
//			System.out.println(map3);
		}
		return mapList;
	}
	
	/**
	 * 通过url获取server模型结果集
	 * 
	 * @param areacode,区域编码
	 * @param serverType,访问的服务类型
	 * @return 返回图层的Map集合
	 */
	public static List<Map<String, List<Layer>>> getLayersList(String areacode, String serverType) {
		
		/**通过配置文件拼接第三方服务路径**/
		ConfigBean config = BaseFactory.getConfig();
		String url = "http://" + config.getServerIP() + ":" + config.getServerPort();
		LayerFactory layerFactory = new LayerFactory();
		JSONObject jsonObject = null;
		List<Map<String, List<Layer>>> mapList = null;
		String c3sType = "c3s";
		String wrlType = "wrl";
		if(layerCache.containsKey((areacode + serverType))){
			List<Map<String,List<Layer>>> mapListCache = (List<Map<String, List<Layer>>>)layerCache.get((areacode + serverType));
			return mapListCache;
		}else{
			if(c3sType.equals(serverType)){
				/**解析c3s服务**/
				String type = "/coo-server/services/getServiceLists?";
				String callback = "callback=back&";
				String data = null;
				try {
					data = "data={'code':'" + URLEncoder.encode(areacode, "UTF8") + "'}";
				} catch (UnsupportedEncodingException e) {
					e.printStackTrace();
				}
				//拼接第三方服务请求路径
				String serverUrl = url + type + callback + data;
				String jsonData = ServerRequest.getResultByURL(serverUrl);
				//字符串截取
				String string = jsonData.substring(5,jsonData.length()-1);	
				//把字符串转换成json格式
				jsonObject = JSON.parseObject(string);
				mapList = layerFactory.createLayer(jsonObject, "c3s");
			}else if(wrlType.equals(serverType)){
				/**解析wrl服务**/
				String type = "/coo-server/model/getModeList?";
				String callback = "callback=back&";
				String data = null;
				try {
					data = "data={'areacode':'" + URLEncoder.encode(areacode, "UTF8") + "'}";
				} catch (UnsupportedEncodingException e) {
					e.printStackTrace();
				}
				//拼接第三方服务请求路径
				String serverUrl = url + type + callback + data;
				String jsonData = ServerRequest.getResultByURL(serverUrl);
				String string = jsonData.substring(5,jsonData.length()-1);
				//把字符串转换成json格式
				jsonObject = JSON.parseObject(string);
				mapList = layerFactory.createLayer(jsonObject, "wrl");
			}
			layerCache.put((areacode + serverType), mapList);
			return mapList;
		}
		
	}
	
	/**
	 * 获取模型LayerMap对象
	 * 
	 * @param areacode,区域编码
	 * @param serverType,访问的服务类型
	 * @return 返回图层的Map集合
	 */
	public List<Map<String,List<Layer>>> createLayerMap(String areacode, String serverType) {
		
		List<Map<String, List<Layer>>> mapList = getLayersList(areacode, serverType);
		return mapList;
		
	}
	
	/**
	 * 按级别获取模型LayerMap对象
	 * 
	 * @param areacode,区域编码
	 * @param serverType,访问的服务类型
	 * @param rank,结果集层级
	 * @return 返回图层的Map集合
	 */
	public Map<String,List<Layer>> createLayerMap(String areacode, String serverType, int rank) {
		
		List<Map<String, List<Layer>>> mapList = getLayersList(areacode, serverType);
		Map<String, List<Layer>> newMapList = mapList.get(rank - 1);
		return newMapList;
		
	}
	
	/**
	 * 创建倾斜摄影LayerMap对象
	 * 
	 * @param jsonObject,接收的结果集对象
	 * @param type,访问的服务类型
	 * @return 返回图层集合
	 */
	private List<Layer> createOSGBLayer(JSONObject jsonObject, String type) {
		
		List<Layer> osgbList = null;
		String osgbType = "osgb";
		if(osgbType.equals(type)){
			//把json格式的数据转换成数组
			JSONArray jsonArray = jsonObject.getJSONObject("results").getJSONArray("resources");
			String areacode = null;
			for(int i=0;i<jsonArray.size();i++){
				osgbList = new ArrayList<Layer>();
				areacode = ((JSONObject)jsonArray.get(i)).getString("areacode");
				JSONArray servisesArray = ((JSONObject) jsonArray.get(i)).getJSONObject("servises").getJSONArray("OSGB");
				for(int j=0;j<servisesArray.size();j++){
					Layer layer = new Layer();
					layer.setLayerID(areacode + "#@" + "osgb" + "#@" + j);
					layer.setCityID(areacode);
					layer.setFeatureID(((JSONObject)servisesArray.get(j)).getString("sname"));
					layer.setParentID(areacode);
					layer.setLayerName(((JSONObject)servisesArray.get(j)).getString("sname"));
					layer.setLayerType("osgb");
					layer.setPath(((JSONObject)servisesArray.get(j)).getString("sname"));
					layer.setLevel("1");
					osgbList.add(layer);
				}
			}
		}
		return osgbList;
		
	}
	
	/**
	 * 通过url获取server倾斜摄影结果集
	 * 
	 * @param areacode,区域编码
	 * @param serverType,访问的服务类型
	 * @return 返回图层集合
	 */
	public static List<Layer> getOSGBLayersList(String areacode, String serverType) {
			
		/**通过配置文件拼接第三方服务路径**/
		ConfigBean config = BaseFactory.getConfig();
		String url = "http://" + config.getServerIP() + ":" + config.getServerPort();
		
		LayerFactory layerFactory = new LayerFactory();
		JSONObject jsonObject = null;
		List<Layer> mapList = null;
		String osgbType = "osgb";
		if(osgbType.equals(serverType)){
			String type = "/coo-server/services/getServiceLists?";
			String callback = "callback=back&";
			String data = null;
			try {
				data = "data={'code':'" + URLEncoder.encode(areacode, "UTF8") + "'}";
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
			//拼接第三方服务请求路径
			String serverUrl = url + type + callback + data;
			String jsonData = ServerRequest.getResultByURL(serverUrl);
			String string = jsonData.substring(5,jsonData.length()-1);
			//把字符串转换成json格式
			jsonObject = JSON.parseObject(string);
			mapList = layerFactory.createOSGBLayer(jsonObject, "osgb");
		}
		return mapList;
		
	}
	
	/**
	 * 获取倾斜摄影LayerMap对象
	 * 
	 * @param areacode,区域编码
	 * @param serverType,访问的服务类型
	 * @return 返回图层集合
	 */
	public List<Layer> createOSGBLayerMap(String areacode, String serverType) {
		
		List<Layer> mapList = getOSGBLayersList(areacode, serverType);
		return mapList;
		
	}
	
	/**
	 * 获取倾斜摄影和bim服务列表(老接口)
	 * 
	 * @param type,服务类型,osgb或bim
	 * @return 返回图层集合
	 */
	public JSONObject createServerListOld(String serverType) {
		
		//通过配置文件拼接第三方服务路径
		ConfigBean config = BaseFactory.getConfig();
		String url = "http://" + config.getServerIP() + ":" + config.getServerPort();
		
		JSONObject jsonObject = null;
		
		String type = "/coo-server/fileService/serviceInfo?";
		String callback = "callback=callback&";
		String data = null;
		try {
			data = "data={'serviceType':'" + URLEncoder.encode(serverType, "UTF8") + "'}";
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		// 拼接第三方服务请求路径
		String serverUrl = url + type + callback + data;
		String jsonData = ServerRequest.getResultByURL(serverUrl);
		//字符串截取
		String string = jsonData.substring(9,jsonData.length()-1);	
		//把字符串转换成json格式
		jsonObject = JSON.parseObject(string);
		return jsonObject;
		
	}
	
	/**
	 * 通过url获取server模型结果集(新接口)
	 * 
	 * @param areacode,区域编码
	 * @param sname,访问的服务名称
	 * @param type,访问的服务类型
	 * @return 返回图层的Map集合
	 */
	public static List<Map<String, List<Layer>>> getLayersListNew(String sname, String type, String dataType) {
		
		/**通过配置文件拼接第三方服务路径**/
		ConfigBean config = BaseFactory.getConfig();
		String url = "http://" + config.getServerIP() + ":" + config.getServerPort();
		LayerFactory layerFactory = new LayerFactory();
		JSONObject jsonObject = null;
		List<Map<String, List<Layer>>> mapList = null;
		if(layerCache.containsKey((sname + type))){
			List<Map<String,List<Layer>>> mapListCache = (List<Map<String, List<Layer>>>)layerCache.get((sname + type));
			return mapListCache;
		}else{
			/**解析数据服务**/
			String urlType = "/coo-server/layerOption/queryLayer?";
			String data = null;
			try {
				data = "data={'sname':'" + URLEncoder.encode(sname, "UTF8") + "','type':'" + URLEncoder.encode(type, "UTF8") + "'}";
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
			//拼接第三方服务请求路径
			String serverUrl = url + urlType + data;
			String jsonData = ServerRequest.getResultByURL(serverUrl);
			//字符串截取
			int firstIndex = jsonData.indexOf("(");
			int lastIndex = jsonData.lastIndexOf(")");
			if ((firstIndex == -1) || (lastIndex == -1)) {
				return null;
			}
			String string = jsonData.substring((firstIndex + 1), lastIndex);	
			//把字符串转换成json格式
			jsonObject = JSON.parseObject(string);
			mapList = layerFactory.createLayerNew(jsonObject, dataType);
			layerCache.put((sname + type), mapList);
			return mapList;
		}
		
	}
	
	/**
	 * 创建模型LayerMap对象
	 * 
	 * @param jsonObject,接收结果集对象
	 * @return 返回图层的Map集合
	 */
	private List<Map<String, List<Layer>>> createLayerNew(JSONObject jsonObject, String dataType) {
		Map<String, List<Layer>> map1 = new HashMap<String, List<Layer>>();
		Map<String, List<Layer>> map2 = new HashMap<String, List<Layer>>();
		Map<String, List<Layer>> map3 = new HashMap<String, List<Layer>>();
		Map<String, List<Layer>> map4 = new HashMap<String, List<Layer>>();
		List<Map<String, List<Layer>>> mapList = new ArrayList<Map<String, List<Layer>>>();
		//把json格式的数据转换成数组
//		JSONArray jsonArray = jsonObject.getJSONObject("results").getJSONArray("dataList");
		JSONArray jsonArray = jsonObject.getJSONArray("results");
		//重组后台结果集
		LayerFactory layerFactory = new LayerFactory();
		JSONArray jsonArrayNew = layerFactory.getArrayByParKey("0", jsonArray);
		JSONArray dataAaary = new JSONArray();
		JSONObject level1JSON = new JSONObject();
		JSONObject level2JSON = new JSONObject();
		for(int i=0;i<jsonArrayNew.size();i++){
			/**组织第一层数据**/
			level1JSON.put("data", ((JSONObject)jsonArrayNew.get(i)).getJSONObject("data"));
			JSONArray jsonArrayForType = ((JSONObject)jsonArrayNew.get(i)).getJSONArray("child");
			/**组织第二层数据**/
			level1JSON.put("child", level2JSON);
			for(int j=0;j<jsonArrayForType.size();j++){
				JSONArray jsonArrayForArea = ((JSONObject)jsonArrayForType.get(j)).getJSONArray("child");
				/**组织第三层数据**/
				for(int k=0;k<jsonArrayForArea.size();k++){
					String path = ((JSONObject)jsonArrayForArea.get(k)).getJSONObject("data").getString("path");
					String[] arr = path.split("/");
					List<JSONObject> list = new ArrayList<JSONObject>();
					if(level1JSON.getJSONObject("child").containsKey(arr[3])){
						((JSONObject)jsonArrayForArea.get(k)).getJSONObject("data").put("childs", ((JSONObject)jsonArrayForArea.get(k)).getJSONArray("child"));
						((List<JSONObject>)level1JSON.getJSONObject("child").get(arr[3])).add(((JSONObject)jsonArrayForArea.get(k)).getJSONObject("data"));
					}else{
						((JSONObject)jsonArrayForArea.get(k)).getJSONObject("data").put("childs", ((JSONObject)jsonArrayForArea.get(k)).getJSONArray("child"));
						list.add(((JSONObject)jsonArrayForArea.get(k)).getJSONObject("data"));
						level1JSON.getJSONObject("child").put(arr[3], list);
					}
				}
			}
			dataAaary.add(level1JSON);
		}
		String areacode = null;
		for(int i=0;i<dataAaary.size();i++){
			/**取到最上层图层对象 - 城市编码(如:330100对应杭州市)**/
			List<Layer> map0List = new ArrayList<Layer>();
			layer = new Layer();
			JSONObject dataLevle1 = ((JSONObject)dataAaary.get(i)).getJSONObject("data");
			areacode = dataLevle1.getString("name");
			layer.setLayerID(dataLevle1.getString("name"));
			String layerCityName = ((Map<String,String>)districtCache.get("CachingCompletion")).get(areacode);
			layer.setLayerName(layerCityName.split("_")[0]);
			layer.setLayerType(dataLevle1.getString("name"));
			layer.setLevel("0");
			map0List.add(layer);
			/**取到第一层图层对象 - 城区编码(如:330106对应西湖区)**/
			JSONObject map1Array = ((JSONObject)dataAaary.get(i)).getJSONObject("child");
			List<Layer> map1List = new ArrayList<Layer>();
			Set<String> setForArea = map1Array.keySet();
			List<Layer> map2List = new ArrayList<Layer>();
			List<Layer> map3List = new ArrayList<Layer>();
            for (String keyForArea : setForArea) {
                layer = new Layer();
				layer.setLayerID(areacode + "_" + keyForArea);
				String layerAreaName = ((Map<String,String>)districtCache.get("CachingCompletion")).get(keyForArea);
//				System.out.println(layerAreaName);
				layer.setLayerName(layerAreaName.split("_")[0]);
				layer.setLayerType(keyForArea);
				layer.setParentID(areacode);
				layer.setLevel("1");
				map1List.add(layer);
				/**取到第二层图层对象 - 数据类型(如:T010101对应 交通-道路-公路)**/
				ArrayList<JSONObject> listType = (ArrayList<JSONObject>) map1Array.get(keyForArea);
				for(int j=0;j<listType.size();j++){
					String path = (String)listType.get(j).get("path");
					String[] arr = path.split("/");
					layer = new Layer();
					layer.setLayerID(areacode + "_" + (arr[3] + "_" + arr[2]));
					String layerTypeName = ((Map<String,String>)cityfactorCache.get("CachingCompletion")).get(arr[2]);
					layer.setLayerName(layerTypeName.split("_")[0]);
					layer.setLayerType(arr[2]);
					layer.setParentID(areacode + "_" + arr[3]);
					layer.setLevel("2");
					map2List.add(layer);
					/**取到第三层图层对象 - 数据名(如:401061代表图幅号未40106类型为地形的数据)**/
					JSONArray map2Array = (JSONArray)listType.get(j).get("childs");
					for(int k=0;k<map2Array.size();k++){
						layer = new Layer();
						JSONObject jsonOBJ = ((JSONObject)map2Array.get(k)).getJSONObject("data");
						String pathForUrl = (String)jsonOBJ.get("path");
						String ename = (String)jsonOBJ.get("ename");
						int firstIndex = pathForUrl.lastIndexOf(ename) + ename.length() + 1;
						String loadModelType = "";
						if(dataType == "c3s"){
							loadModelType = "0.c3s.zip";
						}else if(dataType == "wrl"){
							loadModelType = "sceneName.L000_000.wrl.zip";
						}
						int lastIndex =  pathForUrl.lastIndexOf(loadModelType) - 1;
						String pathForData = pathForUrl.substring(firstIndex, lastIndex);
						String[] pathForDataType = pathForData.split("/");
						layer.setLayerID(pathForDataType[0] + "_" + pathForDataType[2] + "_" + pathForDataType[1] + "_" + pathForDataType[3]);
						layer.setCityID(pathForDataType[0]);
						layer.setFeatureID(pathForDataType[3]);
						layer.setParentID(areacode + "_" + pathForDataType[2] + "_" + pathForDataType[1]);
						layer.setLayerName(pathForDataType[3]);
						layer.setLayerType(pathForDataType[1]);
						layer.setPath(pathForUrl);
						layer.setLevel("3");
						map3List.add(layer);
					}
				}
            }
            map4.put(areacode, map3List);
            map2List.addAll(map3List);
            map3.put(areacode, map2List);
            map1List.addAll(map2List);
			map2.put(areacode, map1List);
			map0List.addAll(map1List);
			map1.put(areacode, map0List);
		}
		mapList.add(map1);
		mapList.add(map2);
		mapList.add(map3);
		mapList.add(map4);
		return mapList;
	}
	
	/**
	 * 递归重组返回的结果集
	 * 
	 * @param parentKey,父级key
	 * @param jsonObject,结果集对象
	 * @return 返回新的结果集数组
	 */
	private JSONArray getArrayByParKey(String parentKey, JSONArray jsonArray){
		JSONArray childArray = new JSONArray();
		for(int i=0;i<jsonArray.size();i++){
			if(parentKey.equals(((JSONObject)jsonArray.get(i)).getString("parentKey"))){
				JSONArray child = getArrayByParKey(((JSONObject)jsonArray.get(i)).getString("key"), jsonArray);
				JSONObject json = new JSONObject();
				json.put("data", ((JSONObject)jsonArray.get(i)));
				if(child.size()>0){
					json.put("child", child);
				}
				childArray.add(json);
			}
		}
		return childArray;
	}
	/************************************************************************************************************/
	/**
	 * 加载OSGB,BIM,terrain,image
	 * 
	 * @param cityCode,城市编码
	 * @param serverStype,服务类型
	 * @param serverSname,服务名称
	 * @return List<Coverage>,封装对象
	 */
	public List<Coverage> loadCoverage(String cityCode, String serverStype, String serverSname) {
		/** 通过配置文件拼接第三方服务路径 **/
		ConfigBean config = BaseFactory.getConfig();
		if (config == null) {
			logger.error("config为空");
			return null;
		}
		// 拼接路径
		String url = "http://" + config.getServerIP() + ":" + config.getServerPort();
		String type = "/coo-server/layerOption/queryLayer?";
		try {
			serverSname = URLEncoder.encode(serverSname, "utf-8");
		} catch (Exception e) {
			logger.error("编码格式转换异常");
			e.printStackTrace();
		}
		String data = "data={'cityCode':'" + cityCode + "','stype':'" + serverStype + "','sname':'" + serverSname + "'}";
		String serverUrl = url + type + data;
		/** 获取第三方服务的json格式数据 **/
		JSONObject json = BaseFactory.getJSONObj4Server(serverUrl);
		// 判定状态值
		String stateNum = "200";
		String state = json.getString("retcode");
		/** 解析封装 **/
		List<Coverage> list = new ArrayList<Coverage>();
		if (stateNum.equals(state)) {
			JSONArray jsonArray = json.getJSONArray("results");
			for (int i = 0; i < jsonArray.size(); i++) {
				Coverage coverage = new Coverage();
				coverage.setId(((JSONObject) jsonArray.get(i)).getString("id"));
				coverage.setIsService(((JSONObject) jsonArray.get(i)).getString("isService"));
				coverage.setKey(((JSONObject) jsonArray.get(i)).getString("key"));
				coverage.setName((((JSONObject) jsonArray.get(i)).getString("name")));
				coverage.setParentKey(((JSONObject) jsonArray.get(i)).getString("parentKey"));
				coverage.setPath(((JSONObject) jsonArray.get(i)).getString("path"));
				coverage.setSname(((JSONObject) jsonArray.get(i)).getString("sname"));
				coverage.setStatus(((JSONObject) jsonArray.get(i)).getString("status"));
				coverage.setStype(((JSONObject) jsonArray.get(i)).getString("stype"));
				coverage.setUserName(((JSONObject) jsonArray.get(i)).getString("userName"));
				JSONObject jsonAttribute = ((JSONObject) jsonArray.get(i)).getJSONObject("attribute");
				// 图层属性
				if(jsonAttribute != null){
					LayerAttribute attribute = new LayerAttribute();
					/** DOM/DEM **/
					attribute.setYear(jsonAttribute.getString("year"));
					attribute.setName(jsonAttribute.getString("name"));
					attribute.setEname(jsonAttribute.getString("ename"));
					attribute.setUrl(jsonAttribute.getString("url"));
					attribute.setProduction(jsonAttribute.getString("production"));
					attribute.setArea(jsonAttribute.getString("area"));
					attribute.setPrecision(jsonAttribute.getString("precision"));
					attribute.setMonth(jsonAttribute.getString("month"));
					
					attribute.setMaxX(jsonAttribute.getString("maxx"));
					attribute.setMinX(jsonAttribute.getString("minx"));
					attribute.setMaxY(jsonAttribute.getString("maxy"));
					attribute.setMinY(jsonAttribute.getString("miny"));
					attribute.setMinLevel(jsonAttribute.getString("minLevel"));
					attribute.setMaxLevel(jsonAttribute.getString("maxLevel"));
					/** OSGB/BIM **/
					attribute.setSrs(jsonAttribute.getString("srs"));
					attribute.setOriginPoint(jsonAttribute.getString("originPoint"));
					attribute.setLongitude(jsonAttribute.getString("longitude"));
					attribute.setLatitude(jsonAttribute.getString("latitude"));
					attribute.setElevation(jsonAttribute.getString("elevation"));
					attribute.setAzimuth(jsonAttribute.getString("azimuth"));
					attribute.setPitch(jsonAttribute.getString("pitch"));
					attribute.setRange(jsonAttribute.getString("range"));
					coverage.setAttribute(attribute);
				}
				list.add(coverage);
			}
		} else {
			logger.error(json.getString("msg"));
		}
		return list;
	}
	/************************************************************************************************************/
	/**
	 * 获取模型LayerMap对象
	 * 
	 * @param areacode,区域编码
	 * @param serverType,访问的服务类型
	 * @return 返回图层的Map集合
	 */
	public List<Map<String,List<Layer>>> createLayerMapNew(String sname, String type, String dataType) {
		
		List<Map<String, List<Layer>>> mapList = getLayersListNew(sname, type, dataType);
		return mapList;
		
	}
	
	/**
	 * 按级别获取模型LayerMap对象
	 * 
	 * @param areacode,区域编码
	 * @param serverType,访问的服务类型
	 * @param rank,结果集层级
	 * @return 返回图层的Map集合
	 */
	public Map<String,List<Layer>> createLayerMapNew(String sname, String type, String dataType, int rank) {
		
		List<Map<String, List<Layer>>> mapList = getLayersListNew(sname, type, dataType);
		Map<String, List<Layer>> newMapList = mapList.get(rank);
		return newMapList;
		
	}
	
	/**
	 * 获取所有类型编码信息
	 * 
	 * @return 返回类型编码信息的Map集合
	 */
	public Map<String,String> getCityFactor() {
		
		if(cityfactorCache.containsKey("CachingCompletion")){
			Map<String,String> cityFactorCache = (Map<String, String>)cityfactorCache.get("CachingCompletion");
			return cityFactorCache;
		}
		Map<String,String> cityFactor = new HashMap<String, String>();
		/**通过配置文件拼接第三方服务路径**/
		ConfigBean config = BaseFactory.getConfig();
		String url = "http://" + config.getServerIP() + ":" + config.getServerPort();
		JSONObject jsonObject = null;
		/**解析数据服务**/
		String serverUrl = url + "/coo-server/commonOption/getCityfactor";
		//拼接第三方服务请求路径
		String jsonData = ServerRequest.getResultByURL(serverUrl);
		//字符串截取
		int firstIndex = jsonData.indexOf("(");
		int lastIndex = jsonData.lastIndexOf(")");
		if ((firstIndex == -1) || (lastIndex == -1)) {
			return null;
		}
		String string = jsonData.substring((firstIndex + 1), lastIndex);
		//把字符串转换成json格式
		jsonObject = JSON.parseObject(string);
		JSONArray array = jsonObject.getJSONArray("results");
		for(int i=0;i<array.size();i++){
			String key = ((JSONObject)array.get(i)).getString("code");
			String value = ((JSONObject)array.get(i)).getString("layerName1") + "_" + ((JSONObject)array.get(i)).getString("layerName2") + "_" + ((JSONObject)array.get(i)).getString("layerName3");
			cityFactor.put(key, value);
		}
		cityfactorCache.put("CachingCompletion", cityFactor);
		return cityFactor;
		
	}
	
	/**
	 * 获取所有城市编码信息
	 * 
	 * @return 返回城市编码信息的Map集合
	 */
	public Map<String,String> getDistrict() {
		
		if(districtCache.containsKey("CachingCompletion")){
			Map<String,String> cityDistrictCache = (Map<String, String>)districtCache.get("CachingCompletion");
			return cityDistrictCache;
		}
		Map<String,String> cityDistrict = new HashMap<String, String>();
		/**通过配置文件拼接第三方服务路径**/
		ConfigBean config = BaseFactory.getConfig();
		String url = "http://" + config.getServerIP() + ":" + config.getServerPort();
		JSONObject jsonObject = null;
		/**解析数据服务**/
		String serverUrl = url + "/coo-server/commonOption/getDistrict";
		//拼接第三方服务请求路径
		String jsonData = ServerRequest.getResultByURL(serverUrl);
		//字符串截取
		int firstIndex = jsonData.indexOf("(");
		int lastIndex = jsonData.lastIndexOf(")");
		if ((firstIndex == -1) || (lastIndex == -1)) {
			return null;
		}
		String string = jsonData.substring((firstIndex + 1), lastIndex);
		//把字符串转换成json格式
		jsonObject = JSON.parseObject(string);
		JSONArray array = jsonObject.getJSONArray("results");
		for(int i=0;i<array.size();i++){
			String key = ((JSONObject)array.get(i)).getString("areaCode");
			String value = ((JSONObject)array.get(i)).getString("areaName") + "_" + ((JSONObject)array.get(i)).getString("x") + "_" + ((JSONObject)array.get(i)).getString("y");
			cityDistrict.put(key, value);
		}
		districtCache.put("CachingCompletion", cityDistrict);
		return cityDistrict;
	}
	
	/**
	 * 获取该用户ID下的所有服务名
	 * 
	 * @param userID,用户ID
	 * @param serverSname,服务名
	 * @param serverStype,服务类型
	 * @return 所有服务名
	 */
	public List<String> getSnameByUserID(String userID,  String serverSname, String serverStype) {
		/** 通过配置文件拼接第三方服务路径 **/
		ConfigBean config = BaseFactory.getConfig();
		if (config == null) {
			logger.error("config为空");
			return null;
		}
		// 拼接路径
		String url = "http://" + config.getServerIP() + ":" + config.getServerPort();
		String type = "/coo-server/layerOption/queryService?";
		try {
			serverSname = URLEncoder.encode(serverSname, "utf-8");
		} catch (Exception e) {
			logger.error("编码格式转换异常");
			e.printStackTrace();
		}
		String data = "sessionId="+ userID + "&data={'sname':'" + serverSname + "','type':'" + serverStype + "'}";
		String serverUrl = url + type + data;
		List<String> list = new ArrayList<String>();
		/** 获取第三方服务的json格式数据 **/
		JSONObject json = BaseFactory.getJSONObj4Server(serverUrl);
		if(json == null){
			logger.error("结果集为null");
			return null;
		}else{
			// 判定状态值
			String stateNum = "200";
			String state = json.getString("retcode");
			/** 解析封装 **/
			if (stateNum.equals(state)) {
				JSONArray jsonArray = json.getJSONArray("results");
				for(int i=0;i<jsonArray.size();i++){
					list.add(((JSONObject) jsonArray.get(i)).getString("sname"));
				}
			} else {
				logger.error(json.getString("msg"));
			}
		}
		return list;
	}
	
	
	public static void main(String[] args) {
		//获取开始时间
//		long startTime = System.currentTimeMillis();
		LayerFactory layerFactory = new LayerFactory();
//		System.out.println(layerFactory.createLayerMap("330100", "wrl", 2));
//		System.out.println(layerFactory.createServerListOld("osgb"));
//		LayerFactory.createOSGBLayerMap("320000", "osgb");
//		LayerFactory.createBIMLayerMap("320000", "bim");
//		getLayersList("330100", "wrl");
		//获取结束时间
//		long endTime = System.currentTimeMillis();    
//		System.out.println("程序运行时间：" + (endTime - startTime) + "ms"); 
//		LayerFactory.getLayersListNew("cdTest1", "gms");
//		LayerFactory.getLayersListNew("chendaTest", "gms");
//		LayerFactory layerFactory = new LayerFactory();
		layerFactory.getCityFactor();
		layerFactory.getDistrict();
//		System.out.println(layerFactory.getCityFactor());
//		System.out.println(layerFactory.getDistrict());
//		System.out.println(layerFactory.createLayerMapNew("dc", "gms", "wrl"));
//		System.out.println(layerFactory.createLayerMapNew("dc", "gms", "wrl", 1));
//		System.out.println(layerFactory.createLayerMapNew("chendaTest", "gms", "c3s"));
		System.out.println(layerFactory.createLayerMapNew("C3SNJ", "gms", "c3s", 1));
//		layerFactory.createLayerMapNew("WRLWRL", "gms", "wrl", 2);
//		List<String> list = layerFactory.getSnameByUserID("65eb3d4eda4043898c5389309457b65d", "", "osgb");
//		if(list != null){
//			for(String str: list){
//				System.out.println(str);
//			}
//		}else{
//			System.out.println("结果集为null");
//		}
//		System.out.println(layerFactory.getSnameByUserID("", "", "gms"));
	}
	
}
