package com.coorun.factory;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.coorun.entity.ConfigBean;
import com.coorun.util.ServerRequest;

/**
 * 1.读取配置文件 2.获取第三方服务数据
 * 
 * @author DL
 * @createDate 2017-09-21
 */
public class BaseFactory {
	/** 封装读取的配置结果 **/
	static ConfigBean config = new ConfigBean();

	public static ConfigBean getConfig() {
		// 读取配置文件
		Properties cfg = new Properties();
		InputStream in = BaseFactory.class.getClassLoader().getResourceAsStream("config.properties");
		try {
			cfg.load(in);
			// 封装成configBean对象
			config.setServerIP(cfg.getProperty("serverIP").trim());
			config.setServerPort(cfg.getProperty("serverPort").trim());
			config.setAuthorizeIP(cfg.getProperty("authorizeIP").trim());
			config.setAuthorizePort(cfg.getProperty("authorizePort").trim());
			config.setProjectIP(cfg.getProperty("OMIP").trim());
			config.setProjectPort(cfg.getProperty("OMPort").trim());
			config.setCMSIP(cfg.getProperty("CMSIP").trim());
			config.setCMSPort(cfg.getProperty("CMSPort").trim());
			config.setDefaultLoadType(cfg.getProperty("defaultLoadType").trim());
			config.setDataType(cfg.getProperty("dataType").trim());
			config.setDefaultDOMDateValue(cfg.getProperty("defaultDOMDateValue").trim());
			config.setDefaultDOMMonthValue(cfg.getProperty("defaultDOMMonthValue").trim());
			config.setDefaultDEMDateValue(cfg.getProperty("defaultDEMDateValue").trim());
			config.setDefaultDEMMonthValue(cfg.getProperty("defaultDEMMonthValue").trim());
			config.setArcgis(cfg.getProperty("arcgis").trim());
			config.setArcgisPath(cfg.getProperty("arcgisPath").trim());
			config.setServerType1(cfg.getProperty("serverType1").trim());
			config.setServerAreacode1(cfg.getProperty("serverAreacode1").trim());
			config.setArtemisHost(cfg.getProperty("artemisHost").trim());
			config.setArtemisAppKey(cfg.getProperty("artemisAppKey").trim());
			config.setArtemisAppSecret(cfg.getProperty("artemisAppSecret").trim());
			config.setPlayType(cfg.getProperty("playType").trim());
			config.setRealPush(cfg.getProperty("realPush").trim());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return config;
	}

	/**
	 * 获取第三方服务数据并进行预处理
	 * 
	 * @param serverUrl,第三方请求路径
	 * @return JSONObject,返回的json对象
	 */
	public static JSONObject getJSONObj4Server(String serverUrl) {
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

}
