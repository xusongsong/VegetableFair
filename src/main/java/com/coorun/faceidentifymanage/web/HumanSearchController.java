package com.coorun.faceidentifymanage.web;

import com.coorun.faceidentifymanage.services.HumanSearchService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

@RequestMapping("humansearchoption")
@RestController
public class HumanSearchController extends BaseController {

    @Resource
    private HumanSearchService humanSearchService;

    /**
     *  静态库检索
     *
     * @param request
     * @return
     */
    public String findStaticHuman(HttpServletRequest request) {
        String jsonParam = getJsonParam(request);
        return humanSearchService.findStaticHuman(jsonParam, null);
    }


    /**
     * 抓拍机库检索
     *
     * @param request
     * @return
     */
    public String findSnapHuman(HttpServletRequest request) {
        String jsonParam = getJsonParam(request);
        return humanSearchService.findSnapHuman(jsonParam, null);
    }

    /**
     * 1 : 1 比对
     *
             * @param request
     * @return
             */
    public String comparePics(HttpServletRequest request) {
        String jsonParam = getJsonParam(request);
        return humanSearchService.comparePics(jsonParam, null);
    }
}
