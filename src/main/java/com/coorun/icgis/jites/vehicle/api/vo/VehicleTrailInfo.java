package com.coorun.icgis.jites.vehicle.api.vo;

import java.io.Serializable;

public class VehicleTrailInfo implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 4036513021161695309L;
	
	private String deviceId;
	
	private String deviceName = "";
	
	private String lon = "";
	
	private String lat = "";
	
	private String count = "";
	
	private String lastTime = "";

	public String getDeviceId() {
		return deviceId;
	}

	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId;
	}

	public String getDeviceName() {
		return deviceName;
	}

	public void setDeviceName(String deviceName) {
		this.deviceName = deviceName;
	}

	public String getLon() {
		return lon;
	}

	public void setLon(String lon) {
		this.lon = lon;
	}

	public String getLat() {
		return lat;
	}

	public void setLat(String lat) {
		this.lat = lat;
	}

	public String getCount() {
		return count;
	}

	public void setCount(String count) {
		this.count = count;
	}

	public String getLastTime() {
		return lastTime;
	}

	public void setLastTime(String lastTime) {
		this.lastTime = lastTime;
	}
	
}
