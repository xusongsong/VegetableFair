package com.coorun.icgis.population.statistics.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.coorun.icgis.jites.common.validator.Validator;
import com.coorun.icgis.jites.common.validator.annotation.ValidateParam;
import com.coorun.icgis.jites.geodo.api.bean.CommunityGenraalInfo;
import com.coorun.icgis.population.statistics.model.vo.StatisticsAgeTotalVO;
import com.coorun.icgis.population.statistics.model.vo.StatisticsCensusTotalVO;
import com.coorun.icgis.population.statistics.model.vo.StatisticsEducationTotalVO;
import com.coorun.icgis.population.statistics.model.vo.StatisticsHealthTotalVO;
import com.coorun.icgis.population.statistics.model.vo.StatisticsMaritalTotalVO;
import com.coorun.icgis.population.statistics.model.vo.StatisticsPoliticalTotalVO;
import com.coorun.icgis.population.statistics.model.vo.StatisticsSexTotalVO;
import com.coorun.icgis.population.statistics.service.IPopulationStatisticsService;
import com.coorun.util.Pager;
import com.coorun.util.RetResult;
import com.wordnik.swagger.annotations.ApiParam;

@Controller
@RequestMapping("/population/statistics")
public class PopulationStatisticsController {

	@Resource
	private IPopulationStatisticsService populationStatisticsService;
	
	/**
	 * 总人口统计数据
	 * 
	 * @param request
	 * @return RetResult<Pager<Object>>
	 */
	@RequestMapping(value = "/total", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public RetResult<Pager<Object>> populationStatisticsTotal(HttpServletRequest request) throws Exception {
		RetResult<Pager<Object>> retResult = new RetResult<Pager<Object>>();
		return retResult;
	}
	
	/**
	 * 男女人口比例数据
	 * 
	 * @param request
	 * @return RetResult<Pager<Object>>
	 */
	@RequestMapping(value = "/sex", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public RetResult<Object> populationStatisticsSex(
			@ApiParam(value = "token", required = true) @ValidateParam({Validator.NOT_BLANK}) String token
			,HttpServletRequest request) throws Exception {
		RetResult<Object> retResult = new RetResult<Object>();
		StatisticsSexTotalVO sexTotalVO = populationStatisticsService.getPopulationStatisticsSex(token);
		retResult.setMsg("未查询到相关统计数据");
		if (sexTotalVO != null) {
			retResult.setRecord(sexTotalVO);
			retResult.setMsg("男女人口比例数据");
		}
		return retResult;
	}

	/**
	 * 户籍类型比例数据
	 * 
	 * @param request
	 * @return RetResult<Pager<Object>>
	 */
	@RequestMapping(value = "/census", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public RetResult<Object> populationStatisticsCensus(@ApiParam(value = "token", required = true) @ValidateParam({Validator.NOT_BLANK}) String token,
			HttpServletRequest request) throws Exception {
		RetResult<Object> retResult = new RetResult<Object>();
		StatisticsCensusTotalVO censusTotalVO = populationStatisticsService.getPopulationStatisticsCensus(token);
		retResult.setMsg("未查询到相关统计数据");
		if (censusTotalVO != null) {
			retResult.setRecord(censusTotalVO);
			retResult.setMsg("户籍类型比例数据");
		}
		return retResult;
	}
	
	/**
	 * 健康状况数据
	 * 
	 * @param request
	 * @return RetResult<Pager<Object>>
	 */
	@RequestMapping(value = "/health", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public RetResult<Object> populationStatisticsHealth(
			@ApiParam(value = "token", required = true) @ValidateParam({Validator.NOT_BLANK}) String token
			,HttpServletRequest request) throws Exception {
		RetResult<Object> retResult = new RetResult<Object>();
		retResult.setMsg("未查询到相关统计数据");
		StatisticsHealthTotalVO healthVo = populationStatisticsService.getPopulationStatisticsHealth(token);
		if (healthVo != null) {
			retResult.setRecord(healthVo);
			retResult.setMsg("健康状况数据");
		}
		return retResult;
	}
	
	/**
	 * 婚姻状况数据
	 * 
	 * @param request
	 * @return RetResult<Pager<Object>>
	 */
	@RequestMapping(value = "/marital", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public RetResult<Object> populationStatisticsMarital(
			@ApiParam(value = "token", required = true) @ValidateParam({Validator.NOT_BLANK}) String token
			,HttpServletRequest request) throws Exception {
		RetResult<Object> retResult = new RetResult<Object>();
		retResult.setMsg("未查询到相关统计数据");
		StatisticsMaritalTotalVO maritalVO = populationStatisticsService.getPopulationStatisticsMarital(token);
		if (maritalVO != null) {
			retResult.setRecord(maritalVO);
			retResult.setMsg("婚姻状况数据");
		}
		return retResult;
	}
	
	/**
	 * 文化程度数据
	 * 
	 * @param request
	 * @return RetResult<Pager<Object>>
	 */
	@RequestMapping(value = "/education", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public RetResult<Object> populationStatisticsEducation(
			@ApiParam(value = "token", required = true) @ValidateParam({Validator.NOT_BLANK}) String token
			,HttpServletRequest request) throws Exception {
		RetResult<Object> retResult = new RetResult<Object>();
		retResult.setMsg("未查询到相关统计数据");
		StatisticsEducationTotalVO educationVO = populationStatisticsService.getPopulationStatisticsEducation(token);
		if (educationVO != null) {
			retResult.setRecord(educationVO);
			retResult.setMsg("文化程度数据");
		}
		return retResult;
	}
	
	/**
	 * 政治面貌数据
	 * 
	 * @param request
	 * @return RetResult<Pager<Object>>
	 */
	@RequestMapping(value = "/political", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public RetResult<Object> populationStatisticsPolitical(
			@ApiParam(value = "token", required = true) @ValidateParam({Validator.NOT_BLANK}) String token
			,HttpServletRequest request) throws Exception {
		RetResult<Object> retResult = new RetResult<Object>();
		retResult.setMsg("未查询到相关统计数据");
		StatisticsPoliticalTotalVO politicalVO = populationStatisticsService.getPopulationStatisticsPolitical(token);
		if (politicalVO != null) {
			retResult.setRecord(politicalVO);
			retResult.setMsg("政治面貌数据");
		}
		return retResult;
	}
	
	/**
	 * 年龄分布数据
	 * 
	 * @param request
	 * @return RetResult<Pager<Object>>
	 */
	@RequestMapping(value = "/age", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public RetResult<Object> populationStatisticsAge(
			@ApiParam(value = "token", required = true) @ValidateParam({Validator.NOT_BLANK}) String token
			,HttpServletRequest request) throws Exception {
		RetResult<Object> retResult = new RetResult<Object>();
		retResult.setMsg("未查询到相关统计数据");
		StatisticsAgeTotalVO ageVO = populationStatisticsService.getPopulationStatisticsAge(token);
		if (ageVO != null) {
			retResult.setRecord(ageVO);
			retResult.setMsg("年龄分布数据");
		}
		return retResult;
	}
	
	/**
	 * 获取社区每栋户数，总人口
	 * @param token
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/communityGenraalInfo", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public RetResult<Object> communityGenraalInfo(
			@ApiParam(value = "token", required = true) @ValidateParam({Validator.NOT_BLANK}) String token
			,HttpServletRequest request) throws Exception {
		RetResult<Object> retResult = new RetResult<Object>();
		List<CommunityGenraalInfo> list = populationStatisticsService.getPopulationStatisticsCommunityGenraalInfo(token);
		retResult.setRecord(list);
		return retResult;
	}
	
}
