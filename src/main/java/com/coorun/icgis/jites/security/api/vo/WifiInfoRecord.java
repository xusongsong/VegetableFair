package com.coorun.icgis.jites.security.api.vo;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class WifiInfoRecord implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -5308741601013434813L;
	
	private String num;
	
	@JsonProperty("MACAddress")
	private String MACAddress;
	
	private String time;
	
	private String signalStrength;

	public String getNum() {
		return num;
	}

	public void setNum(String num) {
		this.num = num;
	}
	
	
	public String getTime() {
		return time;
	}
	
	@JsonIgnore
	public String getMACAddress() {
		return MACAddress;
	}

	public void setMACAddress(String mACAddress) {
		MACAddress = mACAddress;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getSignalStrength() {
		return signalStrength;
	}

	public void setSignalStrength(String signalStrength) {
		this.signalStrength = signalStrength;
	}
	
}
