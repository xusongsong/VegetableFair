package com.coorun.icgis.security.wifi.service;

import java.util.List;

import com.coorun.icgis.jites.common.bean.vo.Children;
import com.coorun.icgis.jites.security.api.vo.WifiInfoRecord;

public interface ISecurityWifiService {

	
	
	public List<Children> securityWifiInfo(String uuid) throws Exception;
	
	public List<WifiInfoRecord> securityWifiRecord(String id,String startTime,String endTime ) throws Exception;
}
