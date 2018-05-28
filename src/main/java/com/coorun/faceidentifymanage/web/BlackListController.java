package com.coorun.faceidentifymanage.web;

import com.coorun.faceidentifymanage.services.BlackListService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * 黑名单信息查询
 *
 * @author jwei
 * @date 2018-4-7
 */
@RestController
@RequestMapping("blacklistoption")
public class BlackListController extends BaseController {

    @Resource
    private BlackListService blackListService;

    /**
     * 获取黑名单列表
     *
     * @param request
     * @return
     */
    public Object showBlackList(HttpServletRequest request) {
        Map<String, String> paramMap = new HashMap<>();
        return blackListService.showBlackList(paramMap);
    }

    /**
     * 添加黑名单
     *
     * @param request
     * @return
     */
    public Object addBlackList(HttpServletRequest request) {
        String jsonParam = getJsonParam(request);
        return blackListService.addRecord(jsonParam, null);
    }

    /**
     * 修改黑名单
     *
     * @param request
     * @return
     */
    public Object modifyBlackList(HttpServletRequest request) {
        String jsonParam = getJsonParam(request);
        return blackListService.modifyRecord(jsonParam, null);
    }


    /**
     * 删除黑名单
     *
     * @param request
     * @return
     */
    public Object deleteBlackList(HttpServletRequest request) {
        String jsonParam = getJsonParam(request);
        return blackListService.deleteRecord(jsonParam, null);
    }
}
