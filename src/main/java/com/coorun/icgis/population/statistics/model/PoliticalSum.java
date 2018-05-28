package com.coorun.icgis.population.statistics.model;

import java.io.Serializable;

public class PoliticalSum implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -3757037285196389610L;
	
	// 群众
	private int crowdSum;
	// 党员
	private int partyMemberSum;
	// 团员
	private int groupMemberSum;
	// 其他党派
	private int othersSum;
	private int allSum;
	
	public PoliticalSum() {
		super();
	}
	
	public PoliticalSum(int crowdSum, int partyMemberSum, int groupMemberSum, int othersSum, int allSum) {
		super();
		this.crowdSum = crowdSum;
		this.partyMemberSum = partyMemberSum;
		this.groupMemberSum = groupMemberSum;
		this.othersSum = othersSum;
		this.allSum = allSum;
	}

	public int getCrowdSum() {
		return crowdSum;
	}
	public void setCrowdSum(int crowdSum) {
		this.crowdSum = crowdSum;
	}
	public int getPartyMemberSum() {
		return partyMemberSum;
	}
	public void setPartyMemberSum(int partyMemberSum) {
		this.partyMemberSum = partyMemberSum;
	}
	public int getGroupMemberSum() {
		return groupMemberSum;
	}
	public void setGroupMemberSum(int groupMemberSum) {
		this.groupMemberSum = groupMemberSum;
	}
	public int getOthersSum() {
		return othersSum;
	}
	public void setOthersSum(int othersSum) {
		this.othersSum = othersSum;
	}
	public int getAllSum() {
		return allSum;
	}
	public void setAllSum(int allSum) {
		this.allSum = allSum;
	}
	
}
