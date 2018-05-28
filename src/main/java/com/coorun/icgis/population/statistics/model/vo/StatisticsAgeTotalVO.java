package com.coorun.icgis.population.statistics.model.vo;

import java.io.Serializable;
import java.util.List;

import com.coorun.icgis.population.statistics.model.AgeSum;

public class StatisticsAgeTotalVO implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -4566847134250333142L;
	
	private List<String> ageItems;
	private List<StatisticsAgeVO> statisticsAgeVOs;
	private AgeSum ageSum;
	
	public List<String> getAgeItems() {
		return ageItems;
	}
	public void setAgeItems(List<String> ageItems) {
		this.ageItems = ageItems;
	}
	public List<StatisticsAgeVO> getStatisticsAgeVOs() {
		return statisticsAgeVOs;
	}
	public void setStatisticsAgeVOs(List<StatisticsAgeVO> statisticsAgeVOs) {
		this.statisticsAgeVOs = statisticsAgeVOs;
	}
	public AgeSum getAgeSum() {
		return ageSum;
	}
	public void setAgeSum(AgeSum ageSum) {
		this.ageSum = ageSum;
	}
	
}
