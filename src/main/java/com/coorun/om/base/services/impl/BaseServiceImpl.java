package com.coorun.om.base.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.coorun.om.base.dao.IBaseDao;
import com.coorun.om.base.services.IBaseService;

/********************************
 *
 * Author		: Billy
 * Create Date	: 2017-9-8上午10:04:04
 * Desc			:
 *
 ********************************/
@Service(value="baseService")
public class BaseServiceImpl implements IBaseService{
	
	IBaseDao baseDao;
	
	public List<Object> queryList(String sqlMapId,Object t){
		List<Object> list = (List<Object>)baseDao.selectList(sqlMapId, t);
		return list;
		
	}
	
	public Object queryOne(String sqlMapId,Object t){
		Object entity = (Object)baseDao.selectOne(sqlMapId, t);
		return entity;
	}
	
	public boolean save(String sqlMapId,Object t){
		boolean flage = baseDao.saveDatas(sqlMapId, t);
		return flage;
	}
	
	public boolean update(String sqlMapId,Object t){
		boolean flage = baseDao.modifyDatas(sqlMapId, t);
		return flage;
	}

	@Autowired
	public void setBaseDao(IBaseDao baseDao) {
		this.baseDao = baseDao;
	}
	
	

}
