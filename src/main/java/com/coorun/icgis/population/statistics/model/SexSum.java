package com.coorun.icgis.population.statistics.model;

import java.io.Serializable;

public class SexSum implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3407944159317724929L;
	
	private int menSum;
	private int womenSum;
	private int allSum;
	
	
	public SexSum() {
		super();
	}
	public SexSum(int menSum, int womenSum, int allSum) {
		super();
		this.menSum = menSum;
		this.womenSum = womenSum;
		this.allSum = allSum;
	}
	public int getMenSum() {
		return menSum;
	}
	public void setMenSum(int menSum) {
		this.menSum = menSum;
	}
	public int getWomenSum() {
		return womenSum;
	}
	public void setWomenSum(int womenSum) {
		this.womenSum = womenSum;
	}
	public int getAllSum() {
		return allSum;
	}
	public void setAllSum(int allSum) {
		this.allSum = allSum;
	}
	
}
