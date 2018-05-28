package com.coorun.icgis.population.statistics.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.ObjectUtils;
import org.springframework.stereotype.Service;

import com.coorun.icgis.jites.geodo.api.bean.CensusItemInfo;
import com.coorun.icgis.jites.geodo.api.bean.CommunityGenraalInfo;
import com.coorun.icgis.jites.geodo.api.bean.HealthItemInfo;
import com.coorun.icgis.jites.geodo.api.client.GeodoClient;
import com.coorun.icgis.jites.geodo.api.response.HealthItemInfoResponse;
import com.coorun.icgis.population.statistics.model.AgeSum;
import com.coorun.icgis.population.statistics.model.CensusSum;
import com.coorun.icgis.population.statistics.model.EducationSum;
import com.coorun.icgis.population.statistics.model.HealthSum;
import com.coorun.icgis.population.statistics.model.MaritalSum;
import com.coorun.icgis.population.statistics.model.PoliticalSum;
import com.coorun.icgis.population.statistics.model.SexSum;
import com.coorun.icgis.population.statistics.model.vo.StatisticsAgeTotalVO;
import com.coorun.icgis.population.statistics.model.vo.StatisticsAgeVO;
import com.coorun.icgis.population.statistics.model.vo.StatisticsCensusTotalVO;
import com.coorun.icgis.population.statistics.model.vo.StatisticsCensusVO;
import com.coorun.icgis.population.statistics.model.vo.StatisticsEducationTotalVO;
import com.coorun.icgis.population.statistics.model.vo.StatisticsEducationVO;
import com.coorun.icgis.population.statistics.model.vo.StatisticsHealthTotalVO;
import com.coorun.icgis.population.statistics.model.vo.StatisticsHealthVO;
import com.coorun.icgis.population.statistics.model.vo.StatisticsMaritalTotalVO;
import com.coorun.icgis.population.statistics.model.vo.StatisticsMaritalVO;
import com.coorun.icgis.population.statistics.model.vo.StatisticsPoliticalTotalVO;
import com.coorun.icgis.population.statistics.model.vo.StatisticsPoliticalVO;
import com.coorun.icgis.population.statistics.model.vo.StatisticsSexTotalVO;
import com.coorun.icgis.population.statistics.model.vo.StatisticsSexVO;
import com.coorun.icgis.population.statistics.service.IPopulationStatisticsService;

@Service
public class PopulationStatisticsServiceImpl implements IPopulationStatisticsService {

	@Override
	public StatisticsSexTotalVO getPopulationStatisticsSex(String token) throws Exception {
		StatisticsSexTotalVO statisticsSexTotalVO = null;
		// 人口比例数据
		List<CensusItemInfo> censusItemInfos = GeodoClient.geoDoPopulationStatisticsCensusSex(token, "s_sex");
		if (censusItemInfos != null) {
			List<StatisticsSexVO> sexStatisVOs = new ArrayList<>();
			int menCount = 0;
			int womenCount = 0;
			for (CensusItemInfo ciInfo : censusItemInfos) {
				StatisticsSexVO sexInfo = new StatisticsSexVO();
				int men = Integer.parseInt(ObjectUtils.defaultIfNull(ciInfo.getIt1(), "0") );
				int women = Integer.parseInt(ObjectUtils.defaultIfNull(ciInfo.getIt2(), "0"));
				int count = men + women;
				sexInfo.setBuildingName(ciInfo.getName());
				sexInfo.setMen(men);
				sexInfo.setWomen(women);
				sexInfo.setPeopleCount(count);
				sexStatisVOs.add(sexInfo);
				
				menCount += men;
				womenCount += women;
			}
			int allCount = menCount + womenCount;
			SexSum sexSum = new SexSum(menCount, womenCount, allCount);
			statisticsSexTotalVO = new StatisticsSexTotalVO();
			List<String> sexItems = new ArrayList<>();
			sexItems.add("男");
			sexItems.add("女");
			statisticsSexTotalVO.setSexItems(sexItems);
			statisticsSexTotalVO.setSexSum(sexSum);
			statisticsSexTotalVO.setStatisticsSexVOs(sexStatisVOs);
		}
		return statisticsSexTotalVO;
	}

	@Override
	public StatisticsCensusTotalVO getPopulationStatisticsCensus(String token) throws Exception {
		StatisticsCensusTotalVO statisticsCensusTotalVO = null;
		// 户籍类型数据
		List<CensusItemInfo> censusItemInfos = GeodoClient.geoDoPopulationStatisticsCensusSex(token, "s_attr");
		if (censusItemInfos != null) {
			List<StatisticsCensusVO> censusVOs = new ArrayList<>();
			int nativeCount = 0;
			int outlandCount = 0;
			for (CensusItemInfo eachCensus : censusItemInfos) {
				StatisticsCensusVO statisticsCensusVO = new StatisticsCensusVO();
				int local = Integer.parseInt(ObjectUtils.defaultIfNull(eachCensus.getIt1(), "0") );
				int outland = Integer.parseInt(ObjectUtils.defaultIfNull(eachCensus.getIt2(), "0"));
				int count = local + outland;
				statisticsCensusVO.setBuildingName(eachCensus.getName());
				statisticsCensusVO.setNativePeople(local);
				statisticsCensusVO.setOutlandPeople(outland);
				statisticsCensusVO.setPeopleCount(count);
				censusVOs.add(statisticsCensusVO);
				
				nativeCount += local;
				outlandCount += outland;
			}
			int allCount = nativeCount + outlandCount;
			CensusSum censusSum = new CensusSum(nativeCount, outlandCount, allCount);
			statisticsCensusTotalVO = new StatisticsCensusTotalVO();
			statisticsCensusTotalVO.setCensusSum(censusSum);
			statisticsCensusTotalVO.setStatisticsCensusVOs(censusVOs);
		}
		return statisticsCensusTotalVO;
	}

	@Override
	public StatisticsHealthTotalVO getPopulationStatisticsHealth(String token) throws Exception {
		StatisticsHealthTotalVO healthTotalVO = null;
		HealthItemInfoResponse res = GeodoClient.geoDoPopulationStatisticsManys(token, "physical_conditions");
		if (res != null) {
			healthTotalVO = new StatisticsHealthTotalVO();
			// 健康描述字段
			healthTotalVO.setHealthItems(res.getFields());
			// 健康集合
			List<HealthItemInfo> itemInfos = res.getHealthItemInfos();
			if (itemInfos != null && itemInfos.size() > 0) {
				int healthCount = 0;
				int slowHealthCount = 0;
				int weightCount = 0;
				int badCount = 0;
				int othersCount = 0;
				List<StatisticsHealthVO> healthVOList = new ArrayList<>();
				for (HealthItemInfo hmInfo : itemInfos) {
					String buildName = hmInfo.getName();
					int health = Integer.parseInt(ObjectUtils.defaultIfNull(hmInfo.getIt0(), "0"));
					int slow = Integer.parseInt(ObjectUtils.defaultIfNull(hmInfo.getIt1(), "0"));
					int weight = Integer.parseInt(ObjectUtils.defaultIfNull(hmInfo.getIt2(), "0"));
					int bad = Integer.parseInt(ObjectUtils.defaultIfNull(hmInfo.getIt3(), "0"));
					int other = Integer.parseInt(ObjectUtils.defaultIfNull(hmInfo.getIt4(), "0"));
					int count = health + slow + weight + bad + other;
					StatisticsHealthVO statisticsHealthVO = new StatisticsHealthVO(buildName, health, slow, weight, bad, other, count);
					healthVOList.add(statisticsHealthVO);
					
					healthCount += health;
					slowHealthCount += slow;
					weightCount += weight;
					badCount += bad;
					othersCount += other;
				}
				int all = healthCount + slowHealthCount + weightCount + badCount + othersCount;
				HealthSum healthSum = new HealthSum(healthCount, slowHealthCount, weightCount, badCount, othersCount, all);
				healthTotalVO.setStatisticsHealthVOs(healthVOList);
				healthTotalVO.setHealthLinkedSum(healthSum);
			}
		}
		return healthTotalVO;
	}

	/**
	 * 婚姻
	 */
	@Override
	public StatisticsMaritalTotalVO getPopulationStatisticsMarital(String token) throws Exception {
		StatisticsMaritalTotalVO maritalTotalVO = null;
		HealthItemInfoResponse itemInfos = GeodoClient.geoDoPopulationStatisticsManys(token, "marital_status");
		if (itemInfos != null) {
			maritalTotalVO = new StatisticsMaritalTotalVO();
			maritalTotalVO.setMaritalItems(itemInfos.getFields());
			List<HealthItemInfo> itemList = itemInfos.getHealthItemInfos();
			if (itemList != null & itemList.size() > 0) {
				List<StatisticsMaritalVO> maritalVoList = new ArrayList<>();
				int widowedCount = 0;
				int divorcedCount = 0;
				int weddingCount = 0;
				int firstMarriageCount = 0;
				int unMarriedCount = 0;
				for (HealthItemInfo hmInfo : itemList) {
					String buildName = hmInfo.getName();
					int widowed = Integer.parseInt(ObjectUtils.defaultIfNull(hmInfo.getIt0(), "0"));
					int divorced = Integer.parseInt(ObjectUtils.defaultIfNull(hmInfo.getIt1(), "0"));
					int wedding = Integer.parseInt(ObjectUtils.defaultIfNull(hmInfo.getIt2(), "0"));
					int firstMarriage = Integer.parseInt(ObjectUtils.defaultIfNull(hmInfo.getIt3(), "0"));
					int unMarried = Integer.parseInt(ObjectUtils.defaultIfNull(hmInfo.getIt4(), "0"));
					int allMarital = widowed + divorced + wedding + firstMarriage + unMarried;
					StatisticsMaritalVO statisticsMaritalVO = new StatisticsMaritalVO(buildName, widowed, divorced, wedding, firstMarriage, unMarried, allMarital);
					maritalVoList.add(statisticsMaritalVO);
					
					widowedCount += widowed;
					divorcedCount += divorced;
					weddingCount += wedding;
					firstMarriageCount += firstMarriage;
					unMarriedCount += unMarried;
				}
				int all = widowedCount + divorcedCount + weddingCount + firstMarriageCount + unMarriedCount;
				MaritalSum maritalSum = new MaritalSum(widowedCount, divorcedCount, weddingCount, firstMarriageCount, unMarriedCount, all);
				maritalTotalVO.setMaritalSum(maritalSum);
				maritalTotalVO.setStatisticsMaritalVOs(maritalVoList);
			}
		}
		return maritalTotalVO;
	}

	@Override
	public StatisticsEducationTotalVO getPopulationStatisticsEducation(String token) throws Exception {
		StatisticsEducationTotalVO educationTotalVO = null;
		HealthItemInfoResponse itemInfos = GeodoClient.geoDoPopulationStatisticsManys(token, "cultural_level");
		if (itemInfos != null) {
			educationTotalVO = new StatisticsEducationTotalVO();
			educationTotalVO.setEducationItems(itemInfos.getFields());
			List<HealthItemInfo> itemList = itemInfos.getHealthItemInfos();
			if (itemList != null & itemList.size() > 0) {
				List<StatisticsEducationVO> educationVOList = new ArrayList<>();
				int postgraduateCount = 0;
				int undergraduateCount = 0;
				int juniorCount = 0;
				int secondaryCount = 0;
				int highSchoolCount = 0;
				int middleSchoolCount = 0;
				int primarySchoolCount = 0;
				int kindergartenCount = 0;
				int illiteracyCount = 0;
				for (HealthItemInfo hmInfo : itemList) {
					String buildName = hmInfo.getName();
					int postgraduate = Integer.parseInt(ObjectUtils.defaultIfNull(hmInfo.getIt0(), "0"));
					int undergraduate = Integer.parseInt(ObjectUtils.defaultIfNull(hmInfo.getIt1(), "0"));
					int junior = Integer.parseInt(ObjectUtils.defaultIfNull(hmInfo.getIt2(), "0"));
					int secondary = Integer.parseInt(ObjectUtils.defaultIfNull(hmInfo.getIt3(), "0"));
					int highSchool = Integer.parseInt(ObjectUtils.defaultIfNull(hmInfo.getIt4(), "0"));
					int middleSchool = Integer.parseInt(ObjectUtils.defaultIfNull(hmInfo.getIt5(), "0"));
					int primarySchool = Integer.parseInt(ObjectUtils.defaultIfNull(hmInfo.getIt6(), "0"));
					int kindergarten = Integer.parseInt(ObjectUtils.defaultIfNull(hmInfo.getIt7(), "0"));
					int illiteracy = Integer.parseInt(ObjectUtils.defaultIfNull(hmInfo.getIt8(), "0"));
					int allEducation = postgraduate + undergraduate + junior + secondary + highSchool + middleSchool + primarySchool + kindergarten + illiteracy;
					StatisticsEducationVO statisticsEducationVO = new StatisticsEducationVO(buildName, postgraduate, undergraduate, junior, secondary, highSchool, middleSchool, 
							primarySchool, kindergarten, illiteracy, allEducation);
					educationVOList.add(statisticsEducationVO);
					
					postgraduateCount += postgraduate;
					undergraduateCount += undergraduate;
					juniorCount += junior;
					secondaryCount += secondary;
					highSchoolCount += highSchool;
					middleSchoolCount += middleSchool;
					primarySchoolCount += primarySchool;
					kindergartenCount += kindergarten;
					illiteracyCount += illiteracy;
				}
				int all = postgraduateCount + undergraduateCount + juniorCount + secondaryCount + highSchoolCount + middleSchoolCount + primarySchoolCount + kindergartenCount + illiteracyCount;
				EducationSum educationSum = new EducationSum(postgraduateCount, undergraduateCount, juniorCount, secondaryCount, highSchoolCount, middleSchoolCount, primarySchoolCount, kindergartenCount, illiteracyCount, all);
				educationTotalVO.setEducationSum(educationSum);
				educationTotalVO.setStatisticsEducationVOs(educationVOList);
			}
		}
		return educationTotalVO;
	}

	@Override
	public StatisticsPoliticalTotalVO getPopulationStatisticsPolitical(String token) throws Exception {
		StatisticsPoliticalTotalVO politicalTotalVO = null;
		HealthItemInfoResponse itemInfos = GeodoClient.geoDoPopulationStatisticsManys(token, "political_status");
		if (itemInfos != null) {
			politicalTotalVO = new StatisticsPoliticalTotalVO();
			politicalTotalVO.setPoliticalItems(itemInfos.getFields());
			List<HealthItemInfo> itemList = itemInfos.getHealthItemInfos();
			if (itemList != null & itemList.size() > 0) {
				List<StatisticsPoliticalVO> politicalVOsList = new ArrayList<>();
				int crowdCount = 0;
				int partyMemberCount = 0;
				int groupMemberCount = 0;
				int othersCount = 0;
				for (HealthItemInfo hmInfo : itemList) {
					String buildName = hmInfo.getName();
					int crowd = Integer.parseInt(ObjectUtils.defaultIfNull(hmInfo.getIt0(), "0"));
					int partyMember = Integer.parseInt(ObjectUtils.defaultIfNull(hmInfo.getIt1(), "0"));
					int groupMember = Integer.parseInt(ObjectUtils.defaultIfNull(hmInfo.getIt2(), "0"));
					int others = Integer.parseInt(ObjectUtils.defaultIfNull(hmInfo.getIt3(), "0"));
					int allPolitical = crowd + partyMember + groupMember + others;
					StatisticsPoliticalVO statisticsPoliticalVO = new StatisticsPoliticalVO(buildName, crowd, partyMember, groupMember, others, allPolitical);
					politicalVOsList.add(statisticsPoliticalVO);
					
					crowdCount += crowd;
					partyMemberCount += partyMember;
					groupMemberCount += groupMember;
					othersCount += others;
				}
				int all = crowdCount + partyMemberCount + groupMemberCount + othersCount;
				PoliticalSum politicalSum = new PoliticalSum(crowdCount, partyMemberCount, groupMemberCount, othersCount, all);
				politicalTotalVO.setStatisticsPoliticalVOs(politicalVOsList);
				politicalTotalVO.setPoliticalSum(politicalSum);
			}
		}
		return politicalTotalVO;
	}

	
	@Override
	public StatisticsAgeTotalVO getPopulationStatisticsAge(String token) throws Exception {
		StatisticsAgeTotalVO statisticsAgeTotalVO = null;
		HealthItemInfoResponse itemInfos = GeodoClient.geoDoPopulationStatisticsManys(token, "age");
		if (itemInfos != null) {
			statisticsAgeTotalVO = new StatisticsAgeTotalVO();
			statisticsAgeTotalVO.setAgeItems(itemInfos.getFields());
			List<HealthItemInfo> itemList = itemInfos.getHealthItemInfos();
			int tenCount = 0;
			int twentyCount = 0;
			int thirtyCount = 0;
			int fortyCount = 0;
			int fiftyCount = 0;
			int moreFiftyCount = 0; 
			if (itemList != null & itemList.size() > 0) {
				List<StatisticsAgeVO> ageVOs = new ArrayList<>();
				for (HealthItemInfo hmInfo : itemList) {
					String buildName = hmInfo.getName();
					int ten = Integer.parseInt(ObjectUtils.defaultIfNull(hmInfo.getIt0(), "0"));
					int twenty = Integer.parseInt(ObjectUtils.defaultIfNull(hmInfo.getIt1(), "0"));
					int thirty = Integer.parseInt(ObjectUtils.defaultIfNull(hmInfo.getIt2(), "0"));
					int forty = Integer.parseInt(ObjectUtils.defaultIfNull(hmInfo.getIt3(), "0"));
					int fifty = Integer.parseInt(ObjectUtils.defaultIfNull(hmInfo.getIt4(), "0"));
					int moreFifty = Integer.parseInt(ObjectUtils.defaultIfNull(hmInfo.getIt5(), "0"));
					int allAge = ten + twenty + thirty + forty + fifty + moreFifty;
					StatisticsAgeVO statisticsAgeVO = new StatisticsAgeVO(buildName, ten, twenty, thirty, forty, fifty, moreFifty, allAge);
					ageVOs.add(statisticsAgeVO);
					
					tenCount += ten;
					twentyCount += twenty;
					thirtyCount += thirty;
					fortyCount += forty;
					fiftyCount += fifty;
					moreFiftyCount += moreFifty;
				}
				int all = tenCount + twentyCount + thirtyCount + fortyCount + fiftyCount + moreFiftyCount;
				AgeSum ageSum = new AgeSum(tenCount, twentyCount, thirtyCount, fortyCount, fiftyCount, moreFiftyCount, all);
				statisticsAgeTotalVO.setAgeSum(ageSum);
				statisticsAgeTotalVO.setStatisticsAgeVOs(ageVOs);
			}
		}
		return statisticsAgeTotalVO;
	}

	@Override
	public List<CommunityGenraalInfo> getPopulationStatisticsCommunityGenraalInfo(String token) throws Exception {
		List<CommunityGenraalInfo> geoDoCommunityGenraal = GeodoClient.geoDoCommunityGenraal(token);
		return geoDoCommunityGenraal;
	}

}
