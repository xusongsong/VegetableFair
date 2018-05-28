package com.coorun.faceidentifymanage.services;

import java.util.Map;

public interface BlackListService {

    /**
     * 查询黑名单信息
     *
     * @param paramMap
     * @return
     */
    String showBlackList(Map<String, String> paramMap);

    /**
     * 新增黑名单人员
     *
     * @param paramMap
     * @return
     */
    String addRecord(String jsonParam, Map<String, String> paramMap);

    /**
     * 修改黑名单信息
     *
     * @param paramMap
     * @return
     */
    String modifyRecord(String jsonParam, Map<String, String> paramMap);

    /**
     * 删除黑名单信息
     *
     * @param paramMap
     * @return
     */
    String deleteRecord(String jsonParam, Map<String, String> paramMap);
}
