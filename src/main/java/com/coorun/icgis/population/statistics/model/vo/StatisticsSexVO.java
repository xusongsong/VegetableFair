package com.coorun.icgis.population.statistics.model.vo;

import java.io.Serializable;

public class StatisticsSexVO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 92573871863160225L;
	
	// 楼号
	private String buildingName;
	private int men;
	private int women;
	private int peopleCount;
	
	public String getBuildingName() {
		return buildingName;
	}
	public void setBuildingName(String buildingName) {
		this.buildingName = buildingName;
	}
	public int getMen() {
		return men;
	}
	public void setMen(int men) {
		this.men = men;
	}
	public int getWomen() {
		return women;
	}
	public void setWomen(int women) {
		this.women = women;
	}
	public int getPeopleCount() {
		return peopleCount;
	}
	public void setPeopleCount(int peopleCount) {
		this.peopleCount = peopleCount;
	}
	
}
