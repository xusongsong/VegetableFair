package com.coorun.faceidentifymanage.web;

import com.coorun.faceidentifymanage.services.DefenceService;
import com.coorun.faceidentifymanage.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

public class DefenceController extends BaseController {

    @Resource
    private DefenceService defenceService;

    @RequestMapping("defenceadd")
    public Object addDefence(HttpServletRequest request) {
        String jsonParam = getJsonParam(request);
        return defenceService.addDefence(jsonParam, null);
    }

    @RequestMapping("defenceremove")
    public Object removeDefence(HttpServletRequest request) {
        String jsonParam = getJsonParam(request);
        return defenceService.removeDefence(jsonParam, null);
    }

    /**
     *  获取布控参数信息
     *
     * @param request HTTP请求
     * @return 参数集合
     */
    private Map<String, String> getParamMap(HttpServletRequest request) {
        Map<String, String> paramMap = new HashMap<>();
        String name = request.getParameter("name");
        String libIds = request.getParameter("libIds");
        String deviceCodes = request.getParameter("deviceCodes");
        String startTime = request.getParameter("startTime");
        String endTime = request.getParameter("endTime");
        String validPeriod = request.getParameter("validPeriod");
        String details = request.getParameter("details");
        if (StringUtils.isEmpty(name, libIds, deviceCodes, validPeriod, details)) {
            return null;
        }
        return paramMap;
    }
}
