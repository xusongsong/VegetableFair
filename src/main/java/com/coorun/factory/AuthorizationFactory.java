package com.coorun.factory;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.coorun.entity.ConfigBean;
import com.coorun.entity.Menu;
import com.coorun.om.base.bean.UserInfo;

/**
 * 权限管理OM系统菜单
 * @author shine
 *
 */
@Repository(value = "authorizationFactory")
public class AuthorizationFactory {
	
	/**
	 * 根据当前登录角色id查询角色相应权限菜单
	 * @return list
	 */
	public List<Menu> menusQuery(UserInfo loginUser){
		//获取菜单列表信息
		List<Menu> list = null;
		//获取配置文件信息
		ConfigBean config = BaseFactory.getConfig();
		//若获取的配置文件为空则返回
		if(config == null || "".equals(config)){
			return null;
		}
		//凭借ServerURL路径
		String url = "http://" + config.getServerIP() + ":" + config.getServerPort();
		String type = "/coo-server/roleoption/menusquery?sessionId=" + loginUser.getSessionId() + "&";
		String data = "data={'roleId':'" + loginUser.getRoleid() + "','menuId':''}";
		String serverUrl = url + type + data;
		JSONObject jsonObject = BaseFactory.getJSONObj4Server(serverUrl);
		//对返回值结果集进行判空
		if(jsonObject == null){
			return null;
		}
		if("200".equals(jsonObject.getString("retcode"))){
			//获取json数组
			JSONArray jsonArray = jsonObject.getJSONArray("results");
			if(jsonArray.size() > 0){
					list = new ArrayList<Menu>();
					for(int i= 0; i < jsonArray.size(); i++){
						//声明菜单对象
						Menu menu = new Menu();
						JSONObject jsonMenu = (JSONObject)jsonArray.get(i);
						menu.setChecked(jsonMenu.getBoolean("checked"));
						menu.setId(jsonMenu.getString("id"));
						menu.setIsParent(jsonMenu.getBoolean("isParent"));
						menu.setName(jsonMenu.getString("name"));
						menu.setpId(jsonMenu.getString("pId"));
						if((menu.getId()).indexOf("XT01") != -1){//将属于OM系统菜单列表提取出来(XT01)
							list.add(menu);
						}
					}
			}
		}
		return list;
	}
}
