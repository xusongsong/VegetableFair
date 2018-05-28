package com.coorun.icgis.population.statistics.service;

import java.util.List;

import com.coorun.icgis.jites.geodo.api.bean.CommunityGenraalInfo;
import com.coorun.icgis.population.statistics.model.vo.StatisticsAgeTotalVO;
import com.coorun.icgis.population.statistics.model.vo.StatisticsCensusTotalVO;
import com.coorun.icgis.population.statistics.model.vo.StatisticsEducationTotalVO;
import com.coorun.icgis.population.statistics.model.vo.StatisticsHealthTotalVO;
import com.coorun.icgis.population.statistics.model.vo.StatisticsMaritalTotalVO;
import com.coorun.icgis.population.statistics.model.vo.StatisticsPoliticalTotalVO;
import com.coorun.icgis.population.statistics.model.vo.StatisticsSexTotalVO;

public interface IPopulationStatisticsService {
	
	/**
	 * 人口比例数据
	 * @param token
	 * @return
	 * @throws Exception
	 */
	public StatisticsSexTotalVO getPopulationStatisticsSex(String token) throws Exception;
	
	/**
	 * 户籍比例数据
	 * @param token
	 * @return
	 * @throws Exception
	 */
	public StatisticsCensusTotalVO getPopulationStatisticsCensus(String token) throws Exception;
	
	/**
	 * 健康统计数据
	 * @param token
	 * @return
	 * @throws Exception
	 */
	public StatisticsHealthTotalVO getPopulationStatisticsHealth(String token) throws Exception;
	
	/**
	 * 婚姻状况
	 * @param token
	 * @return
	 * @throws Exception
	 */
	public StatisticsMaritalTotalVO getPopulationStatisticsMarital(String token) throws Exception;

	/**
	 * 文化程度
	 * @param token
	 * @return
	 * @throws Exception
	 */
	public StatisticsEducationTotalVO getPopulationStatisticsEducation(String token) throws Exception;
	
	/**
	 * 政治面貌
	 * @param token
	 * @return
	 * @throws Exception
	 */
	public StatisticsPoliticalTotalVO getPopulationStatisticsPolitical(String token) throws Exception;
	
	/**
	 * 年龄分布
	 * @param token
	 * @return
	 * @throws Exception
	 */
	public StatisticsAgeTotalVO getPopulationStatisticsAge(String token) throws Exception;
	
	
	/**
	 * 社区每栋楼总人口数
	 * @param token
	 * @return
	 * @throws Exception
	 */
	public List<CommunityGenraalInfo> getPopulationStatisticsCommunityGenraalInfo(String token) throws Exception;

}
