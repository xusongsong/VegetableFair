package com.coorun.om.base.dao.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Repository;

import com.coorun.om.base.dao.IBaseDao;

@Repository(value="baseDao")
public class BaseDaoImpl extends SqlSessionDaoSupport  implements IBaseDao {
	
	

	@Override
	public boolean saveDatas(String sqlMapId, Object t) {
		int flag = getSqlSession().insert(sqlMapId, t);
		if(flag > 0){
			return true;
		}
		return false;
	}

	@Override
	public boolean modifyDatas(String sqlMapId, Object t) {
		int flag = getSqlSession().update(sqlMapId, t);
		if(flag > 0){
			return true;
		}
		return false;
	}

	@Override
	public Object selectOne(String sqlMapId, Object id) {
		return getSqlSession().selectOne(sqlMapId, id);
	}

	@Override
	public List selectList(String sqlMapId, Object t) {
		return getSqlSession().selectList(sqlMapId, t);
	}

	
	@Resource
	public void setSqlSessionFactory(SqlSessionFactory sqlSessionFactory) {
        // TODO Auto-generated method stub
        super.setSqlSessionFactory(sqlSessionFactory);
    }
	
	
	public SqlSession getSession(){
		return getSqlSession();
	}
	
	
	
	

}
