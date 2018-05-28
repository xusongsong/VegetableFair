package com.coorun.icgis.jites.security.api.vo;

import java.io.Serializable;

public class ClimbRecordRequest implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 2319047959950707472L;
	
	//UUID
	private String communityId;
	
	//设备id
	private String deviceId;
	
	//楼层
	private String floorId;
	
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

	public String getFloorId() {
		return floorId;
	}

	public void setFloorId(String floorId) {
		this.floorId = floorId;
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
