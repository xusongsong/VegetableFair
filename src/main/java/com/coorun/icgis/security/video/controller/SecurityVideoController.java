package com.coorun.icgis.security.video.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.coorun.icgis.security.video.service.ISecurityVideoService;
import com.coorun.util.Pager;
import com.coorun.util.RetResult;

@Controller
@RequestMapping("/security/video")
public class SecurityVideoController {

	@Resource
	private ISecurityVideoService securityVideoService;
	
	/**
	 * 摄像头信息列表
	 * 
	 * @param request
	 * @return RetResult<Pager<Object>>
	 */
	@RequestMapping(value = "/info", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public RetResult<Pager<Object>> securityVideoInfo(HttpServletRequest request) throws Exception {
		RetResult<Pager<Object>> retResult = new RetResult<Pager<Object>>();
		return retResult;
	}

}
