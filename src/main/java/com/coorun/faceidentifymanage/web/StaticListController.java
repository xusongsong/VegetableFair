package com.coorun.faceidentifymanage.web;

import com.coorun.faceidentifymanage.services.StaticListService;
import com.coorun.faceidentifymanage.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RequestMapping("staticlistoption")
@RestController
public class StaticListController extends BaseController {

    @Resource
    private StaticListService staticListService;

    /**
     * 查询静态库人员
     *
     * @param request http请求
     * @return 查询所有静态人员名单
     */
    public String showStaticList(HttpServletRequest request) {
        String humanName = request.getParameter("humanName");
        String sex = request.getParameter("sex");
        String credentialsType = request.getParameter("credentialsType");
        String credentialsNum = request.getParameter("credentialsNum");
        String listLibIds = request.getParameter("listLibIds");
        String pageNo = request.getParameter("pageNo");
        String pageSize = request.getParameter("pageSize");
        if (StringUtils.isEmpty(pageNo)) {
            pageNo = "1";
        }
        if (StringUtils.isEmpty(pageSize)) {
            pageSize = "10";
        }

        Map<String, String> paramMap = new HashMap<>();
        paramMap.put("humanName", humanName);
        paramMap.put("sex", sex);
        paramMap.put("credentialsType", credentialsType);
        paramMap.put("credentialsNum", credentialsNum);
        paramMap.put("listLibIds", listLibIds);
        paramMap.put("pageNo", pageNo);
        paramMap.put("pageSize", pageSize);
        clearEmptyEntry(paramMap);
        return staticListService.showStaticList(paramMap);
    }

    /**
     * 新增静态库人员
     *
     * @param request http请求
     * @return 添加状态
     */
    public String addRecord(HttpServletRequest request) {
        String jsonParam = getJsonParam(request);
        return staticListService.addRecord(jsonParam, null);
    }

    /**
     * 修改静态库人员
     *
     * @param request http请求
     * @return 添加状态
     */
    public String modifyRecord(HttpServletRequest request) {
        String jsonParam = getJsonParam(request);
        return staticListService.modifyRecord(jsonParam, null);
    }

    /**
     * 修改静态库人员
     *
     * @param request http请求
     * @return 添加状态
     */
    public String deleteRecord(HttpServletRequest request) {
        String jsonParam = getJsonParam(request);
        return staticListService.modifyRecord(jsonParam, null);
    }
}
