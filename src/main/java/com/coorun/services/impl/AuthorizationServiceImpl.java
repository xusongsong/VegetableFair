package com.coorun.services.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.coorun.entity.Menu;
import com.coorun.factory.AuthorizationFactory;
import com.coorun.om.base.bean.UserInfo;
import com.coorun.services.AuthorizationService;

/**
 * 权限管理实现类
 * @author shine
 *
 */
@Service("authorizationService")
public class AuthorizationServiceImpl implements AuthorizationService {
	@Resource
	AuthorizationFactory authorizationFactory;
	
	
	/**
	 *根据角色Id与用户SessionId获取角色菜单列表信息 
	 *@param user (存储用户sessionId值) role (存储角色id值)
	 *@return List<Menu> 菜单列表信息
	 */
	public List<Menu> menusQuery(UserInfo loginUser) {
		List<Menu> list = authorizationFactory.menusQuery(loginUser);
		return list;
	}
}
