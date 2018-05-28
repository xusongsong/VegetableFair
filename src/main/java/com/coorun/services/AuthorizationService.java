package com.coorun.services;

import java.util.List;

import com.coorun.entity.Menu;
import com.coorun.om.base.bean.UserInfo;

/**
 * 权限功能接口
 * 
 * @author shine
 * @createDate 2017-12-18
 */
public interface AuthorizationService {
	//获取权限管理菜单列表
	public List<Menu> menusQuery(UserInfo loginUser);
	
}
