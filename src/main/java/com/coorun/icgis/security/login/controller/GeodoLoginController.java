package com.coorun.icgis.security.login.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.coorun.icgis.jites.common.validator.Validator;
import com.coorun.icgis.jites.common.validator.annotation.ValidateParam;
import com.coorun.icgis.jites.geodo.api.bean.GeodoToken;
import com.coorun.icgis.security.login.service.IGeodoLoginService;
import com.coorun.util.RetResult;
import com.wordnik.swagger.annotations.ApiParam;

@Controller
@RequestMapping("/login")
public class GeodoLoginController {
	
	@Autowired
	IGeodoLoginService geodoLoginService;
	
	@RequestMapping(value = "/login/scmpLogin", method = { RequestMethod.GET, RequestMethod.POST }, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public RetResult<Object> scmpLogin(
			@ApiParam(value = "登录名", required = true) @ValidateParam({Validator.NOT_BLANK})String loginName, 
			@ApiParam(value = "密码", required = true) @ValidateParam({Validator.NOT_BLANK})String password, HttpServletRequest request) throws Exception {
		RetResult<Object> retResult = new RetResult<Object>();
		GeodoToken geodoTokenByLogin = geodoLoginService.getGeodoTokenByLogin(loginName, password);
		if (!geodoTokenByLogin.isSuccess()) {
			retResult.setSuccess("0");
			retResult.setMsg(geodoTokenByLogin.getMsg());
		}
		retResult.setRecord(geodoTokenByLogin);
		return retResult;
	}
	
}
