package com.coorun.icgis.population.statistics.model;

import java.io.Serializable;

public class EducationSum implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -5794153417052285521L;
	
	// 研究生
	private int postgraduateSum;
	// 本科
	private int undergraduateSum;
	// 大专
	private int juniorSum;
	// 中专
	private int secondarySum;
	// 高中
	private int highSchoolSum;
	// 初中
	private int middleSchoolSum;
	// 小学
	private int primarySchoolSum;
	// 幼儿园
	private int kindergartenSum;
	// 文盲
	private int illiteracySum;
	private int allSum;
	
	public EducationSum() {
		super();
	}
	
	public EducationSum(int postgraduateSum, int undergraduateSum, int juniorSum, int secondarySum, int highSchoolSum,
			int middleSchoolSum, int primarySchoolSum, int kindergartenSum, int illiteracySum, int allSum) {
		super();
		this.postgraduateSum = postgraduateSum;
		this.undergraduateSum = undergraduateSum;
		this.juniorSum = juniorSum;
		this.secondarySum = secondarySum;
		this.highSchoolSum = highSchoolSum;
		this.middleSchoolSum = middleSchoolSum;
		this.primarySchoolSum = primarySchoolSum;
		this.kindergartenSum = kindergartenSum;
		this.illiteracySum = illiteracySum;
		this.allSum = allSum;
	}



	public int getPostgraduateSum() {
		return postgraduateSum;
	}
	public void setPostgraduateSum(int postgraduateSum) {
		this.postgraduateSum = postgraduateSum;
	}
	public int getUndergraduateSum() {
		return undergraduateSum;
	}
	public void setUndergraduateSum(int undergraduateSum) {
		this.undergraduateSum = undergraduateSum;
	}
	public int getJuniorSum() {
		return juniorSum;
	}
	public void setJuniorSum(int juniorSum) {
		this.juniorSum = juniorSum;
	}
	public int getSecondarySum() {
		return secondarySum;
	}
	public void setSecondarySum(int secondarySum) {
		this.secondarySum = secondarySum;
	}
	public int getHighSchoolSum() {
		return highSchoolSum;
	}
	public void setHighSchoolSum(int highSchoolSum) {
		this.highSchoolSum = highSchoolSum;
	}
	public int getMiddleSchoolSum() {
		return middleSchoolSum;
	}
	public void setMiddleSchoolSum(int middleSchoolSum) {
		this.middleSchoolSum = middleSchoolSum;
	}
	public int getPrimarySchoolSum() {
		return primarySchoolSum;
	}
	public void setPrimarySchoolSum(int primarySchoolSum) {
		this.primarySchoolSum = primarySchoolSum;
	}
	public int getKindergartenSum() {
		return kindergartenSum;
	}
	public void setKindergartenSum(int kindergartenSum) {
		this.kindergartenSum = kindergartenSum;
	}
	public int getIlliteracySum() {
		return illiteracySum;
	}
	public void setIlliteracySum(int illiteracySum) {
		this.illiteracySum = illiteracySum;
	}
	public int getAllSum() {
		return allSum;
	}
	public void setAllSum(int allSum) {
		this.allSum = allSum;
	}
	
}
