package com.coorun.icgis.population.statistics.model.vo;

import java.io.Serializable;
import java.util.List;

import com.coorun.icgis.population.statistics.model.HealthSum;

public class StatisticsHealthTotalVO implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 3521012901640353050L;
	
	private List<String> healthItems;
	private List<StatisticsHealthVO> statisticsHealthVOs;
	private HealthSum healthLinkedSum;
	
	public List<String> getHealthItems() {
		return healthItems;
	}
	public void setHealthItems(List<String> healthItems) {
		this.healthItems = healthItems;
	}
	public List<StatisticsHealthVO> getStatisticsHealthVOs() {
		return statisticsHealthVOs;
	}
	public void setStatisticsHealthVOs(List<StatisticsHealthVO> statisticsHealthVOs) {
		this.statisticsHealthVOs = statisticsHealthVOs;
	}
	public HealthSum getHealthLinkedSum() {
		return healthLinkedSum;
	}
	public void setHealthLinkedSum(HealthSum healthLinkedSum) {
		this.healthLinkedSum = healthLinkedSum;
	}
	
}
