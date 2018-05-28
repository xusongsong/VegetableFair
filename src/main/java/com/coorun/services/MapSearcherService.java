package com.coorun.services;

import java.util.List;

import com.coorun.entity.AttributeResult;
import com.coorun.entity.MapResult;
import com.coorun.entity.MixedResult;

/**
 * 搜索功能模块
 * 
 * @author DL
 * @createDate 2017-09-21
 */
public interface MapSearcherService {

	/**
	 * 属性查询
	 * 
	 * @param x,经度
	 * @param y,纬度
	 * @param max,最大记录数
	 * @return AttributeResult,封装的对象
	 */
	List<AttributeResult> queryAttribute(String x, String y, int max);

	/**
	 * 混合查询
	 * 
	 * @param condition,查询条件
	 * @param max,最大记录数
	 * @return List<MixedResult>,封装的对象
	 */
	List<MixedResult> queryMixed(String condition, int max);

	/****************************** server接口(old) *****************************/

	/**
	 * 属性查询(old)
	 * 
	 * @param lon
	 * @param lat
	 * @param serverType
	 * @param shpType
	 * @return AttributeResult
	 */
	AttributeResult queryAttributeOld(String lon, String lat, int serverType, int shpType);

	/**
	 * 关键字查询(old)
	 * 
	 * @param keyWord
	 * @param pageNo
	 * @param pageSize
	 * @return List<MapResult>
	 */
	List<MapResult> queryByKeyWord(String keyWord, int pageNo, int pageSize);
}
