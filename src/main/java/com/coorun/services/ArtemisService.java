package com.coorun.services;

import java.util.List;
import java.util.Map;

import com.coorun.entity.AppKeyResult;
import com.coorun.entity.ArtemisByNode;
import com.coorun.entity.ArtemisTreeNode;
import com.coorun.entity.VideoInfo;

/**
 * 海康接口调用
 * 
 * @author shine
 * @createDate 2018-03-25
 */

public interface ArtemisService {
	//分页获取全部的监控点信息
	public List<VideoInfo> findCameraInfoPage(Map<String,String> paramMap);
	//获取监控暗钥信息
	public AppKeyResult securityParam(Map<String,String> paramMap);
	//根据组织编号分页获取监控点信息
	public  List<ArtemisByNode> findCameraInfoPageByTreeNode(Map<String,String> paramMap);
	//分页获取组织树
	public List<ArtemisTreeNode> findControlUnitPage(Map<String,String> paramMap);

	/**
	 * 根据监控点编号获取RTSP流地址
	 * @param indexCode 设备编号
	 * @return rtsp地址
	 */
	String queryRTSPUrl(String indexCode);
}
