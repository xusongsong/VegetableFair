package com.coorun.icgis.population.statistics.model.vo;

import java.io.Serializable;

public class StatisticsMaritalVO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3821272957929810635L;
	
	private String buildingName;
	// 丧偶
	private int widowed;
	// 离异
	private int divorced;
	// 在婚
	private int wedding;
	// 初婚
	private int firstMarriage;
	// 未婚
	private int unMarried;
	private int allMarital;
	
	public StatisticsMaritalVO() {
		super();
	}

	public StatisticsMaritalVO(String buildingName, int widowed, int divorced, int wedding, int firstMarriage,
			int unMarried, int allMarital) {
		super();
		this.buildingName = buildingName;
		this.widowed = widowed;
		this.divorced = divorced;
		this.wedding = wedding;
		this.firstMarriage = firstMarriage;
		this.unMarried = unMarried;
		this.allMarital = allMarital;
	}

	public int getWidowed() {
		return widowed;
	}
	public void setWidowed(int widowed) {
		this.widowed = widowed;
	}
	public int getDivorced() {
		return divorced;
	}
	public void setDivorced(int divorced) {
		this.divorced = divorced;
	}
	public int getWedding() {
		return wedding;
	}
	public void setWedding(int wedding) {
		this.wedding = wedding;
	}
	public int getFirstMarriage() {
		return firstMarriage;
	}
	public void setFirstMarriage(int firstMarriage) {
		this.firstMarriage = firstMarriage;
	}
	public int getUnMarried() {
		return unMarried;
	}
	public void setUnMarried(int unMarried) {
		this.unMarried = unMarried;
	}
	public int getAllMarital() {
		return allMarital;
	}
	public void setAllMarital(int allMarital) {
		this.allMarital = allMarital;
	}

	public String getBuildingName() {
		return buildingName;
	}

	public void setBuildingName(String buildingName) {
		this.buildingName = buildingName;
	}
	
}
