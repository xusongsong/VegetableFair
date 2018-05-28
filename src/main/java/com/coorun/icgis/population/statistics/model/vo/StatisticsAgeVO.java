package com.coorun.icgis.population.statistics.model.vo;

import java.io.Serializable;

public class StatisticsAgeVO implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -7269474097096981640L;
	
	private String buildingName;
	private int ten;
	private int twenty;
	private int thirty;
	private int forty;
	private int fifty;
	private int moreFifty;
	private int ageCount;
	
	public StatisticsAgeVO() {
		super();
	}
	
	public StatisticsAgeVO(String buildingName, int ten, int twenty, int thirty, int forty, int fifty, int moreFifty,
			int ageCount) {
		super();
		this.buildingName = buildingName;
		this.ten = ten;
		this.twenty = twenty;
		this.thirty = thirty;
		this.forty = forty;
		this.fifty = fifty;
		this.moreFifty = moreFifty;
		this.ageCount = ageCount;
	}
	
	public String getBuildingName() {
		return buildingName;
	}
	public void setBuildingName(String buildingName) {
		this.buildingName = buildingName;
	}
	public int getTen() {
		return ten;
	}
	public void setTen(int ten) {
		this.ten = ten;
	}
	public int getTwenty() {
		return twenty;
	}
	public void setTwenty(int twenty) {
		this.twenty = twenty;
	}
	public int getThirty() {
		return thirty;
	}
	public void setThirty(int thirty) {
		this.thirty = thirty;
	}
	public int getForty() {
		return forty;
	}
	public void setForty(int forty) {
		this.forty = forty;
	}
	public int getFifty() {
		return fifty;
	}
	public void setFifty(int fifty) {
		this.fifty = fifty;
	}
	public int getMoreFifty() {
		return moreFifty;
	}
	public void setMoreFifty(int moreFifty) {
		this.moreFifty = moreFifty;
	}
	public int getAgeCount() {
		return ageCount;
	}
	public void setAgeCount(int ageCount) {
		this.ageCount = ageCount;
	}
}
