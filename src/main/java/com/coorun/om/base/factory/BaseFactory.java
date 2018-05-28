package com.coorun.om.base.factory;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import com.coorun.entity.ConfigBean;



/**
 * 
 * @author shine
 * 读取config配置文件参数
 *
 */
public class BaseFactory {

	/**
	 * 静态变量配置文件对象ConfigBean
	 */
	static ConfigBean config = new ConfigBean();
	
	/**
	 * 
	 * @return ConfigBean配置文件对象
	 */
	public static ConfigBean loadConfig(){
		//读取配置文件
		Properties properties = new Properties();
		InputStream in = null;
		in = BaseFactory.class.getClassLoader().getResourceAsStream("config.properties");//根据类加载器动态获取输入流
		try{
			properties.load(in);
			//获取配置文件的参数值
			String serverIP = properties.getProperty("serverIP");
			String serverPort = properties.getProperty("serverPort");
			//赋值静态变量ConfigBean
			config.setServerIP(serverIP);
			config.setServerPort(serverPort);
		}catch(IOException e){
			e.printStackTrace();
		}finally{
			if(in!=null){
				try{
					in.close();//关闭输入流
				}catch(IOException e){
					e.printStackTrace();
				}
			}
		}
		return config;
	}
	
}
