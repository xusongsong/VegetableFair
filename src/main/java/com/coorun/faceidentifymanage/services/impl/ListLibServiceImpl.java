package com.coorun.faceidentifymanage.services.impl;

import com.coorun.faceidentifymanage.dao.HikDatasource;
import com.coorun.faceidentifymanage.services.ListLibService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Map;

@Service
public class ListLibServiceImpl implements ListLibService {

    @Resource
    private HikDatasource hikDatasource;

    @Override
    public String showListLib(Map<String, String> paramMap) {
        return hikDatasource.doGet("/artemis/api/fms/v2/staticlist/findRecord", paramMap);
    }

    @Override
    public String addListLib(String jsonParam, Map<String, String> paramMap) {
        return hikDatasource.doPost("/artemis/api/fms/v2/staticlist/addRecord", jsonParam, paramMap);
    }

    @Override
    public String modifyListLib(String jsonParam, Map<String, String> paramMap) {
        return hikDatasource.doPost("/artemis/api/fms/v2/staticlist/modifyRecord",jsonParam, paramMap);
    }

    @Override
    public String deleteListLib(String jsonParam, Map<String, String> paramMap) {
        return hikDatasource.doPost("/artemis/api/fms/v2/staticlist/deleteRecord", jsonParam, paramMap);
    }
}
