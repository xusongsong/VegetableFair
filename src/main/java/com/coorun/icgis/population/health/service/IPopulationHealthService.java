package com.coorun.icgis.population.health.service;

import java.util.List;

import com.coorun.icgis.jites.geodo.api.bean.HealthDetailInfo;
import com.coorun.icgis.jites.geodo.api.response.HealthStatisticsInfoResponse;

public interface IPopulationHealthService {
	
	/**
	 * 健康统计数据：高血压、糖尿病
	 * @return
	 * @throws Exception
	 */
	public HealthStatisticsInfoResponse getPopulationHealthStatistics(String token, String queryFlag) throws Exception;

	public HealthDetailInfo getPopulationStatisticsPerson(String token, String condition) throws Exception;
}
