package com.coorun.icgis.population.statistics.model.vo;

import java.io.Serializable;
import java.util.List;

import com.coorun.icgis.population.statistics.model.EducationSum;

public class StatisticsEducationTotalVO implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 7049206756803943207L;
	
	private List<String> educationItems;
	private List<StatisticsEducationVO> statisticsEducationVOs;
	private EducationSum educationSum;
	
	public List<String> getEducationItems() {
		return educationItems;
	}
	public void setEducationItems(List<String> educationItems) {
		this.educationItems = educationItems;
	}
	public List<StatisticsEducationVO> getStatisticsEducationVOs() {
		return statisticsEducationVOs;
	}
	public void setStatisticsEducationVOs(List<StatisticsEducationVO> statisticsEducationVOs) {
		this.statisticsEducationVOs = statisticsEducationVOs;
	}
	public EducationSum getEducationSum() {
		return educationSum;
	}
	public void setEducationSum(EducationSum educationSum) {
		this.educationSum = educationSum;
	}
}
