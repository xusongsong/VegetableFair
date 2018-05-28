package com.coorun.om.base.util;

/********************************
 *
 * Author : Billy Create Date : 2017-9-13上午9:39:03 Desc : 返回结果处理
 *
 ********************************/

public class RetResult<T> {
	// 0:处理失败 1:处理成功
	private String success="1";
	// 处理消息
	private String msg;
	// 返回结果集
	private T record;

	public String getSuccess() {
		return success;
	}

	public void setSuccess(String success) {
		this.success = success;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public T getRecord() {
		return record;
	}

	public void setRecord(T record) {
		this.record = record;
	}

	@Override
	public String toString() {
		return "RetResult [success=" + success + ", msg=" + msg + ", record=" + record + "]";
	}

}
