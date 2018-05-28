package com.coorun.om.base.factory;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.coorun.entity.ConfigBean;
import com.coorun.om.base.bean.UserInfo;
import com.coorun.om.base.util.RetResult;
import com.coorun.om.base.util.ServerRequest;

/*************************
 *
 * Author		:	Billy
 * Create Date	:	2017年12月4日 下午1:06:25
 * Desc			:
 *
**************************/
public class LoginFactory {
	
	/**
	 * 用户登录验证
	 * @param userName
	 * @param passwd
	 * @return RetResult<UserInfo> 
	 */
	public static RetResult<UserInfo> login(String userName,String passwd){
		RetResult<UserInfo> retResult = new RetResult<UserInfo>();
		UserInfo userInfo = new UserInfo();
		ConfigBean config = BaseFactory.loadConfig();
		String methodPath = "http://"+config.getServerIP()+":"+config.getServerPort()+"/coo-server/useroption/userlogin?data={'userName':'"+userName+"','password':'"+passwd+"'}";
		JSONObject obj = ServerRequest.getJSONObjectResult(methodPath);
		if(null != obj){
			if("200".equals(obj.get("retcode"))){
				JSONObject retObj = JSON.parseObject(obj.get("results").toString());
				userInfo.setUid(retObj.getString("id"));
				userInfo.setUsername(retObj.getString("name"));
				JSONObject roleObj = JSON.parseObject(retObj.get("role").toString());
				userInfo.setRoleid(roleObj.getString("id"));
				userInfo.setRoleName(roleObj.getString("name"));
				userInfo.setSessionId(obj.getString("sessionId"));
				retResult.setSuccess("1");
			}else{
				retResult.setSuccess("0");
				String message = obj.getString("msg");
				if("username-password-error".equals(message)){
					retResult.setMsg("用户名或密码错误!");
				}else if("user-locked".equals(message)){
					retResult.setMsg("用户已被冻结!");
				}
				return retResult;
			}
		}else{
			retResult.setSuccess("0");
			retResult.setMsg("服务异常，请联系管理员进行处理!");
			return retResult;
		}
		retResult.setRecord(userInfo);
		return retResult;
	}
	/**
	 * 
	 * @param sessionId
	 */
	public static void loginOut(String sessionId){
		ConfigBean config = BaseFactory.loadConfig();
		String methodPath = "http://"+config.getServerIP()+":"+config.getServerPort()+"/coo-server/useroption/userlogout?data={'sessionId':'"+sessionId+"'}";
		JSONObject obj = ServerRequest.getJSONObjectResult(methodPath);
	}
	
	public static void main(String[] args) {
		LoginFactory factory = new LoginFactory();
		factory.login("administrator", "administrator");
	}

}
