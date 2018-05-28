package com.coorun.listener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.log4j.Logger;

import com.coorun.factory.LayerFactory;

/**
 * 初始服务监听器,用于服务启动时自动获取模型列表结果集
 * 
 * @author cd
 * @createDate 2017-09-29
 */
public class SystemListener implements ServletContextListener {

	LayerFactory layerFactory = new LayerFactory();
	Logger logger = Logger.getLogger(SystemListener.class);

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {

	}

	/**
	 * 服务启动时自动获取模型列表集合
	 */
	@Override
	public void contextInitialized(ServletContextEvent arg0) {

		// logger.debug("服务启动自动加载默认模型列表...");
		// ConfigBean config = BaseFactory.getConfig();
		// String modelSName = config.getModelSName();
		// String modelSType = config.getModelSType();
		// String dataType = config.getDataType();
		// logger.debug("modelSName:" + modelSName + ",modelSType:" + modelSType
		// + ",dataType:" + dataType);
		// layerFactory.createLayerMapNew(modelSName, modelSType, dataType);
		// logger.debug("服务启动自动加载默认模型列表完成!");

		layerFactory.getCityFactor();
		logger.debug("服务启动自动加载默认城市要素信息完成!");
		layerFactory.getDistrict();
		logger.debug("服务启动自动加载默认城市编码信息完成!");

		/** 自定义日志管理模块 **/
		// // 日志标题
		// String LogContent = "服务启动自动加载Log111111111111";
		// // 日志内容
		// String LogCode = "服务启动自动加载默认城市要素信息完成!";
		// // 生成日志
		// new LogCollectionImpl().setLog(this.getClass(), new
		// RawMessage(LogCode, LogContent));

	}

}
