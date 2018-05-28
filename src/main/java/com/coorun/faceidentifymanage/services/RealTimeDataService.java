package com.coorun.faceidentifymanage.services;

import com.coorun.faceidentifymanage.entity.AlarmMQEntity;
import com.coorun.util.RetResult;

import java.util.Map;

public interface RealTimeDataService {

    /**
     * 获取FMS实时数据kafka地址
     *
     * @param paramMap 参数集合
     * @return 获取kafka地址
     */
    String getKafkaAddress(Map<String, String> paramMap);

    /**
     * 获取人脸实时报警数据topic信息
     *
     * @param paramMap 参数集合
     * @return 获取topic信息
     */
    AlarmMQEntity getAlarmTopic(Map<String, String> paramMap);
}
