package com.coorun.icgis.jites.vehicle.api.vo;

import java.io.Serializable;

public class TrafficFlowInfo implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -3138809526342040228L;

	private String inCount;
	
	private String ownerCount;
	
	private String outCount;
	
	private String foreignCount;
	
	private String allParkingCount;
	
	private String useParkingCount;
	
	private String status;

	public String getInCount() {
		return inCount;
	}

	public void setInCount(String inCount) {
		this.inCount = inCount;
	}

	public String getOwnerCount() {
		return ownerCount;
	}

	public void setOwnerCount(String ownerCount) {
		this.ownerCount = ownerCount;
	}

	public String getOutCount() {
		return outCount;
	}

	public void setOutCount(String outCount) {
		this.outCount = outCount;
	}

	public String getForeignCount() {
		return foreignCount;
	}

	public void setForeignCount(String foreignCount) {
		this.foreignCount = foreignCount;
	}

	public String getAllParkingCount() {
		return allParkingCount;
	}

	public void setAllParkingCount(String allParkingCount) {
		this.allParkingCount = allParkingCount;
	}

	public String getUseParkingCount() {
		return useParkingCount;
	}

	public void setUseParkingCount(String useParkingCount) {
		this.useParkingCount = useParkingCount;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	
}
