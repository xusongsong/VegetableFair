package com.coorun.icgis.jites.security.api.vo;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ClimbInfoRecord implements Serializable{

	
	/**
	 * 
	 */
	private static final long serialVersionUID = 7058381984902462501L;

	@JsonProperty("Id")
	private String Id = "";
	
	private String deviceId = "";
	
	private String deviceName = "";
	
	private String time = "";
	
	private String duration = "";
	
	private String linkDevice = "";
	
	private String videoUrl = "";
	
	private String imgUrl = "";

	@JsonIgnore
	public String getId() {
		return Id;
	}

	public void setId(String id) {
		Id = id;
	}

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

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public String getLinkDevice() {
		return linkDevice;
	}

	public void setLinkDevice(String linkDevice) {
		this.linkDevice = linkDevice;
	}

	public String getVideoUrl() {
		return videoUrl;
	}

	public void setVideoUrl(String videoUrl) {
		this.videoUrl = videoUrl;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}
	
	
}
