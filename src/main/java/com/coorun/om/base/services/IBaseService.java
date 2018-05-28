package com.coorun.om.base.services;

import java.util.List;

/********************************
 *
 * Author		: Billy
 * Create Date	: 2017-9-8上午10:24:08
 * Desc			:
 *
 ********************************/

public interface IBaseService {
	
	public List<Object> queryList(String sqlMapId,Object t);
	
	public Object queryOne(String sqlMapId,Object t);
	
	public boolean save(String sqlMapId,Object t);
	
	public boolean update(String sqlMapId,Object t);

}
