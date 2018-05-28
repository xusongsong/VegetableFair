package com.coorun.om.base.dao;

import java.util.List;

public interface IBaseDao {
	
	public boolean saveDatas(String sqlMapId,Object t);
	
	public boolean modifyDatas(String sqlMapId,Object t);
	
	public Object selectOne(String sqlMapId,Object id);
	
	public List<Object> selectList(String sqlMapId,Object t);

}
