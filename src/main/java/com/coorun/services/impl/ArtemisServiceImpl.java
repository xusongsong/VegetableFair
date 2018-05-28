package com.coorun.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.coorun.entity.AppKeyResult;
import com.coorun.entity.ArtemisByNode;
import com.coorun.entity.ArtemisTreeNode;
import com.coorun.entity.VideoInfo;
import com.coorun.factory.ArtemisFactory;
import com.coorun.services.ArtemisService;

/**
 * 海康接口调用
 * @author shine
 * @date 2018-03-25
 */
@Service("artemisService")
public class ArtemisServiceImpl implements ArtemisService{
	@Resource
	ArtemisFactory artemisFactory;
	
	/**
	 * 分页获取全部的监控点信息
	 * @param paramMap<参数数组>
	 * 
	 */
	public List<VideoInfo> findCameraInfoPage(Map<String,String> paramMap){
		List<VideoInfo> list = new ArrayList<VideoInfo>();
		list = artemisFactory.findCameraInfoPage(paramMap);
		return list;
	}
	
	/**
	 * 获取监控暗钥信息
	 * @param String(秘钥信息)
	 */
	public AppKeyResult securityParam(Map<String,String> paramMap){
		AppKeyResult appKeyResult = new AppKeyResult();
		appKeyResult = artemisFactory.securityParam(paramMap);
		return appKeyResult;
		
	}
	
	/**
	 * 根据组织编号分页获取监控点信息
	 * @param String(秘钥信息)
	 */
	public List<ArtemisByNode> findCameraInfoPageByTreeNode(Map<String,String> paramMap){
		List<ArtemisByNode> list = new ArrayList<ArtemisByNode>();
		list = artemisFactory.findCameraInfoPageByTreeNode(paramMap);
		return list;
		
	}
	
	/**
	 * 分页获取组织树
	 * @param String(秘钥信息)
	 */
	public List<ArtemisTreeNode> findControlUnitPage(Map<String,String> paramMap){
		List<ArtemisTreeNode> list = new ArrayList<ArtemisTreeNode>();
		list = artemisFactory.findControlUnitPage(paramMap);
		return list;
		
	}

	@Override
	public String queryRTSPUrl(String indexCode) {
		return artemisFactory.queryRTSPUrl(indexCode);
	}
}