package com.coorun.faceidentifymanage.services;

import java.util.Map;

public interface ListLibService {

    /**
     * 查询名单库信息
     *
     * @param paramMap 请求参数集合
     * @return 所有白名单集合
     */
    String showListLib(Map<String, String> paramMap);

    /**
     * 添加名单
     *
     * @param paramMap 请求参数集合
     * @return 添加状态
     */
    String addListLib(String jsonParam, Map<String, String> paramMap);

    /**
     * 修改名单库信息
     *
     * @param paramMap 请求参数集合
     * @return 修改状态
     */
    String modifyListLib(String jsonParam, Map<String, String> paramMap);

    /**
     * 删除名单库信息
     *
     * @param paramMap 请求参数集合
     * @return 删除
     */
    String deleteListLib(String jsonParam, Map<String, String> paramMap);
}
