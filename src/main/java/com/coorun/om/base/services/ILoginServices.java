package com.coorun.om.base.services;

import com.coorun.om.base.util.RetResult;

/*************************
 *
 * Author		:	Billy
 * Create Date	:	2017年12月7日 上午11:08:41
 * Desc			:
 *
**************************/
public interface ILoginServices {
	
	public RetResult login(String userName,String passwd);
	
	public void loginout(String sessionId);

}
