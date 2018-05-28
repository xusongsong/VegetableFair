package com.coorun.faceidentifymanage.services;

import java.util.Map;

public interface HumanSearchService {

    /**
     * 静态库检索 （可对导入的静态库人员进行查询，支持以图搜图和身份结构化信息两种方式检索）
     *
     * @param paramMap
     * @return
     */
    String findStaticHuman(String jsonParam, Map<String, String> paramMap);

    /**
     * 抓拍库检索（可对抓拍的人员图片进行查询，支持以图搜图和抓拍人脸结构化信息两种方式检索）
     *
     * @param paramMap 参数集合
     * @return 检索结果集
     */
    String findSnapHuman(String jsonParam, Map<String, String> paramMap);

    /**
     * 比对接口1V1
     *
     * @param paramMap 参数集合
     * @return 检索结果集
     */
    String comparePics(String jsonParam, Map<String, String> paramMap);
}
