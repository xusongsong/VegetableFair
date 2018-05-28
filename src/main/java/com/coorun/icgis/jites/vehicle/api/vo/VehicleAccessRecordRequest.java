package com.coorun.icgis.jites.vehicle.api.vo;

import java.io.Serializable;


public class VehicleAccessRecordRequest implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 4744360962191969751L;

   /* |参数名称|是否必须|类型|描述|
	* |---|---|---|---|
	* |communityId|false|string|UUID|
	* |deviceId|false|int|设备id|
	* |carType|false|string|0-业主 1-访客|
	* |inoutType|false|string|0-进入 1-驶出|
	* |carId|false|string|车牌号|
	* |startTime|false|string|查询起始时间|
	* |endTime|false|string|查询结束时间|
	* */
	private String communityId;
	
	private String deviceId;
	
	private String carType;
	
	private String inoutType;
	
	private String carId;
	
	private String startTime;
	
	private String endTime;

	public String getCommunityId() {
		return communityId;
	}

	public void setCommunityId(String communityId) {
		this.communityId = communityId;
	}

	public String getDeviceId() {
		return deviceId;
	}

	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId;
	}

	public String getCarType() {
		return carType;
	}

	public void setCarType(String carType) {
		this.carType = carType;
	}

	public String getInoutType() {
		return inoutType;
	}

	public void setInoutType(String inoutType) {
		this.inoutType = inoutType;
	}

	public String getCarId() {
		return carId;
	}

	public void setCarId(String carId) {
		this.carId = carId;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	
}
