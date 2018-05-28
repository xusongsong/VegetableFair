package com.coorun.icgis.security.login.service;

import com.coorun.icgis.jites.geodo.api.bean.GeodoToken;

public interface IGeodoLoginService {

	public GeodoToken getGeodoTokenByLogin(String loginName, String password) throws Exception;
	
}
