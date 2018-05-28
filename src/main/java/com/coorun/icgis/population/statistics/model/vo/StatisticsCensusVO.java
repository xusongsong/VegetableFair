package com.coorun.icgis.population.statistics.model.vo;

import java.io.Serializable;

public class StatisticsCensusVO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7095986153187981393L;
	
	private String buildingName;
	private int nativePeople;
	private int outlandPeople;
	private int peopleCount;
	
	public String getBuildingName() {
		return buildingName;
	}
	public void setBuildingName(String buildingName) {
		this.buildingName = buildingName;
	}
	public int getNativePeople() {
		return nativePeople;
	}
	public void setNativePeople(int nativePeople) {
		this.nativePeople = nativePeople;
	}
	public int getOutlandPeople() {
		return outlandPeople;
	}
	public void setOutlandPeople(int outlandPeople) {
		this.outlandPeople = outlandPeople;
	}
	public int getPeopleCount() {
		return peopleCount;
	}
	public void setPeopleCount(int peopleCount) {
		this.peopleCount = peopleCount;
	}
	
}
