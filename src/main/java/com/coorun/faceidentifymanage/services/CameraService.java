package com.coorun.faceidentifymanage.services;

import com.coorun.faceidentifymanage.entity.HikListResponseEntity;
import com.coorun.util.RetResult;

import java.util.Map;

public interface CameraService {

    /**
     * 查询抓拍机信息
     *
     * @param paramMap
     * @return
     */
    RetResult showCameraList(Map<String, String> paramMap);

    /**
     * 新增抓拍机信息
     *
     * @param paramMap
     * @return
     */
    String addCamera(String jsonParam, Map<String, String> paramMap);

    /**
     * 修改抓拍机信息
     *
     * @param paramMap
     * @return
     */
    String updateCameraInfo(String jsonParam, Map<String, String> paramMap);

    /**
     * 删除抓拍机信息
     *
     * @param paramMap
     * @return
     */
    String deleteCamera(String jsonParam, Map<String, String> paramMap);
}
