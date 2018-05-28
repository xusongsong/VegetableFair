package com.coorun.faceidentifymanage.services.impl;

import com.coorun.faceidentifymanage.dao.HikDatasource;
import com.coorun.faceidentifymanage.services.AbstractService;
import com.coorun.faceidentifymanage.services.StaticListService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Map;

@Service
public class StaticListServiceImpl implements StaticListService {

    private static final String ARTEMIS_PATH = "/artemis";

    @Resource
    private HikDatasource hikDatasource;

    @Override
    public String showStaticList(Map<String, String> paramMap) {
        final String url = ARTEMIS_PATH + "/api/fms/v2/staticlist/findRecord";
        return hikDatasource.doGet(url, paramMap);
    }

    @Override
    public String addRecord(String jsonParam, Map<String, String> paramMap) {
        final String url = ARTEMIS_PATH + "/api/fms/v2/staticlist/addRecord";
        return hikDatasource.doPost(url, jsonParam, paramMap);
    }

    @Override
    public String modifyRecord(String jsonParam, Map<String, String> paramMap) {
        final String url = ARTEMIS_PATH + "/api/fms/v2/staticlist/modifyRecord";
        return hikDatasource.doPost(url, jsonParam, paramMap);
    }

    @Override
    public String deleteRecord(String jsonParam, Map<String, String> paramMap) {
        final String url = ARTEMIS_PATH + "/api/fms/v2/staticlist/deleteRecord";
        return hikDatasource.doPost(url, jsonParam, paramMap);
    }
}
