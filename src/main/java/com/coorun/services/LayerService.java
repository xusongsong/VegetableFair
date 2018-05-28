package com.coorun.services;

import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONObject;
import com.coorun.entity.Coverage;
import com.coorun.entity.Layer;

/**
 * 图层功能接口
 * 
 * @author cd
 * @createDate 2017-09-21
 */
public interface LayerService {
	
	/**
	 * 根据ID查询不同级别的模型列表
	 * 
	 * @param areacode,区域编码
	 * @param type,访问的服务类型
	 * @param nodeID,当前节点ID
	 * @param rank,请求对应层级的图层集合
	 * @return 返回图层集合列表
	 */
	List<String> queryLayersByNodeID(String areacode, String type, String nodeID, int rank);
	
	/**
	 * 获取模型结果列表
	 * 
	 * @param areacode,区域编码
	 * @param type,访问的服务类型
	 * @return 返回图层集合列表
	 */
	List<Map<String, Object>> makeLayerTree(String areacode, String type);
	
	/**
	 * 获取倾斜摄影列表
	 * 
	 * @param areacode,区域编码
	 * @param type,访问的服务类型
	 * @return 返回倾斜摄影集合列表
	 */
	List<Layer> makeOSGBLayerTree(String areacode, String type);
	
	/**
	 * 获取倾斜摄影/bim列表(老接口)
	 * 
	 * @param type,访问的服务类型
	 * @return 返回的服务集合
	 */
	JSONObject makeServerListTree(String type);
	
	/**
	 * 根据ID查询不同级别的模型列表
	 * 
	 * @param sname,服务名
	 * @param type,访问的服务类型
	 * @param nodeID,当前节点ID
	 * @param rank,请求对应层级的图层集合
	 * @return 返回图层集合列表
	 */
	List<String> queryLayersByNodeIDNew(String sname, String type, String dataType, String nodeID, int rank);
	
	/**
	 * 获取模型结果列表
	 * 
	 * @param sname,服务名
	 * @param type,访问的服务类型
	 * @return 返回图层集合列表
	 */
	List<Map<String, Object>> makeLayerTreeNew(String sname, String type, String dataType);
	
	/**
	 * 加载OSGB,BIM,terrain,image(新接口)
	 * 
	 * @param cityCode,城市编码
	 * @param serverStype,服务类型
	 * @param serverSname,服务名称
	 * @return List<Coverage>,封装对象
	 */
	List<Coverage> getCoverageList(String cityCode, String serverStype, String serverSname);
	
	/**
	 * 获取该用户ID下的所有服务名
	 * 
	 * @param userID,用户ID
	 * @param serverSname,服务名
	 * @param serverStype,服务类型
	 * @return 所有服务名
	 */
	List<String> getSnameByUserID(String userID,  String serverSname, String serverStype);
}
