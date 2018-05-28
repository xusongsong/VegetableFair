package com.coorun.faceidentifymanage.services.impl;

import com.coorun.faceidentifymanage.dao.HikDatasource;
import com.coorun.faceidentifymanage.services.BlackListService;
import com.coorun.util.RetResult;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Map;

@Service
public class BlackListServiceImpl implements BlackListService {

    @Resource
    private HikDatasource hikDatasource;

    @Override
    public String showBlackList(Map<String, String> paramMap) {
        return hikDatasource.doGet("/artemis/api/fms/v2/blacklist/findRecord", paramMap);
    }

    @Override
    public String addRecord(String jsonParam, Map<String, String> paramMap) {
        return hikDatasource.doPost("/artemis/api/fms/v2/blacklist/addRecord", jsonParam, paramMap);
    }

    @Override
    public String modifyRecord(String jsonParam, Map<String, String> paramMap) {
        return hikDatasource.doPost("/artemis/api/fms/v2/blacklist/modifyRecord", jsonParam, paramMap);
    }

    @Override
    public String deleteRecord(String jsonParam, Map<String, String> paramMap) {
        return hikDatasource.doPost("/artemis/api/fms/v2/blacklist/deleteRecord", jsonParam, paramMap);
    }
}
