package com.coorun.services;

import com.coorun.entity.VideoPathResult;

import java.util.List;

public interface SecurityManageService {
    /**
     * 巡更路径功能---查询巡更路径
     *
     * @param videoPathName
     * @param userID
     * @return List<VideoPathResult>
     */
    List<VideoPathResult> queryVideoPathResult(String videoPathName,String userID);

    /**
     * 巡更路径功能---删除巡更路径
     *
     * @param id
     * @param userID
     * @return Boolean
     */
    Boolean deleteVideoPath(String id,String userID);

    /**
     * 巡更路径功能---新增巡更路径
     *
     * @param videoPathName
     * @param userID
     * @param videoPathPoints
     * @param videoPathParams
     * @return Boolean
     */
    Boolean addVideoPath(String videoPathName, String id,String userID, String videoPathPoints, String videoPathParams);
	

}
