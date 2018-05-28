package com.coorun.faceidentifymanage.web;

import com.coorun.faceidentifymanage.util.StringUtils;
import org.apache.log4j.Logger;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Iterator;
import java.util.Map;

public abstract class BaseController {

    private final Logger logger = Logger.getLogger(getClass());

    protected String getJsonParam(HttpServletRequest request) {
        StringBuilder jsonParam = new StringBuilder();

        try {
            ServletInputStream inputStream = request.getInputStream();
            byte[] bytes = new byte[512];
            int count = 0;
            while ((count = inputStream.read(bytes)) != -1) {
                logger.debug("读取数据:" + new String(bytes));
                jsonParam.append( new String(bytes, 0, count));
            }
        } catch (IOException e) {
            logger.error("获取post参数异常");
        }
        logger.debug("获取参数:" + jsonParam.toString());
        return jsonParam.toString();
    }

    /**
     * 移除不存在值的参数
     *
     * @param paramMap 参数集合
     * @return 参数集合
     */
    protected Map<String, String> clearEmptyEntry(Map<String, String> paramMap) {
        Iterator<String> iterator = paramMap.keySet().iterator();
        while (iterator.hasNext()) {
            String key = iterator.next();
            String value = paramMap.get(key);
            if (StringUtils.isEmpty(value)) {
                iterator.remove();
            }
        }
        return paramMap;
    }
}
