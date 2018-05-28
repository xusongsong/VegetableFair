package com.coorun.services.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.coorun.entity.Coverage;
import com.coorun.entity.Layer;
import com.coorun.factory.LayerFactory;
import com.coorun.services.LayerService;

/**
 * 图层功能serviceImpl层
 * 
 * @author cd
 * @createDate 2017-09-21
 */
@Service("LayerService")
public class LayerServiceImpl implements LayerService {
	
	@Resource
	LayerFactory layerFactory;
	Logger logger = Logger.getLogger(LayerServiceImpl.class);
	private List<Map<String, Object>> mapList = null;
	private Map<String, Object> layerLevelList = null;
	
	/**
	 * 根据ID查询不同级别的模型列表实现
	 * 
	 * @param areacode,区域编码
	 * @param type,访问的服务类型
	 * @param nodeID,当前节点ID
	 * @param rank,请求对应层级的图层集合
	 * @return 返回图层集合列表
	 */
	@Override
	public List<String> queryLayersByNodeID(String areacode, String type, String nodeID, int rank) {

		List<String> listID = getChildsID(areacode, type, nodeID, rank);
		return listID;
		
	}
	
	/**
	 * 获取模型结果列表实现
	 * 
	 * @param areacode,区域编码
	 * @param type,访问的服务类型
	 * @return 返回图层集合列表
	 */
	@Override
	public List<Map<String, Object>> makeLayerTree(String areacode, String type){
		
		Map<String, List<Layer>> mapRankList = layerFactory.createLayerMap(areacode, type, 1);
		mapList = new ArrayList<Map<String,Object>>();
		for (String str : mapRankList.keySet()) {
			List<Layer> list = mapRankList.get(str);
			layerLevelList = new HashMap<String, Object>();
			for(int i=0;i<3;i++){
				String level = (i + 1) + "";
				List<Layer> levelList = getLevelList(list, level);
				layerLevelList.put("level" + level, levelList);
			}
			mapList.add(layerLevelList);
		}
		return mapList;
		
	}
	
	/**
	 * 获取不同级别的模型列表
	 * 
	 * @param list,要处理的图层集合
	 * @param level,对应层级的图层集合
	 * @return 返回图层集合列表
	 */
	private List<Layer> getLevelList(List<Layer> list, String level) {
		List<Layer> levelList = new ArrayList<Layer>();
		for(int i=0;i<list.size();i++){
			if(level.equals(list.get(i).getLevel())){
				levelList.add(list.get(i));	
			}
		}
		return levelList;
	}
	
	/**
	 * 根据父ID得到所有的子ID集合
	 * 
	 * @param areacode,区域编码
	 * @param type,访问的服务类型
	 * @param nodeID,当前的节点ID
	 * @param rank,请求对应层级的图层集合
	 * @return 返回图层集合列表
	 */
	private List<String> getChildsID(String areacode, String type, String nodeID, int rank) {
		
		LayerFactory layerFactory1 = new LayerFactory();
		Map<String, List<Layer>> mapRankList = layerFactory1.createLayerMap(areacode, type, rank);
		System.out.println(mapRankList);
		String nodeIDIndex = nodeID.substring(0, 6);
		List<String> childsID = new ArrayList<String>();
		String layerID = null;
		for(int i=0;i<mapRankList.get(nodeIDIndex).size();i++){
			layerID = mapRankList.get(nodeIDIndex).get(i).getLayerID();
			if(layerID.indexOf(nodeID) != -1){
//				if(mapRankList.get(nodeIDIndex).get(i).getPath() != null){
				childsID.add(mapRankList.get(nodeIDIndex).get(i).getLayerID() + "#@" +  mapRankList.get(nodeIDIndex).get(i).getPath() + "#@" +  mapRankList.get(nodeIDIndex).get(i).getFeatureID());
//				}
			}
		}
		System.out.println(childsID);
		return childsID;
		
	}
	
	/**
	 * 获取倾斜摄影列表实现
	 * 
	 * @param areacode,区域编码
	 * @param type,访问的服务类型
	 * @return 返回倾斜摄影集合列表
	 */
	@Override
	public List<Layer> makeOSGBLayerTree(String areacode, String type) {

		List<Layer> osgbList = layerFactory.createOSGBLayerMap(areacode, type);
		return osgbList;
		
	}
	
	/**
	 * 获取倾斜摄影/bim列表实现(老接口)
	 * 
	 * @param areacode,区域编码
	 * @param type,访问的服务类型
	 * @return 返回倾斜摄影集合列表
	 */
	@Override
	public JSONObject makeServerListTree(String type) {

		JSONObject serverList = layerFactory.createServerListOld(type);
		return serverList;
		
	}
	
	/**
	 * 根据ID查询不同级别的模型列表实现
	 * 
	 * @param sname,服务名
	 * @param type,访问的服务类型
	 * @param nodeID,当前节点ID
	 * @param rank,请求对应层级的图层集合
	 * @return 返回图层集合列表
	 */
	@Override
	public List<String> queryLayersByNodeIDNew(String sname, String type, String dataType, String nodeID, int rank) {

		List<String> listID = getChildsIDNew(sname, type, dataType, nodeID, rank);
		return listID;
		
	}
	
	/**
	 * 获取模型结果列表实现
	 * 
	 * @param sname,服务名
	 * @param type,访问的服务类型
	 * @return 返回图层集合列表
	 */
	@Override
	public List<Map<String, Object>> makeLayerTreeNew(String sname, String type, String dataType){
		
		Map<String, List<Layer>> mapRankList = layerFactory.createLayerMapNew(sname, type, dataType, 0);
		mapList = new ArrayList<Map<String,Object>>();
		for (String str : mapRankList.keySet()) {
			List<Layer> list = mapRankList.get(str);
			layerLevelList = new HashMap<String, Object>();
			for(int i=0;i<4;i++){
				String level = i + "";
				List<Layer> levelList = getLevelListNew(list, level);
				layerLevelList.put("level" + level, levelList);
			}
			mapList.add(layerLevelList);
		}
		return mapList;
		
	}
	
	/**
	 * 获取不同级别的模型列表
	 * 
	 * @param list,要处理的图层集合
	 * @param level,对应层级的图层集合
	 * @return 返回图层集合列表
	 */
	private List<Layer> getLevelListNew(List<Layer> list, String level) {
		List<Layer> levelList = new ArrayList<Layer>();
		for(int i=0;i<list.size();i++){
			if(level.equals(list.get(i).getLevel())){
				levelList.add(list.get(i));	
			}
		}
		return levelList;
	}
	
	/**
	 * 根据父ID得到所有的子ID集合
	 * 
	 * @param sname,服务名
	 * @param type,访问的服务类型
	 * @param nodeID,当前的节点ID
	 * @param rank,请求对应层级的图层集合
	 * @return 返回图层集合列表
	 */
	private List<String> getChildsIDNew(String sname, String type, String dataType, String nodeID, int rank) {
		
		Map<String, List<Layer>> mapRankList = layerFactory.createLayerMapNew(sname, type, dataType, rank);
		System.out.println(mapRankList);
		String nodeIDIndex = nodeID.substring(0, 6);
		List<String> childsID = new ArrayList<String>();
		String layerID = null;
		for(int i=0;i<mapRankList.get(nodeIDIndex).size();i++){
			layerID = mapRankList.get(nodeIDIndex).get(i).getLayerID();
			if(layerID.indexOf(nodeID) != -1){
				childsID.add(mapRankList.get(nodeIDIndex).get(i).getLayerID() + "#@" +  mapRankList.get(nodeIDIndex).get(i).getPath() + "#@" +  mapRankList.get(nodeIDIndex).get(i).getFeatureID());
			}
		}
		return childsID;
		
	}
	
	@Override
	public List<Coverage> getCoverageList(String cityCode, String serverStype, String serverSname) {
		List<Coverage> list = layerFactory.loadCoverage(cityCode, serverStype, serverSname);
		return list;
	}
	
	@Override
	public List<String> getSnameByUserID(String userID, String serverSname, String serverStype) {
		List<String> list = layerFactory.getSnameByUserID(userID, serverSname, serverStype);
		return list;
	}
	
	public static void main(String[] args) {
		LayerServiceImpl layerServiceTmpl = new LayerServiceImpl();
//		layerServiceTmpl.queryLayersByNodeIDNew("chendaTest", "gms", "330100_330108", 1);
//		layerServiceTmpl.makeLayerTreeNew("chendaTest", "gms");
//		layerServiceTmpl.makeOSGBLayerTree("320000", "osgb");
		layerServiceTmpl.queryLayersByNodeID("330100", "wrl", "330106_TERRAIN_101011", 3);
		System.out.println(layerServiceTmpl.makeLayerTree("330100", "wrl"));
	}

	
	
}
