package com.coorun.faceidentifymanage.services.impl;

import com.coorun.faceidentifymanage.dao.HikDatasource;
import com.coorun.faceidentifymanage.services.HumanSearchService;
import com.coorun.util.RetResult;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Map;

@Service
public class HumanSearchServiceImpl implements HumanSearchService {

    @Resource
    private HikDatasource hikDatasource;

    @Override
    public String findStaticHuman(String jsonParam, Map<String, String> paramMap) {
        return hikDatasource.doPost("/artemis/api/fms/v2/human/findStaticHuman", jsonParam, paramMap);
    }

    @Override
    public String findSnapHuman(String jsonParam, Map<String, String> paramMap) {
        return hikDatasource.doPost("/artemis/api/fms/v2/human/findSnapHuman", jsonParam, paramMap);
    }

    @Override
    public String comparePics(String jsonParam, Map<String, String> paramMap) {
        return hikDatasource.doPost("/artemis/api/fms/v2/human/comparePics",jsonParam, paramMap);
    }
}
