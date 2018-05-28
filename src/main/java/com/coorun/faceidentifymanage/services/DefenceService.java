package com.coorun.faceidentifymanage.services;

import com.coorun.util.RetResult;

import java.util.Map;

public interface DefenceService {

    /**
     * 黑名单布防信息
     *
     * @param paramMap
     * @return
     */
    String addDefence(String jsonParam, Map<String, String> paramMap);

    /**
     * 黑名单撤防信息
     *
     * @param paramMap
     * @return
     */
    String removeDefence(String jsonParam, Map<String, String> paramMap);
}
