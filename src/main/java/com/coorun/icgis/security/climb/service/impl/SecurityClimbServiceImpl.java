package com.coorun.icgis.security.climb.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.coorun.icgis.jites.common.bean.vo.Children;
import com.coorun.icgis.jites.security.api.client.SecurityClient;
import com.coorun.icgis.jites.security.api.vo.ClimbInfoRecord;
import com.coorun.icgis.jites.security.api.vo.ClimbRecordRequest;
import com.coorun.icgis.jites.security.api.vo.VideoInfo;
import com.coorun.icgis.security.climb.service.ISecurityClimbService;

@Service
public class SecurityClimbServiceImpl implements ISecurityClimbService {

	@Override
	public List<Children> securityClimbInfo(String communityId) throws Exception {
		return SecurityClient.securityClimbInfo(communityId);
	}

	@Override
	public List<VideoInfo> getVideoByNode(String serialNo) throws Exception {
		return SecurityClient.getVideoByNode(serialNo);
	}

	@Override
	public List<ClimbInfoRecord> securityClimbRecord(ClimbRecordRequest request) throws Exception {
		return SecurityClient.securityClimbRecord(request);
	}

}
