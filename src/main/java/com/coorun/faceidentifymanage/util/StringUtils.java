package com.coorun.faceidentifymanage.util;

import java.util.List;
import java.util.UUID;

/**
 * 使用springframework中的工具类
 * 
 * @author jwei
 *
 */
public class StringUtils extends org.springframework.util.StringUtils {
	
    /**
     * 生成uuid
     * 
     * @return UUID
     */
    public static String getUUId() {
        return UUID.randomUUID().toString().replaceAll("-", "");
    }
    
    /**
     * 判断集合是否为空
     * 
     * @param lists
     * 		       数据集合
     * @return
     */
    public static boolean isEmpty(List<?> lists) {
    	if (lists == null || lists.size() == 0) {
    		return true;
    	}
		return false;
    }
    
	/**
	 * 检验参数是否为空
	 * 
	 * @param objects
	 * 			对象数组
	 * @return
	 */
	public static boolean isEmpty(Object... objects) {
		for (Object object : objects) {
			
			if (null == object || "".equals(object)) {
				return true;
			}
		}
		return false;
	}

	/**
	 * 判断字符串是否为数字
	 *
	 * @param msg  字符串
	 * @return 判断结果
	 */
	public static boolean isNumber(String msg) {
		try {
			Integer.parseInt(msg);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	/**
	 * 判断为boolean类型字符串
	 *
	 * @param msg  字符串
	 * @return 判断结果
	 */
	public static boolean isBoolean(String msg) {
		try {
			Boolean.parseBoolean(msg);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
}
