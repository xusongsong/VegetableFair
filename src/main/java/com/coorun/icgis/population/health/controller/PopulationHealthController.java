package com.coorun.icgis.population.health.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.coorun.icgis.jites.common.validator.Validator;
import com.coorun.icgis.jites.common.validator.annotation.ValidateParam;
import com.coorun.icgis.jites.geodo.api.bean.HealthDetailInfo;
import com.coorun.icgis.jites.geodo.api.response.HealthStatisticsInfoResponse;
import com.coorun.icgis.population.health.service.IPopulationHealthService;
import com.coorun.util.Pager;
import com.coorun.util.RetResult;
import com.wordnik.swagger.annotations.ApiParam;

@Controller
@RequestMapping("/population/health")
public class PopulationHealthController {

	@Resource
	private IPopulationHealthService populationHealthService;
	
	/**
	 * 健康统计数据
	 * 
	 * @param request
	 * @param queryFlag
	 * 			1：高血压，2：糖尿病
	 * @return RetResult<Pager<Object>>
	 */
	@RequestMapping(value = "/statistics", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public RetResult<Object> populationHealthStatistics(
			@ApiParam(value = "token", required = true) @ValidateParam({Validator.NOT_BLANK}) String token,
			@ApiParam(value = "queryFlag", required = true) @ValidateParam({Validator.NOT_BLANK}) String queryFlag,
			HttpServletRequest request) throws Exception {
		RetResult<Object> retResult = new RetResult<Object>();
		HealthStatisticsInfoResponse statisticsInfo = populationHealthService.getPopulationHealthStatistics(token, queryFlag);
		retResult.setRecord(statisticsInfo);
		return retResult;
	}
	
	/**
	 * 人员健康信息查询
	 * 
	 * @param request
	 * @return RetResult<Pager<Object>>
	 */
	@RequestMapping(value = "/person", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public RetResult<Object> populationStatisticsPerson(
			@ApiParam(value = "token", required = true) @ValidateParam({Validator.NOT_BLANK}) String token,
			@ApiParam(value = "condition", required = true) @ValidateParam({Validator.NOT_BLANK}) String condition,
			HttpServletRequest request) throws Exception {
		RetResult<Object> retResult = new RetResult<Object>();
		HealthDetailInfo statisticsPerson = populationHealthService.getPopulationStatisticsPerson(token, condition);
		retResult.setRecord(statisticsPerson);
		return retResult;
	}

}
