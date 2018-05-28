package com.coorun.dataSource;

import java.util.Map;

import javax.sql.DataSource;
/**
 * 数据类型格式
 * @author Billy
 *
 */
public class DataSourceType {
    //PG数据库
    public static final String POSTGRESQL = "dataSourcePG";
    //SQL Server
    public static final String MSSQL = "dataSourceMSSQL";
    // ORACLE
    public static final String ORCLE = "dataSourceORACLE";
    // DB2
    public static final String DB2 = "dataSourceDB2";
    // MYSQL
    public static final String MYSQL = "dataSourceMYSQL";
    
    private Map<String,DataSource> supportDataSource ;
    
    public DataSource currentDataSource;  
    
}
