package com.coorun.icgis.jites.geodo.api.bean;

import java.io.Serializable;

public class GeodoToken implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -7387875590397211758L;
	
	private String code;
	private String msg;
	private String token;
	
	
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public boolean isSuccess() {
		return code.equals("200")? true : false;
	}
	
}
