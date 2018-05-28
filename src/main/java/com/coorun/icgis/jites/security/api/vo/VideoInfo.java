package com.coorun.icgis.jites.security.api.vo;

import java.io.Serializable;

public class VideoInfo implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 7106634634706231846L;

	private String videourl;
	
	private String serial_no;

	public String getVideourl() {
		return videourl;
	}

	public void setVideourl(String videourl) {
		this.videourl = videourl;
	}

	public String getSerial_no() {
		return serial_no;
	}

	public void setSerial_no(String serial_no) {
		this.serial_no = serial_no;
	}
	
	
}
