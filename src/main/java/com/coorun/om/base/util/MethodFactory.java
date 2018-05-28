package com.coorun.om.base.util;

import java.security.MessageDigest;
import java.util.Date;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

/*************************
 *
 * Author : Billy 
 * Create Date : 2017年10月21日 上午11:32:56 
 * Desc : 常用操作工厂类
 *
 **************************/
public class MethodFactory {

	/**
	 * 获取UUID
	 * 
	 * @return 32位字符串
	 */
	public static String getUUID() {
		return UUID.randomUUID().toString().replaceAll("-", "");
	}
	
	private static Object getParam(HttpServletRequest req,String param,Object defaultVal){
		String val = req.getParameter(param);
		if(null == val ){
			val = "";
		}
		if(defaultVal instanceof Integer){
			return (!"".equals(val) && null!=val) ? Integer.valueOf(val) : defaultVal;
		}else if(defaultVal instanceof Float){
			return (!"".equals(val) && null==val) ? Float.valueOf(val) : defaultVal;
		}else if(defaultVal instanceof Double){
			return (!"".equals(val) && null==val) ? Double.valueOf(val) : defaultVal;
		}else if(defaultVal instanceof Date){
			return (!"".equals(val) && null==val) ? Date.parse(val) : defaultVal;
		}
		return val;
	}
	/**
	 * 返回参数字符串
	 * @param req
	 * @param param
	 * @param defaultVal
	 * @return
	 */
	public static String getParamStr(HttpServletRequest req,String param,Object defaultVal){
		return getParam(req, param, defaultVal).toString();
	}
	
	/**
	 * 返回参数数字格式
	 * @param req
	 * @param param
	 * @param defaultVal
	 * @return
	 */
	public static Integer getParamInteger(HttpServletRequest req,String param,Object defaultVal){
		return Integer.valueOf(getParamStr(req, param, defaultVal));
	}
	
	/**
	 * 将原字符串进行MD5加密
	 * @param message
	 * @return
	 */
	public static String MD5(String message) {
		String md5str = "";
		try {
			// 1 创建一个提供信息摘要算法的对象，初始化为md5算法对象
			MessageDigest md = MessageDigest.getInstance("MD5");
			// 2 将消息变成byte数组
			byte[] input = message.getBytes();

			// 3 计算后获得字节数组,这就是那128位了
			byte[] buff = md.digest(input);

			// 4 把数组每一字节（一个字节占八位）换成16进制连成md5字符串
			md5str = bytesToHex(buff);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return md5str;
	}

	private static String bytesToHex(byte[] bytes) {
		StringBuffer md5str = new StringBuffer();
		// 把数组每一字节换成16进制连成md5字符串
		int digital;
		for (int i = 0; i < bytes.length; i++) {
			digital = bytes[i];

			if (digital < 0) {
				digital += 256;
			}
			if (digital < 16) {
				md5str.append("0");
			}
			md5str.append(Integer.toHexString(digital));
		}
		return md5str.toString().toUpperCase();
	}

	public static void main(String[] args) {
		String uuid=getUUID();
		System.out.println("UUID="+uuid);
		String str = MD5("123456");
		System.out.println("MD5="+str);
	}
}
