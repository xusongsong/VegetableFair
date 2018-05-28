package com.coorun.icgis.security.climb.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.coorun.icgis.jites.common.bean.vo.Children;
import com.coorun.icgis.jites.common.validator.Validator;
import com.coorun.icgis.jites.common.validator.annotation.ValidateParam;
import com.coorun.icgis.jites.security.api.vo.ClimbInfoRecord;
import com.coorun.icgis.jites.security.api.vo.ClimbRecordRequest;
import com.coorun.icgis.security.climb.service.ISecurityClimbService;
import com.coorun.util.RetResult;
import com.wordnik.swagger.annotations.ApiParam;

@Controller
@RequestMapping("/security/climb")
public class SecurityClimbController {

	@Resource
	private ISecurityClimbService securityClimbService;
	
	/**
	 * 防攀爬设备信息列表
	 * 
	 * @param request
	 * @return RetResult<Object>
	 */
	@RequestMapping(value = "/info", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public RetResult<Object> securityClimbInfo(
			@ApiParam(value = "communityId", required = true) @ValidateParam({Validator.NOT_BLANK}) String communityId,	
			HttpServletRequest request) throws Exception {
		RetResult<Object> retResult = new RetResult<Object>();
		List<Children> securityClimbInfo = securityClimbService.securityClimbInfo(communityId);
		retResult.setRecord(securityClimbInfo);
		return retResult;
	}

	/**
	 * 防攀爬警报记录列表
	 * 
	 * @param request
	 * @return RetResult<Object>
	 */
	@RequestMapping(value = "/record", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public RetResult<Object> securityClimbRecord(
			ClimbRecordRequest climbRecordRequest,
			HttpServletRequest request) throws Exception {
		RetResult<Object> retResult = new RetResult<Object>();
		List<ClimbInfoRecord> securityClimbRecord = securityClimbService.securityClimbRecord(climbRecordRequest);
		retResult.setRecord(securityClimbRecord);
		return retResult;
	}

	/**
	 * 警报信息
	 * 
	 * @param request
	 * @return RetResult<Object>
	 */
	@RequestMapping(value = "/warning", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public RetResult<Object> securityClimbWarning(HttpServletRequest request) throws Exception {
		RetResult<Object> retResult = new RetResult<Object>();
		return retResult;
	}
	
	
	
	
	/**
	 * 获取视频接口
	 * @param serialNo
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/video", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public RetResult<Object> getVideoByNode(
			@ApiParam(value = "serial_no", required = true) @ValidateParam({Validator.NOT_BLANK})String serialNo,
			HttpServletRequest request) throws Exception {
		RetResult<Object> retResult = new RetResult<Object>();
		securityClimbService.getVideoByNode(serialNo);
		return retResult;
	}
	
	
	/**
	 * 跳转climbList.jsp
	 * @return
	 */
	@RequestMapping(value = "climbList.do", method = RequestMethod.GET, produces = "text/html;charset=UTF-8")
	public String getWifiList() {
		return "iframe/climbList";
	}
}
