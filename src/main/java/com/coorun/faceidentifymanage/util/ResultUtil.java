package com.coorun.faceidentifymanage.util;

import java.io.Serializable;

/**
 * 作为调用REST接口的返回对象
 * @author wuja
 * 2015年9月5日
 */
public class ResultUtil implements Serializable{

	private static final long serialVersionUID = 1L;

	/**状态码*/
	private String code;

	/**提示信息*/
	private String msg;
	
	/**返回数据结果集*/
	private String data;

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

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	@Override
	public String toString() {
		return "ResultUtil{" +
				"code='" + code + '\'' +
				", msg='" + msg + '\'' +
				", data=" + data +
				'}';
	}
}
