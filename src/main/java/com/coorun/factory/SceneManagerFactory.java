package com.coorun.factory;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.coorun.entity.ConfigBean;
import com.coorun.entity.LabelResult;
import com.coorun.entity.PathResult;
import com.coorun.entity.ViewResult;
import com.coorun.util.ServerRequest;

/**
 * 解析数据 封装对象
 * 
 * @author DL
 * @createDate 2017-10-11
 */
@Repository(value = "sceneManagerFactory")
public class SceneManagerFactory {
	/**
	 * 视点功能---新增视点
	 * 
	 * @param name
	 * @param userId
	 * @param z
	 * @param x
	 * @param y
	 * @param descr
	 * @param rotateAngle
	 * @param overAngle
	 * @param range
	 * @return Boolean
	 */
	public Boolean addView(String name, String userId, String z, String x, String y, String descr, String rotateAngle,
			String overAngle, String range) {
		/** 通过配置文件拼接第三方服务路径 **/
		ConfigBean config = BaseFactory.getConfig();
		if (config == null) {
			return null;
		}
		String url = "http://" + config.getServerIP() + ":" + config.getServerPort();
		String type = "/coo-server/viewpointoption/viewpointadd?";
		String data = null;
		try {
			data = "data={'name':'" + URLEncoder.encode(name, "utf-8") + "','userId':'" + userId + "','z':'" + z
					+ "','x':'" + x + "','y':'" + y + "','descr':'" + URLEncoder.encode(descr, "utf-8")
					+ "','rotateAngle':'" + rotateAngle + "','overAngle':'" + overAngle + "','range':'" + range + "'}";
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		// 拼接路径
		String serverUrl = url + type + data;
		// 获取预处理后的json格式数据
		JSONObject jsonObject = getJSONObj4Server(serverUrl);
		// 判定状态值
		String stateNum = "200";
		String state = jsonObject.getString("retcode");
		if (stateNum.equals(state)) {
			return true;
		}
		return false;
	}

	/**
	 * 视点功能---删除视点
	 * 
	 * @param id
	 * @param userId
	 * @return Boolean
	 */
	public Boolean deleteView(String id) {
		/** 通过配置文件拼接第三方服务路径 **/
		ConfigBean config = BaseFactory.getConfig();
		if (config == null) {
			return null;
		}
		String url = "http://" + config.getServerIP() + ":" + config.getServerPort();
		String type = "/coo-server/viewpointoption/viewpointdelete?";
		String data = "data={'id':'" + id + "'}";
		// 拼接路径
		String serverUrl = url + type + data;
		// 获取预处理后的json格式数据
		JSONObject jsonObject = getJSONObj4Server(serverUrl);
		// 判定状态值
		String stateNum = "200";
		String state = jsonObject.getString("retcode");
		if (stateNum.equals(state)) {
			return true;
		}
		return false;
	}

	/**
	 * 视点功能---修改视点
	 * 
	 * @param id
	 * @param userId
	 * @param name
	 * @param z
	 * @param x
	 * @param y
	 * @param descr
	 * @param rotateAngle
	 * @param overAngle
	 * @param range
	 * @return Boolean
	 */
	public Boolean modifyView(String id, String name, String z, String x, String y, String descr,
			String rotateAngle, String overAngle, String range) {
		/** 通过配置文件拼接第三方服务路径 **/
		ConfigBean config = BaseFactory.getConfig();
		if (config == null) {
			return null;
		}
		String url = "http://" + config.getServerIP() + ":" + config.getServerPort();
		String type = "/coo-server/viewpointoption/viewpointupdate?";
		String data = null;
		try {
			data = "data={'id':'" + id + "','name':'" + URLEncoder.encode(name, "utf-8")
					+ "','z':'" + z + "','x':'" + x + "','y':'" + y + "','descr':'" + URLEncoder.encode(descr, "utf-8")
					+ "','rotateAngle':'" + rotateAngle + "','overAngle':'" + overAngle + "','range':'" + range + "'}";
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		// 拼接路径
		String serverUrl = url + type + data;
		// 获取预处理后的json格式数据
		JSONObject jsonObject = getJSONObj4Server(serverUrl);
		// 判定状态值
		String stateNum = "200";
		String state = jsonObject.getString("retcode");
		if (stateNum.equals(state)) {
			return true;
		}
		return false;
	}

	/**
	 * 视点功能---查询视点 封装成List<ViewResult>对象
	 * 
	 * @param userId
	 * @param name
	 * @return List<ViewResult>
	 */
	public List<ViewResult> getViewResult( String name) {
		List<ViewResult> list = new ArrayList<ViewResult>();
		/** 通过配置文件拼接第三方服务路径 **/
		ConfigBean config = BaseFactory.getConfig();
		if (config == null) {
			return null;
		}
		String url = "http://" + config.getServerIP() + ":" + config.getServerPort();
		String type = "/coo-server/viewpointoption/viewpointquery?";
		String data = null;
		try {
			data = "data={'name':'" + URLEncoder.encode(name, "utf-8") + "'}";
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		// 拼接路径
		String serverUrl = url + type + data;
		// 获取预处理后的json格式数据
		JSONObject jsonObject = getJSONObj4Server(serverUrl);
		// 判定状态值
		String stateNum = "200";
		String state = jsonObject.getString("retcode");
		if (stateNum.equals(state)) {
			JSONArray jsonArr = jsonObject.getJSONObject("results").getJSONArray("dataList");
			for (int i = 0; i < jsonArr.size(); i++) {
				ViewResult viewResult = new ViewResult();
				String id = ((JSONObject) jsonArr.get(i)).getString("id");
				String ename = ((JSONObject) jsonArr.get(i)).getString("name");
				String longitude = ((JSONObject) jsonArr.get(i)).getString("x");
				String latitude = ((JSONObject) jsonArr.get(i)).getString("y");
				String elevation = ((JSONObject) jsonArr.get(i)).getString("z");
				String rotateAngle = ((JSONObject) jsonArr.get(i)).getString("rotateAngle");
				String overAngle = ((JSONObject) jsonArr.get(i)).getString("overAngle");
				String range = ((JSONObject) jsonArr.get(i)).getString("range");
				String descr = ((JSONObject) jsonArr.get(i)).getString("descr");
				viewResult.setId(id);
				viewResult.setName(ename);
				viewResult.setLongitude(longitude);
				viewResult.setLatitude(latitude);
				viewResult.setElevation(elevation);
				viewResult.setRotateAngle(rotateAngle);
				viewResult.setOverAngle(overAngle);
				viewResult.setRange(range);
				viewResult.setDescr(descr);
				// 放入List<ViewResult>数组
				list.add(viewResult);
			}
		}
		return list;
	}

	/**
	 * 路径功能---查询路径 封装成List<PathResult>对象
	 * 
	 * @param pathName
	 * @param userId
	 * @return List<PathResult>
	 */
	public List<PathResult> getPathResult(String pathName) {
		List<PathResult> list = new ArrayList<PathResult>();
		/** 通过配置文件拼接第三方服务路径 **/
		ConfigBean config = BaseFactory.getConfig();
		if (config == null) {
			return null;
		}
		String url = "http://" + config.getServerIP() + ":" + config.getServerPort();
		String type = "/coo-server/routeoption/routequery?";
		String data = null;
		try {
			data = "data={'pathName':'" + URLEncoder.encode(pathName, "utf-8") + "'}";
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		// 拼接路径
		String serverUrl = url + type + data;
		// 获取预处理后的json格式数据
		JSONObject jsonObject = getJSONObj4Server(serverUrl);
		// 判定状态值
		String stateNum = "200";
		String state = jsonObject.getString("retcode");
		if (stateNum.equals(state)) {
			// 把json格式的数据转换成数组,对数组中的对象逐个进行解析封装成PathResult对象(PS:多个对象)
			JSONArray jsonArray = jsonObject.getJSONObject("results").getJSONArray("dataList");
			for (int i = 0; i < jsonArray.size(); i++) {
				/** 逐个解析封装PathResult对象 **/
				PathResult pathResult = new PathResult();
				JSONObject parameter = ((JSONObject) jsonArray.get(i));
				pathResult.setId(parameter.getString("id"));
				pathResult.setLnglats(parameter.getString("lnglats"));
				pathResult.setPathName(parameter.getString("pathName"));
				pathResult.setViewModel(parameter.getString("viewModel"));
				// 放入List<PathResult>数组
				list.add(pathResult);
			}
		}
		return list;
	}

	/**
	 * 路径功能---删除路径
	 * 
	 * @param id
	 * @param userId
	 * @return Boolean
	 */
	public Boolean deletePath(String id) {
		/** 通过配置文件拼接第三方服务路径 **/
		ConfigBean config = BaseFactory.getConfig();
		if (config == null) {
			return null;
		}
		String url = "http://" + config.getServerIP() + ":" + config.getServerPort();
		String type = "/coo-server/routeoption/routedelete?";
		String data = "data={'id':'" + id + "'}";
		// 拼接路径
		String serverUrl = url + type + data;
		// 获取预处理后的json格式数据
		JSONObject jsonObject = getJSONObj4Server(serverUrl);
		// 判定状态值
		String stateNum = "200";
		String state = jsonObject.getString("retcode");
		if (stateNum.equals(state)) {
			return true;
		}
		return false;
	}

	/**
	 * 路径功能---新增路径
	 * 
	 * @param pathName
	 * @param userId
	 * @param lnglats
	 * @param viewModel
	 * @return Boolean
	 */
	public Boolean addPath(String pathName, String userId, String lnglats, String viewModel) {
		/** 通过配置文件拼接第三方服务路径 **/
		ConfigBean config = BaseFactory.getConfig();
		if (config == null) {
			return null;
		}
		String url = "http://" + config.getServerIP() + ":" + config.getServerPort();
		String type = "/coo-server/routeoption/routeadd?";
		String data = null;
		try {
			data = "data={'pathName':'" + URLEncoder.encode(pathName, "utf-8") + "','userId':'" + userId
					+ "','lnglats':'" + lnglats + "','viewModel':'" + viewModel + "'}";
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		// 拼接路径
		String serverUrl = url + type + data;
		// 获取预处理后的json格式数据
		JSONObject jsonObject = getJSONObj4Server(serverUrl);
		// 判定状态值
		String stateNum = "200";
		String state = jsonObject.getString("retcode");
		if (stateNum.equals(state)) {
			return true;
		}
		return false;
	}

	/**
	 * 标注查询 解析数据 封装成List<LabelResult>对象
	 * 
	 * @param userId
	 * @param name
	 * @param pointType
	 * @param pageNo
	 * @param pageSize
	 * @return List<LabelResult>
	 */
	public List<LabelResult> loadLabelResult( String name) {
		/* 创建标注对象 */
		List<LabelResult> list = new ArrayList<LabelResult>();
		/* 通过配置文件拼接第三方服务路径 */
		ConfigBean config = BaseFactory.getConfig();
		//配置文件对象进行判空
		if("".equals(config) || config == null){
			return null;
		}
		//凭借服务路径
		String url = "http://" + config.getServerIP() + ":" + config.getServerPort();
		String type = "/coo-server/labeloption/labelquery?";
		String data = null;
		try {// URLEncoder.encode(name, "UTF8")--进行中文转码否则调用后台接口会乱码
			data = "data={'name':'" + URLEncoder.encode(name, "UTF8")  + "'}";
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		// 拼接第三方服务请求路径
		String serverUrl = url + type + data;
		/* 获取预处理后的json格式数据 */
		JSONObject jsonObject = getJSONObj4Server(serverUrl);
		// 状态值判定
		String stateNum = "200";
		String labelState = jsonObject.getString("retcode");
		//对json格式数据进行判空
		if (jsonObject == null){
			return null;
		}
		if (stateNum.equals(labelState)) {
			JSONArray jsonArr = jsonObject.getJSONObject("results").getJSONArray("dataList");
			/* 返回标注对象labelResult赋值 */
			if(jsonArr.size() > 0){
				for (int i = 0; i < jsonArr.size(); i++) {
					LabelResult labelResult = new LabelResult();
					String id = ((JSONObject) jsonArr.get(i)).getString("id");
					String ename = ((JSONObject) jsonArr.get(i)).getString("name");
					String longitude = ((JSONObject) jsonArr.get(i)).getString("x");
					String latitude = ((JSONObject) jsonArr.get(i)).getString("y");
					String elevation = ((JSONObject) jsonArr.get(i)).getString("z");
					String rotateAngle = ((JSONObject) jsonArr.get(i)).getString("rotateAngle");
					String overAngle = ((JSONObject) jsonArr.get(i)).getString("overAngle");
					String range = ((JSONObject) jsonArr.get(i)).getString("range");
					String memo = ((JSONObject) jsonArr.get(i)).getString("descr");
					labelResult.setId(id);
					labelResult.setName(ename);
					labelResult.setLongitude(longitude);
					labelResult.setLatitude(latitude);
					labelResult.setElevation(elevation);
					labelResult.setRotateAngle(rotateAngle);
					labelResult.setOverAngle(overAngle);
					labelResult.setRange(range);
					labelResult.setMemo(memo);
					list.add(labelResult);
				}
			}
		}
		return list;
	}

	/**
	 * 标注删除
	 * 
	 * @param id
	 */
	public String delLabel(String id) {
		/* 通过第三方请求调用http请求 */
		ConfigBean config = BaseFactory.getConfig();
		if("".equals(config) || config == null){
			return null;
		}
		//拼接服务路径
		String url = "http://" + config.getServerIP() + ":" + config.getServerPort();
		String type = "/coo-server/labeloption/labeldelete?";
		String data = "data={'id':'"+id+"'}";
		// 拼接第三方请求
		String serverUrl = url + type + data;
		/* 获取处理数据Json格式 */
		JSONObject jsonObject = getJSONObj4Server(serverUrl);
		//对server返回数据进行判空
		if(jsonObject == null){
			return null;
		}
		/* 获取返回值参数 */
		String labelState = jsonObject.getString("retcode");
		return labelState;
	}

	/**
	 * 标注修改
	 * 
	 * @param labelResult
	 * @return String
	 */
	public String updateLabel(LabelResult labelResult) {
		/* 通过第三方接口调用http请求 */
		ConfigBean config = BaseFactory.getConfig();
		// 配置文件参数进行判空
		if("".equals(config) || config == null){
			return  null;
		}
		//拼接服务路径
		String url = "http://" + config.getServerIP() + ":" + config.getServerPort();
		String type = "/coo-server/labeloption/labelupdate?";
		String data = null;
		//配置参数信息
		try {// UTF8路径需转码
			data = "data={'id':'" + labelResult.getId() + "','name':'"
					+ URLEncoder.encode(labelResult.getName(), "UTF8") + "','x':'" + labelResult.getLongitude()
					+ "','y':'" + labelResult.getLatitude() + "','z':'" + labelResult.getElevation()
					+ "','rotateAngle':'" + labelResult.getRotateAngle() + "','overAngle':'"
					+ labelResult.getOverAngle() + "','range':'" + labelResult.getRange() + "','descr':'"
					+ URLEncoder.encode(labelResult.getMemo(), "UTF8") + "'}";
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		// 拼接第三方接口
		String serverUrl = url + type + data;
		/* 获取处理数据Json格式 */
		JSONObject jsonObject = getJSONObj4Server(serverUrl);
		//服务返回json集进行判空
		if(jsonObject == null){
			return null;
		}
		/* 获取返回状态值 */
		String labelState = jsonObject.getString("retcode");
		return labelState;// 200:成功 201:失败
	}

	/**
	 * 标注添加
	 * 
	 * @param labelResult
	 * @return String
	 */
	public Map<String,String> addLabel(LabelResult labelResult) {
		/* 通过第三方接口调用http请求 */
		ConfigBean config = BaseFactory.getConfig();
		//配置文件进行判空
		if("".equals(config) || config == null){
			return  null;
		}
		//拼接serverUrl服务路径
		String url = "http://" + config.getServerIP() + ":" + config.getServerPort();
		String type = "/coo-server/labeloption/labeladd?";
		String data = null;
		//配置参数信息
		try {
			data = "data={'userId':'" + labelResult.getUserId() + "','name':'"
					+ URLEncoder.encode(labelResult.getName(), "UTF8") + "','x':'" + labelResult.getLongitude()
					+ "','y':'" + labelResult.getLatitude() + "','z':'" + labelResult.getElevation()
					+ "','rotateAngle':'" + labelResult.getRotateAngle() + "','overAngle':'"
					+ labelResult.getOverAngle() + "','range':'" + labelResult.getRange() + "','descr':'"
					+ URLEncoder.encode(labelResult.getMemo(), "UTF8") + "'}";
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		// 拼接第三方接口
		String serverUrl = url + type + data;
		/* 获取处理数据Json格式 */
		JSONObject jsonObject = getJSONObj4Server(serverUrl);
		//对server服务返回值集合进行判空
		if(jsonObject == null){
			return null;
		}
		/* 获取返回状态值 */
		String labelState = jsonObject.getString("retcode");
		//定义服务返回信息集合
		Map<String,String> labelMap = new HashMap<String,String>();
		labelMap.put("labelState", jsonObject.getString("retcode"));
		labelMap.put("msg", jsonObject.getString("msg"));
		return labelMap;// 200:成功 201:失败

	}

	/**
	 * 获取第三方服务数据并进行预处理
	 * 
	 * @param serverUrl
	 * @return JSONObject
	 */
	public static JSONObject getJSONObj4Server(String serverUrl) {
		String result4Server = null;
		/** 通过服务路径获取第三方服务数据 **/
		result4Server = ServerRequest.getResultByURL(serverUrl);
		//服务端返回结果集合进行判空
		if("".equals(result4Server) || result4Server == null){
			return null;
		}
		// 对结果集进行处理
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

}
