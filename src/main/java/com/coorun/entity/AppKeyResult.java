package com.coorun.entity;

/**
 * 根据appKey获取加密协议
 * @author lixiang
 *
 */

public class AppKeyResult {
	//appSecret经过对称加密后的密文appSecret
	private String appSecret;
	//当前时间戳
	private String time;
	//当前时间戳加密数据
	private String timeSecret;
	
	public String getAppSecret() {
		return appSecret;
	}
	public void setAppSecret(String appSecret) {
		this.appSecret = appSecret;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public String getTimeSecret() {
		return timeSecret;
	}
	public void setTimeSecret(String timeSecret) {
		this.timeSecret = timeSecret;
	}
}
