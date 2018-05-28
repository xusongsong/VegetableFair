package com.coorun.icgis.population.statistics.model.vo;

import java.io.Serializable;
import java.util.List;

import com.coorun.icgis.population.statistics.model.MaritalSum;

public class StatisticsMaritalTotalVO implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 609498615172710253L;

	private List<String> maritalItems;
	private List<StatisticsMaritalVO> statisticsMaritalVOs;
	private MaritalSum maritalSum;
	
	
	public List<String> getMaritalItems() {
		return maritalItems;
	}
	public void setMaritalItems(List<String> maritalItems) {
		this.maritalItems = maritalItems;
	}
	public List<StatisticsMaritalVO> getStatisticsMaritalVOs() {
		return statisticsMaritalVOs;
	}
	public void setStatisticsMaritalVOs(List<StatisticsMaritalVO> statisticsMaritalVOs) {
		this.statisticsMaritalVOs = statisticsMaritalVOs;
	}
	public MaritalSum getMaritalSum() {
		return maritalSum;
	}
	public void setMaritalSum(MaritalSum maritalSum) {
		this.maritalSum = maritalSum;
	}
	
}