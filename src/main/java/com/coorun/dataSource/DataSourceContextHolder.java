package com.coorun.dataSource;
/**
 * 数据源动态切换操作类
 * @author Billy
 *
 */
public class DataSourceContextHolder {

    private static final ThreadLocal<String> contextHolder = new ThreadLocal<String>();

    public static void setDataSource(String dataSourceType){
        contextHolder.set(dataSourceType);
    }

    public static String getDataSourceType(){
        return contextHolder.get();
    }

    public static void removeDataSource(){
        contextHolder.remove();
    }
}
