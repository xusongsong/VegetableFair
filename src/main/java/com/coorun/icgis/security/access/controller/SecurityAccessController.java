package com.coorun.icgis.security.access.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.coorun.icgis.security.access.service.ISecurityAccessService;
import com.coorun.util.Pager;
import com.coorun.util.RetResult;

@Controller
@RequestMapping("/security/access")
public class SecurityAccessController {

	@Resource
	private ISecurityAccessService securityAccessService;
	
	/**
	 * 门禁信息列表
	 * 
	 * @param request
	 * @return RetResult<Pager<Object>>
	 */
	@RequestMapping(value = "/info", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public RetResult<Pager<Object>> securityAccessInfo(HttpServletRequest request) throws Exception {
		RetResult<Pager<Object>> retResult = new RetResult<Pager<Object>>();
		return retResult;
	}

	/**
	 * 门禁出入记录列表
	 * 
	 * @param request
	 * @return RetResult<Pager<Object>>
	 */
	@RequestMapping(value = "/record", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public RetResult<Pager<Object>> securityAccessRecord(HttpServletRequest request) throws Exception {
		RetResult<Pager<Object>> retResult = new RetResult<Pager<Object>>();
		return retResult;
	}

}
