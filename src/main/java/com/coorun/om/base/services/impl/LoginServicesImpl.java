package com.coorun.om.base.services.impl;

import org.springframework.stereotype.Service;

import com.coorun.om.base.factory.LoginFactory;
import com.coorun.om.base.services.ILoginServices;
import com.coorun.om.base.util.RetResult;

/*************************
 *
 * Author		:	Billy
 * Create Date	:	2017年12月7日 上午11:09:49
 * Desc			:
 *
**************************/
@Service(value="loginService")
public class LoginServicesImpl implements ILoginServices {

	@Override
	public RetResult login(String userName,String passwd) {
		return LoginFactory.login(userName, passwd);
	}

	@Override
	public void loginout(String sessionId) {
		LoginFactory.loginOut(sessionId);
		
	}

}
