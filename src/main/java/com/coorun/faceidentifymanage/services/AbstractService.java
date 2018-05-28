package com.coorun.faceidentifymanage.services;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.coorun.faceidentifymanage.util.ResultUtil;

import java.util.List;

public abstract class AbstractService {


    protected static <T> List<T> getResultList(String msgstr, Class<T> clazz) {
        if (null == msgstr || null == clazz) {
            return null;
        }

        List<T> resultList = null;
        ResultUtil result = getResultUtil(msgstr);
        String code = result.getCode();
        if ("200".equals(code)) {
            String data = result.getData();
            resultList = JSON.parseArray(data, clazz);
        }

        return resultList;
    }

    protected static ResultUtil getResultUtil(String msgstr) {
        return JSONObject.parseObject(msgstr, ResultUtil.class);
    }
}
