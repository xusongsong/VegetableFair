package com.coorun.services.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.coorun.entity.LabelResult;
import com.coorun.entity.PathResult;
import com.coorun.entity.ViewResult;
import com.coorun.factory.SceneManagerFactory;
import com.coorun.services.SceneManagerService;

/**
 * 场景管理功能模块
 * 
 * @author DL
 * @createDate 2017-10-11
 */
@Service("sceneManagerService")
public class SceneManagerServiceImpl implements SceneManagerService {
	/** 场景管理 **/
	@Resource
	SceneManagerFactory sceneManagerFactory;

	/** 视点新增 **/
	@Override
	public Boolean addViewPoint(String name, String userId, String z, String x, String y, String descr,
			String rotateAngle, String overAngle, String range) {
		Boolean trueOrFalse = sceneManagerFactory.addView(name, userId, z, x, y, descr, rotateAngle, overAngle, range);
		return trueOrFalse;
	}

	/** 视点删除 **/
	@Override
	public Boolean deleteViewPoint(String id) {
		Boolean trueOrFalse = sceneManagerFactory.deleteView(id);
		return trueOrFalse;
	}

	/** 视点修改 **/
	@Override
	public Boolean modifyView(String id, String name, String z, String x, String y, String descr,
			String rotateAngle, String overAngle, String range) {
		Boolean trueOrFalse = sceneManagerFactory.modifyView(id, name, z, x, y, descr, rotateAngle, overAngle,
				range);
		return trueOrFalse;
	}

	/** 视点查询 **/
	@Override
	public List<ViewResult> queryViewPoint( String name) {
		List<ViewResult> list = sceneManagerFactory.getViewResult( name);
		return list;
	}

	/** 路径查询 **/
	@Override
	public List<PathResult> queryPathResult(String pathName) {
		List<PathResult> list = sceneManagerFactory.getPathResult(pathName);
		return list;
	}

	/** 路径删除 **/
	@Override
	public Boolean deletePath(String id) {
		Boolean trueOrFalse = sceneManagerFactory.deletePath(id);
		return trueOrFalse;
	}

	/** 路径新增 **/
	@Override
	public Boolean addPath(String pathName, String userId, String lnglats, String viewModel) {
		Boolean trueOrFalse = sceneManagerFactory.addPath(pathName, userId, lnglats, viewModel);
		return trueOrFalse;
	}
	
	/** 标注查询 */
	@Override
	public List<LabelResult> queryLabelPoint( String name) {
		List<LabelResult> list = sceneManagerFactory.loadLabelResult( name);
		return list;
	}

	/** 标注添加 */
	@Override
	public Map<String,String> addLabelPoint(LabelResult labelResult) {
		Map<String,String> labelMap = sceneManagerFactory.addLabel(labelResult);
		return labelMap;
	}

	/** 标注修改 */
	@Override
	public String updateLabelPoint(LabelResult labelResult) {
		String labelState = sceneManagerFactory.updateLabel(labelResult);
		return labelState;
	}

	/** 标注删除 */
	@Override
	public String delLabelPoint(String id) {
		String labelState = sceneManagerFactory.delLabel(id);
		return labelState;
	}
}
