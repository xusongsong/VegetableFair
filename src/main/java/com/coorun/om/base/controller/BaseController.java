package com.coorun.om.base.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;

import com.coorun.om.base.services.IBaseService;


/*************************
 *
 * Author		:	Billy
 * Create Date	:	2017年12月7日 上午10:49:30
 * Desc			:
 *
**************************/
@Controller("baseController")
public class BaseController {
	
	Logger logger = Logger.getLogger(getClass());
	
	IBaseService baseService;

	@Autowired
	public void setBaseService(IBaseService baseService) {
		this.baseService = baseService;
	}

}
