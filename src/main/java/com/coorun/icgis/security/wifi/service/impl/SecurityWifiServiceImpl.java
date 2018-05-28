package com.coorun.icgis.security.wifi.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.coorun.icgis.jites.common.bean.vo.Children;
import com.coorun.icgis.jites.security.api.client.SecurityClient;
import com.coorun.icgis.jites.security.api.vo.WifiInfoRecord;
import com.coorun.icgis.security.wifi.service.ISecurityWifiService;

@Service
public class SecurityWifiServiceImpl implements ISecurityWifiService {

	@Override
	public List<Children> securityWifiInfo(String uuid) throws Exception {
		return SecurityClient.securityWifiInfo(uuid);
	}

	@Override
	public List<WifiInfoRecord> securityWifiRecord(String id, String startTime, String endTime) throws Exception {
		return SecurityClient.securityWifiRecord(id, startTime, endTime);
	}

}
