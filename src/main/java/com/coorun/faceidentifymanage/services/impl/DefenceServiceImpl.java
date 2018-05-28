package com.coorun.faceidentifymanage.services.impl;

import com.coorun.faceidentifymanage.dao.HikDatasource;
import com.coorun.faceidentifymanage.util.ResultUtil;
import com.coorun.faceidentifymanage.services.AbstractService;
import com.coorun.faceidentifymanage.services.DefenceService;
import com.coorun.util.RetResult;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Map;

@Service
public class DefenceServiceImpl implements DefenceService {

    @Resource
    private HikDatasource hikDatasource;

    private static final String ARTEMIS_PATH = "/artemis";

    @Override
    public String addDefence(String jsonParam, Map<String, String> paramMap) {
        final String url = ARTEMIS_PATH + "/api/fms/v2/control/addDefence";
        return hikDatasource.doPost(url, jsonParam, paramMap);
    }

    @Override
    public String removeDefence(String jsonParam, Map<String, String> paramMap) {
        final String url = ARTEMIS_PATH + "/api/fms/v2/control/removeDefence";
        return hikDatasource.doPost(url, jsonParam, paramMap);
    }
}
