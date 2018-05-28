package com.coorun.icgis.security.climb.service;

import java.util.List;

import com.coorun.icgis.jites.common.bean.vo.Children;
import com.coorun.icgis.jites.security.api.vo.ClimbInfoRecord;
import com.coorun.icgis.jites.security.api.vo.ClimbRecordRequest;
import com.coorun.icgis.jites.security.api.vo.VideoInfo;

public interface ISecurityClimbService {

	public List<Children> securityClimbInfo(String communityId)throws Exception;
	
	public List<VideoInfo> getVideoByNode(String serialNo) throws Exception;
	
	public List<ClimbInfoRecord> securityClimbRecord(ClimbRecordRequest request) throws Exception;
}
