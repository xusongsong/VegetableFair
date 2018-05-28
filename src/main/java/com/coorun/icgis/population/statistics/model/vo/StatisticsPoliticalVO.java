package com.coorun.icgis.population.statistics.model.vo;

import java.io.Serializable;

public class StatisticsPoliticalVO implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 8288668323529789910L;

	private String buildingName;
	// 群众
	private int crowd;
	// 党员
	private int partyMember;
	// 团员
	private int groupMember;
	// 其他党派
	private int others;
	private int allPolitical;
	
	public StatisticsPoliticalVO() {
		super();
	}
	
	public StatisticsPoliticalVO(String buildingName, int crowd, int partyMember, int groupMember, int others,
			int allPolitical) {
		super();
		this.buildingName = buildingName;
		this.crowd = crowd;
		this.partyMember = partyMember;
		this.groupMember = groupMember;
		this.others = others;
		this.allPolitical = allPolitical;
	}

	public String getBuildingName() {
		return buildingName;
	}
	public void setBuildingName(String buildingName) {
		this.buildingName = buildingName;
	}
	public int getCrowd() {
		return crowd;
	}
	public void setCrowd(int crowd) {
		this.crowd = crowd;
	}
	public int getPartyMember() {
		return partyMember;
	}
	public void setPartyMember(int partyMember) {
		this.partyMember = partyMember;
	}
	public int getGroupMember() {
		return groupMember;
	}
	public void setGroupMember(int groupMember) {
		this.groupMember = groupMember;
	}
	public int getOthers() {
		return others;
	}
	public void setOthers(int others) {
		this.others = others;
	}
	public int getAllPolitical() {
		return allPolitical;
	}
	public void setAllPolitical(int allPolitical) {
		this.allPolitical = allPolitical;
	}
}
