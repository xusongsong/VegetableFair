package com.coorun.icgis.population.statistics.model;

import java.io.Serializable;

public class MaritalSum implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 9131927953549947453L;
	
	// 丧偶
	private int widowedSum;
	// 离异
	private int divorcedSum;
	// 在婚
	private int weddingSum;
	// 初婚
	private int firstMarriageSum;
	// 未婚
	private int unMarriedSum;
	private int allSum;
	
	public MaritalSum() {
		super();
	}

	public MaritalSum(int widowedSum, int divorcedSum, int weddingSum, int firstMarriageSum, int unMarriedSum,
			int allSum) {
		super();
		this.widowedSum = widowedSum;
		this.divorcedSum = divorcedSum;
		this.weddingSum = weddingSum;
		this.firstMarriageSum = firstMarriageSum;
		this.unMarriedSum = unMarriedSum;
		this.allSum = allSum;
	}

	public int getWidowedSum() {
		return widowedSum;
	}
	public void setWidowedSum(int widowedSum) {
		this.widowedSum = widowedSum;
	}
	public int getDivorcedSum() {
		return divorcedSum;
	}
	public void setDivorcedSum(int divorcedSum) {
		this.divorcedSum = divorcedSum;
	}
	public int getWeddingSum() {
		return weddingSum;
	}
	public void setWeddingSum(int weddingSum) {
		this.weddingSum = weddingSum;
	}
	public int getFirstMarriageSum() {
		return firstMarriageSum;
	}
	public void setFirstMarriageSum(int firstMarriageSum) {
		this.firstMarriageSum = firstMarriageSum;
	}
	public int getUnMarriedSum() {
		return unMarriedSum;
	}
	public void setUnMarriedSum(int unMarriedSum) {
		this.unMarriedSum = unMarriedSum;
	}
	public int getAllSum() {
		return allSum;
	}
	public void setAllSum(int allSum) {
		this.allSum = allSum;
	}
	
}
