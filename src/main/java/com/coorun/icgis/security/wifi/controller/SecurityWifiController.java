package com.coorun.icgis.security.wifi.controller;

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
import com.coorun.icgis.jites.security.api.vo.WifiInfoRecord;
import com.coorun.icgis.security.wifi.service.ISecurityWifiService;
import com.coorun.util.RetResult;
import com.wordnik.swagger.annotations.ApiParam;

@Controller
@RequestMapping("/security/wifi")
public class SecurityWifiController {

	@Resource
	private ISecurityWifiService securityWifiService;
	
	/**
	 * WIFI信息列表
	 * 
	 * @param request
	 * @return RetResult<Object>
	 */
	@RequestMapping(value = "/info", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public RetResult<Object> securityWifiInfo(
			@ApiParam(value = "UUID", required = true) @ValidateParam({Validator.NOT_BLANK}) String UUID,
			HttpServletRequest request) throws Exception {
		RetResult<Object> retResult = new RetResult<Object>();
		List<Children> securityWifiInfo = securityWifiService.securityWifiInfo(UUID);
		retResult.setRecord(securityWifiInfo);
		return retResult;
	}

	/**
	 * WIFI连接记录列表
	 * 
	 * @param request
	 * @return RetResult<Object>
	 */
	@RequestMapping(value = "/record", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public RetResult<Object> securityWifiRecord(
			@ApiParam(value = "id", required = true) @ValidateParam({Validator.NOT_BLANK}) String id,
			@ApiParam(value = "startTime", required = true) @ValidateParam({Validator.NOT_BLANK}) String startTime,
			@ApiParam(value = "endTime", required = true) @ValidateParam({Validator.NOT_BLANK}) String endTime,
			HttpServletRequest request) throws Exception {
		RetResult<Object> retResult = new RetResult<Object>();
		List<WifiInfoRecord> securityWifiRecord = securityWifiService.securityWifiRecord(id, startTime, endTime);
		retResult.setRecord(securityWifiRecord);
		return retResult;
	}

	
	/**
	 * 跳转WiFiList.jsp
	 * @return
	 */
	@RequestMapping(value = "wifiList.do", method = RequestMethod.GET, produces = "text/html;charset=UTF-8")
	public String getWifiList() {
		return "iframe/wifiList";
	}
}
