/*package com.coorun.icgis.jites.common.aop.impl;

import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.mvc.method.annotation.AbstractJsonpResponseBodyAdvice;

import com.coorun.icgis.jites.common.util.exception.ValidateException;
import com.coorun.util.RetResult;

@ControllerAdvice
public class ControllerIcgisAdviceHandler extends AbstractJsonpResponseBodyAdvice {

	private Logger logger = Logger.getLogger(ControllerIcgisAdviceHandler.class);
	
    public ControllerIcgisAdviceHandler() {
        super("callback");  
    } 
	
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	@ExceptionHandler(Exception.class)
	public RetResult<Object> errorResponse(Exception exception) {
		RetResult<Object> result = new RetResult<>();
		result.setSuccess("0");
		logger.error(" AdviceHandler Exception .....");
		if (exception instanceof ValidateException) {
			ValidateException ex = (ValidateException) exception;
			result.setMsg(ex.getMessage());
		}
		return result;
	}

}
*/