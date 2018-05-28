package com.coorun.faceidentifymanage.services.impl;

import com.alibaba.fastjson.JSONObject;
import com.coorun.faceidentifymanage.dao.HikDatasource;
import com.coorun.faceidentifymanage.entity.CameraEntity;
import com.coorun.faceidentifymanage.entity.HikListResponseEntity;
import com.coorun.faceidentifymanage.util.ResultUtil;
import com.coorun.faceidentifymanage.services.AbstractService;
import com.coorun.faceidentifymanage.services.CameraService;
import com.coorun.util.Pager;
import com.coorun.util.RetResult;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CameraServiceImpl implements CameraService {

    @Resource
    private HikDatasource hikDatasource;

    private static final String ARTEMIS_PATH = "/artemis";

    @Override
    public RetResult showCameraList(Map<String, String> paramMap) {
        final String url = ARTEMIS_PATH + "/api/fms/v2/resource/findCamera";
        String hikResponseStr = hikDatasource.doGet(url, paramMap);
        HikListResponseEntity hikListResponseEntity = JSONObject.parseObject(hikResponseStr, HikListResponseEntity.class);
        Pager pager = toPager(hikListResponseEntity);
        if (null != pager && hikListResponseEntity.getCode() == 0) {
            return new RetResult("0", "查询抓拍机列表成功", pager);
        }
        return new RetResult("-1", "查询抓拍机列表失败");
    }

    @Override
    public String addCamera(String jsonParam, Map<String, String> paramMap) {
        final String url = ARTEMIS_PATH + "/api/fms/v2/resource/addCamera";
        return hikDatasource.doPost(url, jsonParam, paramMap);
    }

    @Override
    public String updateCameraInfo(String jsonParam, Map<String, String> paramMap) {
        final String url = ARTEMIS_PATH + "/api/fms/v2/resource/updateCamera";
        return hikDatasource.doPost(url, jsonParam, paramMap);
    }

    @Override
    public String deleteCamera(String jsonParam, Map<String, String> paramMap) {
        final String url = ARTEMIS_PATH + "/api/fms/v2/resource/deleteCamera";
        return hikDatasource.doPost(url, jsonParam, paramMap);
    }

    private Pager toPager(HikListResponseEntity hikListResponseEntity) {
        if (null == hikListResponseEntity) {
            return null;
        }

        Pager pager = new Pager();
        pager.setRecords(hikListResponseEntity.getList());
        pager.setPageSize(hikListResponseEntity.getPageSize());
        pager.setPageNo(hikListResponseEntity.getPageNo());
        return pager;
    }
}
