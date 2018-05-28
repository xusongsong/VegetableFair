package com.coorun.factory;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.coorun.entity.ConfigBean;
import com.coorun.entity.VideoPathResult;
import com.coorun.util.ServerRequest;
import org.springframework.stereotype.Repository;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import com.alibaba.fastjson.JSON;



@Repository(value = "securityManageFactory")
public class SecurityManageFactory {

    /**
     * 巡更功能---查询巡更 封装成List<VideoPathResult>对象
     *
     * @param videoPathName
     * @return List<VideoPathResult>
     */
    public List<VideoPathResult> getVideoPathResult(String videoPathName) {
        List<VideoPathResult> list = new ArrayList<VideoPathResult>();
        /** 通过配置文件拼接第三方服务路径 **/
        ConfigBean config = BaseFactory.getConfig();
        if (config == null) {
            return null;
        }
        String url = "http://" + config.getServerIP() + ":" + config.getServerPort();
        String type = "/coo-server/viewpointoption/viewpointquery?";
        String data = null;
        try {
            data = "data={'videoPathName':'" + URLEncoder.encode(videoPathName, "utf-8") + "'}";
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        // 拼接路径
        String serverUrl = url + type + data;
        // 获取预处理后的json格式数据
        JSONObject jsonObject = getJSONObj4Server(serverUrl);
        // 判定状态值
        String stateNum = "200";
        String state = jsonObject.getString("retcode");
        if (stateNum.equals(state)) {
            // 把json格式的数据转换成数组,对数组中的对象逐个进行解析封装成PathResult对象(PS:多个对象)
            JSONArray jsonArray = jsonObject.getJSONObject("results").getJSONArray("dataList");
            for (int i = 0; i < jsonArray.size(); i++) {
                /** 逐个解析封装PathResult对象 **/
                VideoPathResult videoPathResult = new VideoPathResult();
                JSONObject parameter = ((JSONObject) jsonArray.get(i));
                videoPathResult.setId(parameter.getString("id"));
                videoPathResult.setUserID(parameter.getString("userID"));
                videoPathResult.setVideoPathName(parameter.getString("videoPathName"));
                videoPathResult.setVideoPathPoints(parameter.getString("videoPathPoints"));
                videoPathResult.setVideoPathParams(parameter.getString("videoPathParams"));
                // 放入List<VideoPathResult>数组
                list.add(videoPathResult);
            }
        }
        return list;
    }
    /**
     * 巡更功能---新增巡更
     *
     * @param videoPathName
     * @param userID
     * @param videoPathPoints
     * @param videoPathParams
     * @return Boolean
     */
    public Boolean addVideoPath(String videoPathName, String id,String userID, String videoPathPoints, String videoPathParams) {
        /** 通过配置文件拼接第三方服务路径 **/
        ConfigBean config = BaseFactory.getConfig();
        if (config == null) {
            return null;
        }
        String url = "http://" + config.getServerIP() + ":" + config.getServerPort();
        String type = "/coo-server/viewpointoption/viewpointadd?";
        String data = null;
        try {
            data = "data={'videoPathName':'" + URLEncoder.encode(videoPathName, "utf-8") + "','userID':'" + userID
                    + "','id':'" + id + "','videoPathPoints':'" + videoPathPoints + "','videoPathParams':'" + videoPathParams + "'}";
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        // 拼接路径
        String serverUrl = url + type + data;
        // 获取预处理后的json格式数据
        JSONObject jsonObject = getJSONObj4Server(serverUrl);
        // 判定状态值
        String stateNum = "200";
        String state = jsonObject.getString("retcode");
        if (stateNum.equals(state)) {
            return true;
        }
        return false;
    }


    /**
     * 巡更功能---删除巡更
     * @param id
     * @return Boolean
     */
    public Boolean deleteVideoPath(String id) {
        /** 通过配置文件拼接第三方服务路径 **/
        ConfigBean config = BaseFactory.getConfig();
        if (config == null) {
            return null;
        }
        String url = "http://" + config.getServerIP() + ":" + config.getServerPort();
        String type = "/coo-server/viewpointoption/viewpointdelete?";
        String data = "data={'id':'" + id + "'}";
        // 拼接路径
        String serverUrl = url + type + data;
        // 获取预处理后的json格式数据
        JSONObject jsonObject = getJSONObj4Server(serverUrl);
        // 判定状态值
        String stateNum = "200";
        String state = jsonObject.getString("retcode");
        if (stateNum.equals(state)) {
            return true;
        }
        return false;
    }

    /**
     * 获取第三方服务数据并进行预处理
     *
     * @param serverUrl
     * @return JSONObject
     */
    public static JSONObject getJSONObj4Server(String serverUrl) {
        String result4Server = null;
        /** 通过服务路径获取第三方服务数据 **/
        result4Server = ServerRequest.getResultByURL(serverUrl);
        //服务端返回结果集合进行判空
        if("".equals(result4Server) || result4Server == null){
            return null;
        }
        // 对结果集进行处理
        int firstIndex = result4Server.indexOf("(");
        int lastIndex = result4Server.lastIndexOf(")");
        if ((firstIndex == -1) || (lastIndex == -1)) {
            return null;
        }
        result4Server = result4Server.substring(firstIndex + 1, lastIndex);
        // 把预处理结果转换成json格式数据
        JSONObject jsonObject = JSON.parseObject(result4Server);
        return jsonObject;
    }
}
