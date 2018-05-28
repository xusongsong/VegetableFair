package com.coorun.aop;

import javax.servlet.http.HttpServletRequest;

import org.aspectj.lang.JoinPoint;

import com.coorun.om.base.bean.UserInfo;
import com.coorun.om.base.util.Constants;

/**
 * 日志管理-AOP具体处理
 * 
 * @author DL
 * @Date: 2018/1/16
 * @Time: 15:42
 * @annotation SysLog
 */
public class SysLog {
	public void dealWithLog(JoinPoint joinPoint, Exception e) {
		// 获取-发生错误的类
		Class<? extends Object> classObject = joinPoint.getTarget().getClass();
		// 获取-发生错误的方法名
		String signature = joinPoint.getSignature().toString();
		String methodName = signature.substring(signature.lastIndexOf(".") + 1, signature.indexOf("("));
		// 获取-日志内容
		String LogContent = e.toString();
		// 获取-登陆者信息
		String userID = null;
		// 获取-IP
		String LoginIP = null;
		Object[] obj = joinPoint.getArgs();
		for (int i = 0; i < obj.length; i++) {
			if (obj[i] instanceof HttpServletRequest) {
				HttpServletRequest req = (HttpServletRequest) obj[i];
				UserInfo user = (UserInfo) req.getSession().getAttribute(Constants.CURRENT_USER);
				// 登陆者
				userID = user.getUid();
				// IP
				LoginIP = new SysLog().getLocalIp(req);
			}
		}
		// 根目录路径
		String rootPath = getClass().getResource("/").getFile().toString();
		String[] psthList = rootPath.split("/");
		// 获取-项目名
		String origin = null;
		for (int i = 0; i < psthList.length; i++) {
			if ("WEB-INF".equals(psthList[i])) {
				origin = psthList[i - 1];
			}
		}
		// 生成日志
//		RawMessage rmsg = new RawMessage();
//		rmsg.setOrigin(origin);
//		rmsg.setUserID(userID);
//		rmsg.setMethodName(methodName);
//		rmsg.setContent(LogContent);
//		rmsg.setLoginIP(LoginIP);
//		new LogCollectionImpl().setLog(classObject, rmsg);
	}

	/**
	 * 从Request对象中获得客户端IP，处理了HTTP代理服务器和Nginx的反向代理截取了ip
	 * 
	 * @param request
	 * @return ip
	 */
	public String getLocalIp(HttpServletRequest request) {
		String remoteAddr = request.getRemoteAddr();
		String forwarded = request.getHeader("X-Forwarded-For");
		String realIp = request.getHeader("X-Real-IP");
		String ip = null;
		if (realIp == null) {
			if (forwarded == null) {
				ip = remoteAddr;
			} else {
				ip = remoteAddr + "/" + forwarded.split(",")[0];
			}
		} else {
			if (realIp.equals(forwarded)) {
				ip = realIp;
			} else {
				if (forwarded != null) {
					forwarded = forwarded.split(",")[0];
				}
				ip = realIp + "/" + forwarded;
			}
		}
		return ip;
	}
}
