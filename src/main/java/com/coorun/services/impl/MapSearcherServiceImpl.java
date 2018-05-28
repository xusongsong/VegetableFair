package com.coorun.services.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.coorun.entity.AttributeResult;
import com.coorun.entity.MapResult;
import com.coorun.entity.MixedResult;
import com.coorun.factory.MapFactory;
import com.coorun.services.MapSearcherService;

/**
 * 搜索功能模块
 * 
 * @author DL
 * @createDate 2017-09-21
 */
@Service("mapSearcherServices")
public class MapSearcherServiceImpl implements MapSearcherService {

	/** 搜索功能 **/
	@Resource
	MapFactory mapFactory;

	/** 属性查询 **/
	@Override
	public List<AttributeResult> queryAttribute(String x, String y, int max) {
		List<AttributeResult> list = mapFactory.getAttributeResult(x, y, max);
		return list;
	}

	/** 混合查询 **/
	@Override
	public List<MixedResult> queryMixed(String condition, int max) {
		// 查询数据库服务
		List<MixedResult> list = mapFactory.getMixedReuslt(condition, max);
		// 查询Arcgis服务
		List<MixedResult> arcgisList = mapFactory.getArcgisResult(condition);

		// 组织混合查询所有结果
		List<MixedResult> MixList = new ArrayList<MixedResult>();
		if ((list != null) && (list.size() > 0)) {
			MixList.addAll(list);
		}
		if ((arcgisList != null) && (arcgisList.size() > 0)) {
			MixList.addAll(arcgisList);
		}
		return MixList;
	}

	/****************************** server接口(old) *****************************/

	/** 关键字查询(old) **/
	@Override
	public List<MapResult> queryByKeyWord(String keyWord, int pageNo, int pageSize) {
		List<MapResult> list = mapFactory.getListResult(keyWord, pageNo, pageSize);
		return list;
	}

	/** 属性查询(old) **/
	@Override
	public AttributeResult queryAttributeOld(String lon, String lat, int serverType, int shpType) {
		AttributeResult attributeResult = mapFactory.getAttributeResultOld(lon, lat, serverType, shpType);
		return attributeResult;
	}
}
