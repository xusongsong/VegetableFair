package com.coorun.icgis.security.login.service.impl;

import org.springframework.stereotype.Service;

import com.coorun.icgis.jites.geodo.api.bean.GeodoToken;
import com.coorun.icgis.jites.geodo.api.client.GeodoClient;
import com.coorun.icgis.security.login.service.IGeodoLoginService;

@Service
public class GeodoLoginServiceImpl implements IGeodoLoginService {

	@Override
	public GeodoToken getGeodoTokenByLogin(String loginName, String password) throws Exception {
		return GeodoClient.geoDoTokenByLogin(loginName, password);
	}

}
