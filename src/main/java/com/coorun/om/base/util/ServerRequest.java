package com.coorun.om.base.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.apache.log4j.Logger;

import com.alibaba.druid.support.logging.Log;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

/**
 * 连接第三方服务的网络响应
 */
public class ServerRequest {
	
	private final static Logger logger = Logger.getLogger(ServerRequest.class);
	public static String getResultByURL(String url) {
		String result = "";
		BufferedReader in = null;// 读取响应输入流
		try {
			URL connURL = new URL(new String(url.getBytes(), "UTF-8"));
			// 打开URL连接
			HttpURLConnection httpConn = (HttpURLConnection) connURL.openConnection();
			// 设置通用属性
			httpConn.setDoOutput(true);
			httpConn.setDoInput(true);
			httpConn.setRequestMethod("GET");
			httpConn.setRequestProperty("accept", "*/*");
			httpConn.setRequestProperty("connection", "Keep-Alive");
			httpConn.setRequestProperty("Content-type", "application/x-www-form-urlencoded");
			httpConn.setRequestProperty("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
			// 建立实际的连接
			httpConn.connect();
			// 响应头部获取
			in = new BufferedReader(new InputStreamReader(httpConn.getInputStream(), "UTF-8"));
			String line;
			// 读取返回的内容
			while ((line = in.readLine()) != null) {
				result += line;
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (in != null) {
					in.close();
				}
			} catch (IOException ex) {
				ex.printStackTrace();
				result = "";
			}
		}
		return result;
	}
	
	/**
	 * 对路径进行解析调用第三方接口返回封装的结果集
	 * @param url
	 * @return jsonObject
	 */
	public static JSONObject getJSONObjectResult(String url){
		//获取调用Server接口返回的字符串信息
		String result = getResultByURL(url);
		if("".equals(result.trim())||result == null){
			return null;
		}
		//对result结果集进行截取解析
		int firstOne = result.indexOf("(");
		int lastOne = result.lastIndexOf(")");
		//对result结果集进行判空
		if(firstOne == -1 || lastOne == -1 ){
			return null;
		}
		//对result结果集进行截取
		result = result.substring(firstOne + 1, lastOne);
		logger.error("server返回结果:"+result);
		//对result结果集字符串转换为JSON格式
		JSONObject jsonObject = JSON.parseObject(result); 
		return jsonObject;
	}
}
