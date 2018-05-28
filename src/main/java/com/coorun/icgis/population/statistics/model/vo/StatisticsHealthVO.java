package com.coorun.icgis.population.statistics.model.vo;

import java.io.Serializable;

public class StatisticsHealthVO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6263483477564245807L;
	
	private String buildingName;
	private int health;
	private int slowHealth;
	private int weigthHealth;
	private int badHealth;
	private int othersHealth;
	private int allHealth;
	
	
	public StatisticsHealthVO() {
		super();
	}
	
	
	public StatisticsHealthVO(String buildingName, int health, int slowHealth, int weigthHealth, int badHealth,
			int othersHealth, int allHealth) {
		super();
		this.buildingName = buildingName;
		this.health = health;
		this.slowHealth = slowHealth;
		this.weigthHealth = weigthHealth;
		this.badHealth = badHealth;
		this.othersHealth = othersHealth;
		this.allHealth = allHealth;
	}



	public String getBuildingName() {
		return buildingName;
	}
	public void setBuildingName(String buildingName) {
		this.buildingName = buildingName;
	}
	public int getHealth() {
		return health;
	}
	public void setHealth(int health) {
		this.health = health;
	}
	public int getSlowHealth() {
		return slowHealth;
	}
	public void setSlowHealth(int slowHealth) {
		this.slowHealth = slowHealth;
	}
	public int getWeigthHealth() {
		return weigthHealth;
	}
	public void setWeigthHealth(int weigthHealth) {
		this.weigthHealth = weigthHealth;
	}
	public int getBadHealth() {
		return badHealth;
	}
	public void setBadHealth(int badHealth) {
		this.badHealth = badHealth;
	}
	public int getOthersHealth() {
		return othersHealth;
	}
	public void setOthersHealth(int othersHealth) {
		this.othersHealth = othersHealth;
	}
	public int getAllHealth() {
		return allHealth;
	}
	public void setAllHealth(int allHealth) {
		this.allHealth = allHealth;
	}
	
	
}
