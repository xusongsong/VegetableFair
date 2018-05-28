package com.coorun.icgis.population.statistics.model.vo;

import java.io.Serializable;
import java.util.List;

import com.coorun.icgis.population.statistics.model.SexSum;

public class StatisticsSexTotalVO implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -8356399631687736429L;
	
	private List<String> sexItems;
	private List<StatisticsSexVO> statisticsSexVOs;
	private SexSum sexSum;
	public List<StatisticsSexVO> getStatisticsSexVOs() {
		return statisticsSexVOs;
	}
	public void setStatisticsSexVOs(List<StatisticsSexVO> statisticsSexVOs) {
		this.statisticsSexVOs = statisticsSexVOs;
	}
	public SexSum getSexSum() {
		return sexSum;
	}
	public void setSexSum(SexSum sexSum) {
		this.sexSum = sexSum;
	}
	public List<String> getSexItems() {
		return sexItems;
	}
	public void setSexItems(List<String> sexItems) {
		this.sexItems = sexItems;
	}
	
}
