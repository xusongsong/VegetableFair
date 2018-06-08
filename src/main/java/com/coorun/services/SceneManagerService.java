package com.coorun.services;

import java.util.List;
import java.util.Map;

import com.coorun.entity.LabelResult;
import com.coorun.entity.PathResult;
import com.coorun.entity.ViewResult;

/**
 * 场景管理功能模块
 * 
 * @author DL
 * @createDate 2017-10-11
 */
public interface SceneManagerService {
	/**
	 * 视点功能---新增视点
	 * 
	 * @param id
	 * @param userId
	 * @return Boolean
	 */
	Boolean addViewPoint(String name, String userId, String z, String x, String y, String descr, String rotateAngle,
			String overAngle, String range);

	/**
	 * 视点功能---删除视点
	 * 
	 * @param id
	 * @param userId
	 * @return Boolean
	 */
	Boolean deleteViewPoint(String id);

	/**
	 * 视点功能---修改视点
	 * 
	 * @param id
	 * @param userId
	 * @param name
	 * @param pointType
	 * @param elevation
	 * @param longitude
	 * @param latitude
	 * @param descr
	 * @param rotateAngle
	 * @param overAngle
	 * @param range
	 * @return Boolean
	 */
	Boolean modifyView(String id, String name, String z, String x, String y, String descr,
			String rotateAngle, String overAngle, String range);

	/**
	 * 视点功能---查询视点
	 * 
	 * @param userId
	 * @param name
	 * @param pointType
	 * @param pageNo
	 * @param pageSize
	 * @return List<ViewResult>
	 */
	List<ViewResult> queryViewPoint( String name);

	/**
	 * 路径功能---查询路径
	 * 
	 * @param pathName
	 * @param pageNo
	 * @param pageSize
	 * @param userId
	 * @return List<PathResult>
	 */
	List<PathResult> queryPathResult(String pathName);

	/**
	 * 路径功能---删除路径
	 * 
	 * @param id
	 * @return Boolean
	 */
	Boolean deletePath(String id);

	/**
	 * 路径功能---新增路径
	 * 
	 * @param pathName
	 * @param userId
	 * @param lnglats
	 * @param viewModel
	 * @return Boolean
	 */
	Boolean addPath(String pathName, String userId, String lnglats, String viewModel);

	/**
	 * 标注功能 --查询标注
	 * 
	 * @param userId
	 * @param name
	 * @param pointType
	 * @param pageNo
	 * @param pageSize
	 * @return List<LabelResult>
	 */
	List<LabelResult> queryLabelPoint( String name);

	/**
	 * 标注功能--添加标注
	 * 
	 * @param labelResult
	 * @return String
	 */
	Map<String,String> addLabelPoint(LabelResult labelResult);

	/**
	 * 标注功能--修改标注
	 * 
	 * @param labelResult
	 * @return String
	 */
	String updateLabelPoint(LabelResult labelResult);

	/**
	 * 标注功能--删除标注
	 * 
	 * @param id
	 * @return String
	 */
	String delLabelPoint(String id);
}
