package com.coorun.faceidentifymanage.services.impl;

import com.alibaba.fastjson.JSONObject;
import com.coorun.faceidentifymanage.dao.HikDatasource;
import com.coorun.faceidentifymanage.entity.AlarmMQEntity;
import com.coorun.faceidentifymanage.services.RealTimeDataService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Map;

@Service("liveDataService")
public class LiveDataServiceImpl implements RealTimeDataService {

    @Resource
    private HikDatasource hikDatasource;

    @Override
    public String getKafkaAddress(Map<String, String> paramMap) {
        String response = hikDatasource.doGet("/artemis/api/fms/v2/system/getKafkaAddress", paramMap);
        JSONObject jsonObject = JSONObject.parseObject(response);
        if (null != jsonObject) {
            return jsonObject.getString("data");
        }
        return null;
    }

    @Override
    public AlarmMQEntity getAlarmTopic(Map<String, String> paramMap) {
        paramMap.put("appKey", hikDatasource.getAppKey());
        String response = hikDatasource.doGet("/artemis/api/mss/v2/fms/getAlarmTopic", paramMap);
        return JSONObject.parseObject(response, AlarmMQEntity.class);
    }
}
