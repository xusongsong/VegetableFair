package com.coorun.icgis.population.statistics.model.vo;

import java.io.Serializable;
import java.util.List;

import com.coorun.icgis.population.statistics.model.PoliticalSum;

public class StatisticsPoliticalTotalVO implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 3420960610796084790L;
	
	private List<String> politicalItems;
	private List<StatisticsPoliticalVO> statisticsPoliticalVOs;
	private PoliticalSum politicalSum;
	public List<String> getPoliticalItems() {
		return politicalItems;
	}
	public void setPoliticalItems(List<String> politicalItems) {
		this.politicalItems = politicalItems;
	}
	public List<StatisticsPoliticalVO> getStatisticsPoliticalVOs() {
		return statisticsPoliticalVOs;
	}
	public void setStatisticsPoliticalVOs(List<StatisticsPoliticalVO> statisticsPoliticalVOs) {
		this.statisticsPoliticalVOs = statisticsPoliticalVOs;
	}
	public PoliticalSum getPoliticalSum() {
		return politicalSum;
	}
	public void setPoliticalSum(PoliticalSum politicalSum) {
		this.politicalSum = politicalSum;
	}
	
}
