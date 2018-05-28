package com.coorun.icgis.population.statistics.model.vo;

import java.io.Serializable;

public class StatisticsEducationVO implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 6743647991255426447L;
	
	private String buildingName;
	// 研究生
	private int postgraduate;
	// 本科
	private int undergraduate;
	// 大专
	private int junior;
	// 中专
	private int secondary;
	// 高中
	private int highSchool;
	// 初中
	private int middleSchool;
	// 小学
	private int primarySchool;
	// 幼儿园
	private int kindergarten;
	// 文盲
	private int illiteracy;
	private int allEducation;
	
	public StatisticsEducationVO() {
		super();
	}

	public StatisticsEducationVO(String buildingName, int postgraduate, int undergraduate, int junior, int secondary,
			int highSchool, int middleSchool, int primarySchool, int kindergarten, int illiteracy, int allEducation) {
		super();
		this.buildingName = buildingName;
		this.postgraduate = postgraduate;
		this.undergraduate = undergraduate;
		this.junior = junior;
		this.secondary = secondary;
		this.highSchool = highSchool;
		this.middleSchool = middleSchool;
		this.primarySchool = primarySchool;
		this.kindergarten = kindergarten;
		this.illiteracy = illiteracy;
		this.allEducation = allEducation;
	}

	public String getBuildingName() {
		return buildingName;
	}

	public void setBuildingName(String buildingName) {
		this.buildingName = buildingName;
	}

	public int getPostgraduate() {
		return postgraduate;
	}

	public void setPostgraduate(int postgraduate) {
		this.postgraduate = postgraduate;
	}

	public int getUndergraduate() {
		return undergraduate;
	}

	public void setUndergraduate(int undergraduate) {
		this.undergraduate = undergraduate;
	}

	public int getJunior() {
		return junior;
	}

	public void setJunior(int junior) {
		this.junior = junior;
	}

	public int getSecondary() {
		return secondary;
	}

	public void setSecondary(int secondary) {
		this.secondary = secondary;
	}

	public int getHighSchool() {
		return highSchool;
	}

	public void setHighSchool(int highSchool) {
		this.highSchool = highSchool;
	}

	public int getMiddleSchool() {
		return middleSchool;
	}

	public void setMiddleSchool(int middleSchool) {
		this.middleSchool = middleSchool;
	}

	public int getPrimarySchool() {
		return primarySchool;
	}

	public void setPrimarySchool(int primarySchool) {
		this.primarySchool = primarySchool;
	}

	public int getKindergarten() {
		return kindergarten;
	}

	public void setKindergarten(int kindergarten) {
		this.kindergarten = kindergarten;
	}

	public int getIlliteracy() {
		return illiteracy;
	}

	public void setIlliteracy(int illiteracy) {
		this.illiteracy = illiteracy;
	}

	public int getAllEducation() {
		return allEducation;
	}

	public void setAllEducation(int allEducation) {
		this.allEducation = allEducation;
	}
	
}
