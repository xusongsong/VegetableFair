package com.coorun.icgis.population.statistics.model;

import java.io.Serializable;

public class HealthSum implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2953693286514053634L;
	
	// 健康
	private int healthSum;
	// 慢病
	private int slowHealthSum;
	// 重症
	private int weightHealthSum;
	// 残疾
	private int badHealthSum;
	// 其他疾病
	private int othersHealthSum;
	// 总计
	private int allSum;
	
	public HealthSum() {
		super();
	}
	
	public HealthSum(int healthSum, int slowHealthSum, int weightHealthSum, int badHealthSum, int othersHealthSum,
			int allSum) {
		super();
		this.healthSum = healthSum;
		this.slowHealthSum = slowHealthSum;
		this.weightHealthSum = weightHealthSum;
		this.badHealthSum = badHealthSum;
		this.othersHealthSum = othersHealthSum;
		this.allSum = allSum;
	}

	public int getHealthSum() {
		return healthSum;
	}
	public void setHealthSum(int healthSum) {
		this.healthSum = healthSum;
	}
	public int getSlowHealthSum() {
		return slowHealthSum;
	}
	public void setSlowHealthSum(int slowHealthSum) {
		this.slowHealthSum = slowHealthSum;
	}
	public int getWeightHealthSum() {
		return weightHealthSum;
	}
	public void setWeightHealthSum(int weightHealthSum) {
		this.weightHealthSum = weightHealthSum;
	}
	public int getBadHealthSum() {
		return badHealthSum;
	}
	public void setBadHealthSum(int badHealthSum) {
		this.badHealthSum = badHealthSum;
	}
	public int getOthersHealthSum() {
		return othersHealthSum;
	}
	public void setOthersHealthSum(int othersHealthSum) {
		this.othersHealthSum = othersHealthSum;
	}
	public int getAllSum() {
		return allSum;
	}
	public void setAllSum(int allSum) {
		this.allSum = allSum;
	}
	
}
