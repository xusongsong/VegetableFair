package com.coorun.faceidentifymanage.services;

import java.util.Map;

public interface StaticListService {

    /**
     * 查询静态库列表
     *
     * @param paramMap
     * @return
     */
    String showStaticList(Map<String, String> paramMap);

    /**
     * 添加静态人员名单
     *
     * @param paramMap
     * @return
     */
    String addRecord(String jsonParam, Map<String, String> paramMap);

    /**
     * 修改静态人员信息
     *
     * @param paramMap
     * @return
     */
    String modifyRecord(String jsonParam, Map<String, String> paramMap);

    /**
     * 删除静态人员信息
     *
     * @param paramMap
     * @return
     */
    String deleteRecord(String jsonParam, Map<String, String> paramMap);
}
