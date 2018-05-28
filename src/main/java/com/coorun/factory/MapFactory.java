package com.coorun.factory;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.coorun.entity.AttributeResult;
import com.coorun.entity.ConfigBean;
import com.coorun.entity.MapResult;
import com.coorun.entity.MixedResult;
import com.coorun.util.ServerRequest;

/**
 * 对查询功能的结果解析
 * 
 * @author DL
 * @createDate 2017-09-20
 */
@Repository(value = "mapFactory")
public class MapFactory {

	/**
	 * 杭州规划局现场接入POI服务
	 * 
	 * @param searchText,关键字
	 * @return List<MixedResult>，封装对象的结果集
	 */
	public List<MixedResult> getArcgisResult(String searchText) {
		if (searchText.length() < 2) {
			return null;
		}
		List<MixedResult> list = new ArrayList<MixedResult>();
		/** 通过配置文件拼接第三方服务路径 **/
		ConfigBean config = BaseFactory.getConfig();
		if (config == null) {
			return null;
		}
		String arcgisState = "FALSE";
		if (arcgisState.equals(config.getArcgis().toUpperCase())) {
			return null;
		}
		String serverUrl = null;
		try {
			serverUrl = "http://" + config.getArcgisPath()
					+ "/e288eefda8363b238133b1eaf142d3add473e5c7/Geocoding/LiquidGIS/FindAddress.gis?key="
					+ URLEncoder.encode(searchText, "UTF-8") + "&FORMAT=json&SRID=4326";
		} catch (Exception e) {
			e.printStackTrace();
		}
		String result = ServerRequest.getResultByURL(serverUrl);
		JSONArray array = JSONArray.parseArray(result);
		MixedResult search = null;
		for (int i = 0; i < array.size(); i++) {
			search = new MixedResult();
			JSONObject json = array.getJSONObject(i);
			JSONObject Envelope = json.getJSONObject("Envelope");
			search.setId((json.getString("ObjectID")));
			search.setName(json.getString("Name"));
			search.setX(Envelope.getString("MaxX"));
			search.setY(Envelope.getString("MaxY"));
			list.add(search);
		}
		return list;
	}

	/**
	 * 属性查询 解析并封装成AttributeResult对象
	 * 
	 * @param x,经度
	 * @param y,纬度
	 * @param max,最大记录数
	 * @return AttributeResult,封装的对象
	 */
	public List<AttributeResult> getAttributeResult(String x, String y, int max) {
		List<AttributeResult> list = new ArrayList<AttributeResult>();
		/** 通过配置文件拼接第三方服务路径 **/
		ConfigBean config = BaseFactory.getConfig();
		if (config == null) {
			return null;
		}
		String url = "http://" + config.getServerIP() + ":" + config.getServerPort();
		String type = "/coo-server/searchOption/queryAttribute?";
		String data = "data={'featureId':'" + "" + "','name':'" + "" + "','dataType':'" + "" + "','max':'" + max
				+ "','x':'" + x + "','y':'" + y + "'}";
		// 拼接路径
		String serverUrl = url + type + data;
		// 获取预处理后的json格式数据
		JSONObject jsonObject = getJSONObj4Server(serverUrl);
		// 判定状态值
		String stateNum = "200";
		String state = jsonObject.getString("retcode");
		if (stateNum.equals(state)) {
			// 逐个进行解析封装成MixedResult对象,并存入list集合
			JSONArray jsonArr = jsonObject.getJSONArray("results");
			for (int i = 0; i < jsonArr.size(); i++) {
				// 逐个解析封装AttributeResult对象
				AttributeResult attributeResult = new AttributeResult();
				String name = ((JSONObject) jsonArr.get(i)).getString("name");
				String code = ((JSONObject) jsonArr.get(i)).getString("CODE");
				String addr = ((JSONObject) jsonArr.get(i)).getString("address");
				String ldArea = ((JSONObject) jsonArr.get(i)).getString("basearea");
				String stru = ((JSONObject) jsonArr.get(i)).getString("type");
				String height = ((JSONObject) jsonArr.get(i)).getString("HEIGHT");
				attributeResult.setName(name == null ? "" : name);
				attributeResult.setCode(code == null ? "" : code);
				attributeResult.setAddr(addr == null ? "" : addr);
				attributeResult.setLdArea(ldArea == null ? "" : ldArea);
				attributeResult.setStru(stru == null ? "" : stru);
				attributeResult.setHeight(height == null ? "" : height);
				// 放入List<AttributeResult>数组
				list.add(attributeResult);
			}
		}
		return list;
	}

	/**
	 * 属性查询 解析并封装成AttributeResult对象(备份)
	 * 
	 * @param x,经度
	 * @param y,纬度
	 * @param max,最大记录数
	 * @return AttributeResult,封装的对象
	 */
	public List<AttributeResult> getAttributeResultBF(String x, String y, int max) {
		List<AttributeResult> list = new ArrayList<AttributeResult>();
		/** 通过配置文件拼接第三方服务路径 **/
		ConfigBean config = BaseFactory.getConfig();
		if (config == null) {
			return null;
		}
		String url = "http://" + config.getServerIP() + ":" + config.getServerPort();
		String type = "/coo-server/searchOption/queryAttribute?";
		String data = "data={'featureId':'" + "" + "','name':'" + "" + "','dataType':'" + "" + "','max':'" + max
				+ "','x':'" + x + "','y':'" + y + "'}";
		// 拼接路径
		String serverUrl = url + type + data;
		// 获取预处理后的json格式数据
		JSONObject jsonObject = getJSONObj4Server(serverUrl);
		// 判定状态值
		String stateNum = "200";
		String state = jsonObject.getString("retcode");
		if (stateNum.equals(state)) {
			// 逐个进行解析封装成MixedResult对象,并存入list集合
			JSONArray jsonArr = jsonObject.getJSONArray("results");
			for (int i = 0; i < jsonArr.size(); i++) {
				// 逐个解析封装AttributeResult对象
				AttributeResult attributeResult = new AttributeResult();
				String name = ((JSONObject) jsonArr.get(i)).getString("NAME");
				String code = ((JSONObject) jsonArr.get(i)).getString("CODE");
				String addr = ((JSONObject) jsonArr.get(i)).getString("ADDR");
				String ldArea = ((JSONObject) jsonArr.get(i)).getString("LD_AREA");
				String stru = ((JSONObject) jsonArr.get(i)).getString("STRU");
				String height = ((JSONObject) jsonArr.get(i)).getString("HEIGHT");
				attributeResult.setName(name == null ? "" : name);
				attributeResult.setCode(code == null ? "" : code);
				attributeResult.setAddr(addr == null ? "" : addr);
				attributeResult.setLdArea(ldArea == null ? "" : ldArea);
				attributeResult.setStru(stru == null ? "" : stru);
				attributeResult.setHeight(height == null ? "" : height);
				// 放入List<AttributeResult>数组
				list.add(attributeResult);
			}
		}
		return list;
	}

	/**
	 * 混合查询 解析并封装成List<MixedResult>对象
	 * 
	 * @param condition,查询条件
	 * @param max,最大记录数
	 * @return List<MixedResult,封装的对象
	 */
	public List<MixedResult> getMixedReuslt(String condition, int max) {
		/** 获取混合查询的请求路径 **/
		String[] urlList = MapFactory.getMixedQueryUrl(condition, max);
		List<MixedResult> list = new ArrayList<MixedResult>();
		// 封装List<MixedResult>对象
		for (int j = 0; j < urlList.length; j++) {
			// 获取预处理后的json格式数据
			JSONObject jsonObject = getJSONObj4Server(urlList[j]);
			// 判定状态值
			String stateNum = "200";
			String state = jsonObject.getString("retcode");
			if (stateNum.equals(state)) {
				// 逐个进行解析封装成MixedResult对象,并存入list集合
				JSONArray jsonArr = jsonObject.getJSONArray("results");
				for (int i = 0; i < jsonArr.size(); i++) {
					// 逐个解析封装MixedResult对象
					MixedResult mixedResult = new MixedResult();
					mixedResult.setId(((JSONObject) jsonArr.get(i)).getString("id"));
					mixedResult.setName(((JSONObject) jsonArr.get(i)).getString("name"));
					mixedResult.setAddress(((JSONObject) jsonArr.get(i)).getString("address"));
					mixedResult.setDataType(((JSONObject) jsonArr.get(i)).getString("dataType"));
					mixedResult.setX(((JSONObject) jsonArr.get(i)).getString("x"));
					mixedResult.setY(((JSONObject) jsonArr.get(i)).getString("y"));
					mixedResult.setZ(((JSONObject) jsonArr.get(i)).getString("z"));
					mixedResult.setLineShp(((JSONObject) jsonArr.get(i)).getString("lineShp"));
					mixedResult.setAreaShp(((JSONObject) jsonArr.get(i)).getString("areashp"));
					// 放入List<MixedResult>数组
					if (!list.contains(mixedResult)) {
						list.add(mixedResult);
					}
				}
			}
		}
		return list;
	}

	/**
	 * 组装混合查询的所有请求路径
	 * 
	 * @param condition,查询条件
	 * @param max,最大记录数
	 * @return String[],请求路径
	 */
	public static String[] getMixedQueryUrl(String condition, int max) {
		// 查询条件条件个数(name,address,cityCode)
		int length = 3;
		// 各个条件拼接的查询路径
		String[] urlList = new String[length];
		// 存储所有查询条件
		String[] conditions = new String[length];
		// 数组赋空值
		for (int i = 0; i < length; i++) {
			conditions[i] = "";
		}
		/** 通过配置文件拼接第三方服务路径 **/
		ConfigBean config = BaseFactory.getConfig();
		if (config == null) {
			return null;
		}
		String url = "http://" + config.getServerIP() + ":" + config.getServerPort();
		String type = "/coo-server/searchOption/queryBlend?";
		/** 按各个条件拼接查询路径 **/
		for (int i = 0; i < conditions.length; i++) {
			try {
				conditions[i] = URLEncoder.encode(condition, "utf-8");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
			String data = "data={'id':'" + "" + "','name':'" + conditions[0] + "','address':'" + conditions[1]
					+ "','cityCode':'" + conditions[2] + "','dataType':'" + "" + "','max':'" + max + "'}";
			// 拼接路径
			String serverUrl = url + type + data;
			// 存放拼接的查询路径
			urlList[i] = serverUrl;
			// 条件置空(条件参数唯一)
			conditions[i] = "";
		}
		return urlList;
	}

	/**
	 * 获取第三方服务数据并进行预处理
	 * 
	 * @param serverUrl,第三方请求路径
	 * @return JSONObject,返回的json对象
	 */
	public static JSONObject getJSONObj4Server(String serverUrl) {
		if (serverUrl == null) {
			return null;
		}
		String result4Server = null;
		/** 通过服务路径获取第三方服务数据 **/
		result4Server = ServerRequest.getResultByURL(serverUrl);
		// 对结果集进行预处理
		int firstIndex = result4Server.indexOf("(");
		int lastIndex = result4Server.lastIndexOf(")");
		if ((firstIndex == -1) || (lastIndex == -1)) {
			return null;
		}
		result4Server = result4Server.substring(firstIndex + 1, lastIndex);
		// 把预处理结果转换成json格式数据
		JSONObject jsonObject = JSON.parseObject(result4Server);
		return jsonObject;
	}

	/****************************** server接口(old) *****************************/

	/**
	 * 属性查询 解析并封装成AttributeResult对象
	 * 
	 * @param lon
	 * @param lat
	 * @param serverType
	 * @param shpType
	 * @return AttributeResult
	 */
	public AttributeResult getAttributeResultOld(String lon, String lat, int serverType, int shpType) {
		AttributeResult attributeResult = new AttributeResult();
		/** 通过配置文件拼接第三方服务路径 **/
		ConfigBean config = BaseFactory.getConfig();
		String url = "http://" + config.getServerIP() + ":" + config.getServerPort();
		String type = "/coo-server/lucene/vectorPegging?";
		String callback = "callback=json_calklback&";
		String data = "data={'x':'" + lon + "','y':'" + lat + "','type':'" + serverType + "','shptype':'" + shpType
				+ "'}";
		// 拼接路径
		String serverUrl = url + type + callback + data;
		// 获取预处理后的json格式数据
		JSONObject jsonObject = getJSONObj4Server(serverUrl);
		// 查询结果为null时候返回的结果为[],长度为2
		String results = jsonObject.getString("results");
		int nullLenth = 2;
		if (results.length() <= nullLenth) {
			return null;
		} else {
			/** 逐个解析封装AttributeResult对象 **/
			JSONArray jsonArr = jsonObject.getJSONArray("results");
			String name = ((JSONObject) jsonArr.get(0)).getString("NAME");
			String code = ((JSONObject) jsonArr.get(0)).getString("CODE");
			String addr = ((JSONObject) jsonArr.get(0)).getString("ADDR");
			String ldArea = ((JSONObject) jsonArr.get(0)).getString("LD_AREA");
			String stru = ((JSONObject) jsonArr.get(0)).getString("STRU");
			String height = ((JSONObject) jsonArr.get(0)).getString("HEIGHT");
			attributeResult.setName(name);
			attributeResult.setCode(code);
			attributeResult.setAddr(addr);
			attributeResult.setLdArea(ldArea);
			attributeResult.setStru(stru);
			attributeResult.setHeight(height);
			return attributeResult;
		}
	}

	/**
	 * 关键字查询 解析并封装成List<MapResult>对象
	 * 
	 * @param keyWord
	 * @param pageNo
	 * @param pageSize
	 * @return List<MapResult>
	 */
	public List<MapResult> getListResult(String keyWord, int pageNo, int pageSize) {
		List<MapResult> list = new ArrayList<MapResult>();
		/** 通过配置文件拼接第三方服务路径 **/
		ConfigBean config = BaseFactory.getConfig();
		String url = "http://" + config.getServerIP() + ":" + config.getServerPort();
		String type = "/coo-server/search/getAllPoiNJ?";
		String callback = "callback=json_calklback&";
		String data = null;
		try {
			data = "data={'address':'" + URLEncoder.encode(keyWord, "UTF8") + "','pageNo':'" + pageNo + "','pageSize':'"
					+ pageSize + "'}";
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		// 拼接路径
		String serverUrl = url + type + callback + data;
		// 获取预处理后的json格式数据
		JSONObject jsonObject = getJSONObj4Server(serverUrl);
		jsonObject = jsonObject.getJSONObject("results").getJSONObject("dataList");
		// 把json格式的数据转换成数组,对数组中的对象逐个进行解析封装成MapResult对象(PS:多个对象)
		JSONArray jsonArray = jsonObject.getJSONArray("dataList");
		for (int i = 0; i < jsonArray.size(); i++) {
			/** 逐个解析封装MapResult对象 **/
			MapResult mapResult = new MapResult();
			JSONObject parameter = ((JSONObject) jsonArray.get(i));
			mapResult.setId(parameter.getString("id"));
			mapResult.setName(parameter.getString("addressName"));
			mapResult.setAlias(parameter.getString("alias"));
			mapResult.setAddress(parameter.getString("address"));
			mapResult.setType(parameter.getString("type"));
			mapResult.setX(parameter.getString("pointX"));
			mapResult.setY(parameter.getString("pointY"));
			mapResult.setZ(parameter.getString("pointZ"));
			mapResult.setMemo(parameter.getString("memo"));
			// 放入List<MapResult>数组
			list.add(mapResult);
		}
		return list;
	}
}