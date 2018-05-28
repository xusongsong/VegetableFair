package com.coorun.icgis.jites.vehicle.api.vo;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class CarInfo implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 5503839184193015343L;

	@JsonProperty("Id")
	private String Id;
	
	private String carId = "";
	
	private String carType = "";
	
	private String userName = "";
	
	private String registerInfo = "";

	@JsonIgnore
	public String getId() {
		return Id;
	}

	public void setId(String id) {
		Id = id;
	}

	public String getCarId() {
		return carId;
	}

	public void setCarId(String carId) {
		this.carId = carId;
	}

	public String getCarType() {
		return carType;
	}

	public void setCarType(String carType) {
		this.carType = carType;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getRegisterInfo() {
		return registerInfo;
	}

	public void setRegisterInfo(String registerInfo) {
		this.registerInfo = registerInfo;
	}
	
	
}
