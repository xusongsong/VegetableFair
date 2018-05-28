package com.coorun.icgis.population.statistics.model.vo;

import java.io.Serializable;
import java.util.List;

import com.coorun.icgis.population.statistics.model.CensusSum;

public class StatisticsCensusTotalVO implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -6019472834033458026L;
	
	private List<StatisticsCensusVO> statisticsCensusVOs;
	private CensusSum censusSum;
	
	public List<StatisticsCensusVO> getStatisticsCensusVOs() {
		return statisticsCensusVOs;
	}
	public void setStatisticsCensusVOs(List<StatisticsCensusVO> statisticsCensusVOs) {
		this.statisticsCensusVOs = statisticsCensusVOs;
	}
	public CensusSum getCensusSum() {
		return censusSum;
	}
	public void setCensusSum(CensusSum censusSum) {
		this.censusSum = censusSum;
	}
	
}
