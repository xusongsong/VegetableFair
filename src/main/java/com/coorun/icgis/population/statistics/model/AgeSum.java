package com.coorun.icgis.population.statistics.model;

import java.io.Serializable;

public class AgeSum implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 685481057991460159L;
	
	private int tenSum;
	private int twentySum;
	private int thirtySum;
	private int fortySum;
	private int fiftySum;
	private int moreFiftySum;
	private int allSum;
	
	public AgeSum() {
		super();
	}
	
	public AgeSum(int tenSum, int twentySum, int thirtySum, int fortySum, int fiftySum, int moreFiftySum, int allSum) {
		super();
		this.tenSum = tenSum;
		this.twentySum = twentySum;
		this.thirtySum = thirtySum;
		this.fortySum = fortySum;
		this.fiftySum = fiftySum;
		this.moreFiftySum = moreFiftySum;
		this.allSum = allSum;
	}

	public int getTenSum() {
		return tenSum;
	}
	public void setTenSum(int tenSum) {
		this.tenSum = tenSum;
	}
	public int getTwentySum() {
		return twentySum;
	}
	public void setTwentySum(int twentySum) {
		this.twentySum = twentySum;
	}
	public int getThirtySum() {
		return thirtySum;
	}
	public void setThirtySum(int thirtySum) {
		this.thirtySum = thirtySum;
	}
	public int getFortySum() {
		return fortySum;
	}
	public void setFortySum(int fortySum) {
		this.fortySum = fortySum;
	}
	public int getFiftySum() {
		return fiftySum;
	}
	public void setFiftySum(int fiftySum) {
		this.fiftySum = fiftySum;
	}
	public int getMoreFiftySum() {
		return moreFiftySum;
	}
	public void setMoreFiftySum(int moreFiftySum) {
		this.moreFiftySum = moreFiftySum;
	}
	public int getAllSum() {
		return allSum;
	}
	public void setAllSum(int allSum) {
		this.allSum = allSum;
	}
	
}
