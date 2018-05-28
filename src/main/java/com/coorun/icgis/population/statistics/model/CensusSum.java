package com.coorun.icgis.population.statistics.model;

import java.io.Serializable;

public class CensusSum implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -8351248315355245943L;

	// 本地
	private int nativeSum;
	// 外地
	private int outLanderSum;
	private int censusAllSum;
	
	public CensusSum() {
		super();
	}
	
	public CensusSum(int nativeSum, int outLanderSum, int censusAllSum) {
		super();
		this.nativeSum = nativeSum;
		this.outLanderSum = outLanderSum;
		this.censusAllSum = censusAllSum;
	}
	
	public int getNativeSum() {
		return nativeSum;
	}
	public void setNativeSum(int nativeSum) {
		this.nativeSum = nativeSum;
	}
	public int getOutLanderSum() {
		return outLanderSum;
	}
	public void setOutLanderSum(int outLanderSum) {
		this.outLanderSum = outLanderSum;
	}
	public int getCensusAllSum() {
		return censusAllSum;
	}
	public void setCensusAllSum(int censusAllSum) {
		this.censusAllSum = censusAllSum;
	}
	
	
}
