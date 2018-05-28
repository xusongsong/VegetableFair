package com.coorun.faceidentifymanage.mq.realtimemessage;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.coorun.faceidentifymanage.entity.SnapshotPushCallbackEntity;
import com.coorun.faceidentifymanage.entity.TargetAttrsEntity;
import com.coorun.faceidentifymanage.mq.PushListener;
import com.hikvision.fas.caller.Message;
import org.apache.log4j.Logger;
import org.directwebremoting.Browser;
import org.directwebremoting.ScriptBuffer;
import org.directwebremoting.ScriptSession;
import org.directwebremoting.ScriptSessionFilter;

import java.util.*;
import java.util.concurrent.Executor;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * 获取海康推送的实时信息，并将信息推送到客户端中
 */
public class SnapshotPushCallback implements Message {

    private Logger logger = Logger.getLogger(SnapshotPushCallback.class);
    private final Executor executor;

    public SnapshotPushCallback() {
        executor = Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors());
    }


    @Override
    public void receiveRealMessage(String message) {
        logger.debug("获取抓拍数据: " + message.substring(0, 100));

        executor.execute(new MessagePush(message));
    }

    private void sendMessage(final String message) {
        Browser.withAllSessionsFiltered(new ScriptSessionFilter() {
                public boolean match(ScriptSession session){
                    return true;
                }
            },

            new Runnable(){
                private ScriptBuffer script = new ScriptBuffer();
                public void run(){
                    script.appendCall("showSnapshotMessage", message);

                    Collection<ScriptSession> scriptSessions = PushListener.getScriptSessions();
                    for (ScriptSession scriptSession : scriptSessions) {
                        logger.debug("推送实时抓拍消息:  " + scriptSession + "   script:" + script);
                        scriptSession.addScript(script);
                    }
                }
        });
    }

    /**
     * 讲将海康推送的信息转换成对象
     *
     * @param jsonstr 推送信息
     * @return SnapshotPushCallbackEntity 集合
     */
    private static List<SnapshotPushCallbackEntity> getSnapshotEntitysFromHikResponseJson(String jsonstr) {
        List<SnapshotPushCallbackEntity> snapshotEntities = null;

        try {
            snapshotEntities = JSON.parseArray(jsonstr, SnapshotPushCallbackEntity.class);

            // 解决无法直接根据海康提供过来的返回值直接转成SnapshotEntity对象
            if (null != snapshotEntities) {
                for (SnapshotPushCallbackEntity snapshotEntity : snapshotEntities) {
                    TargetAttrsEntity targetAttrsEntity = JSONObject.parseObject(
                            snapshotEntity.getTargetAttrs(), TargetAttrsEntity.class);
                    snapshotEntity.setTargetAttrsEntity(targetAttrsEntity);
                }
            }
        } catch (Exception e) {

            // 通过字符串截取方式获取抓拍信息
            try {
                snapshotEntities = getEntityFromExceptionMessage(jsonstr);
            } catch (Exception e1) {
                throw new IllegalArgumentException("解析实时抓拍信息异常: " + jsonstr, e1);
            }
        }
        return snapshotEntities;
    }

    /**
     * 解决海康推送过来的数据中double类型数据为空时传入nan值
     *
     * @param snapshotMsg 实时抓拍信息（无法直接转成json字符串）
     * @return 抓拍实体信息
     */
    private static List<SnapshotPushCallbackEntity> getEntityFromExceptionMessage(String snapshotMsg) {
        List<SnapshotPushCallbackEntity> entities = new ArrayList<>();

        do {
            // 获取人脸图片
            String imagePath = snapshotMsg.substring(snapshotMsg.indexOf("image"), snapshotMsg.indexOf("\","));
            imagePath = imagePath.substring(imagePath.indexOf("http"));

            // 获取抓拍机名称
            snapshotMsg = snapshotMsg.substring(snapshotMsg.indexOf("deviceName"));
            String deviceName = snapshotMsg.substring(0, snapshotMsg.indexOf("\",") - 1);
            deviceName =  deviceName.substring(deviceName.lastIndexOf("\"") + 1);

            // 获取抓拍时间
            snapshotMsg = snapshotMsg.substring(snapshotMsg.indexOf("faceTime"));
            String faceTime = snapshotMsg.substring(0, snapshotMsg.indexOf("\",") - 1);
            faceTime = faceTime.substring(faceTime.lastIndexOf("\"") + 1);

            SnapshotPushCallbackEntity entity = new SnapshotPushCallbackEntity();
            entity.setImage(imagePath);
            TargetAttrsEntity targetAttrsEntity = new TargetAttrsEntity();
            targetAttrsEntity.setDeviceName(deviceName);
            targetAttrsEntity.setFaceTime(faceTime);
            entity.setTargetAttrsEntity(targetAttrsEntity);

            entities.add(entity);
        } while (snapshotMsg.contains("image"));

        return entities;
    }

    /**
     * 构建返回值
     *
     * @param snapshotEntity 抓拍对象
     * @return json返回值
     */
    private String toResponseJson(SnapshotPushCallbackEntity snapshotEntity) {
        String responseStr;

        try {
            TargetAttrsEntity targetAttrsEntity = snapshotEntity.getTargetAttrsEntity();

            Map<String, Object> responseMap = new HashMap<>();
            responseMap.put("image", snapshotEntity.getImage());

            if (null != targetAttrsEntity) {
                String faceTime = targetAttrsEntity.getFaceTime();
                responseMap.put("faceTime", faceTime.substring(0, faceTime.indexOf(".")));
                responseMap.put("deviceName", targetAttrsEntity.getDeviceName());
            }

            JSONObject jsonObject = new JSONObject(responseMap);
            responseStr = jsonObject.toString();
        } catch (Exception e) {
            responseStr = null;
            logger.error("获取实时抓拍信息异常", e);
        }

        return responseStr;
    }

    /**
     *
     */
    class MessagePush implements Runnable {

        private String message;

        MessagePush(String message) {
            this.message = message;
        }

        @Override
        public void run() {
            try {
                if (!PushListener.getScriptSessions().isEmpty()) {
                    List<SnapshotPushCallbackEntity> snapshotEntitys = getSnapshotEntitysFromHikResponseJson(message);

                    for (SnapshotPushCallbackEntity snapshotEntity : snapshotEntitys) {
                        String responseStr = toResponseJson(snapshotEntity);
                        if (null != responseStr) {
                            sendMessage(responseStr);
                        }
                    }
                }
            } catch (Exception e) {
                logger.error("实时抓拍信息推送异常", e);
            }
        }
    }

//    public static void main(String[] args) {
//        String str = "[{\n" +
//                "\"errorCode\":\t0,\t\n" +
//                "\"image\":\t\"http://37.88.50.48:6120/pic?=d9=icf9z052ds040-836115m2ep=t5i3i*d1=*ipd8=*1s5i5dc=*7b01c625e-840a236-1b88e9-50i561*e8d56d1\",\n" +
//                "\"traceUuid\":\t\"1D2D56F1-6A51-8945-8C39-542D892EDB62\",\n" +
//                "\t\t\"traceIdx\":\t1,\n" +
//                "\t\t\"id\":\t\"\",\n" +
//                "\t\t\"targetAttrs\":\t\"{\\n\\t\\\"alarmStatus\\\":\\t0,\\n\\t\\\"bkgUrl\\\":\\t\\\"http://37.88.50.48:6120/pic?3dd172z6d-=s06510369e04b--622a1487e5c6ci0b1*=8d5i5s1*=idp5*=pd*m4i1t=3e215888-050id25*e2fci61=\\\",\\n\\t\\\"bodyUuid\\\":\\t\\\"\\\",\\n\\t\\\"deviceChannel\\\":\\t1,\\n\\t\\\"deviceIP\\\":\\t\\\"37.88.50.193\\\",\\n\\t\\\"deviceId\\\":\\t\\\"ZPJ15235045078680005818\\\",\\n\\t\\\"deviceName\\\":\\t\\\"寿光汽车站人脸抓拍1\\\",\\n\\t\\\"devicePort\\\":\\t8000,\\n\\t\\\"deviceType\\\":\\t11,\\n\\t\\\"endDate\\\":\\t\\\"\\\",\\n\\t\\\"faceTime\\\":\\t\\\"2018-04-14 13:42:18.000\\\",\\n\\t\\\"humanAddress\\\":\\t\\\"\\\",\\n\\t\\\"humanBirthDate\\\":\\t\\\"\\\",\\n\\t\\\"humanCrednum\\\":\\t\\\"\\\",\\n\\t\\\"humanMale\\\":\\t0,\\n\\t\\\"humanName\\\":\\t\\\"\\\",\\n\\t\\\"humanNation\\\":\\t0,\\n\\t\\\"issuingAuthority\\\":\\t\\\"\\\",\\n\\t\\\"laneNo\\\":\\t0,\\n\\t\\\"linkFaceBodyId\\\":\\t\\\"\\\",\\n\\t\\\"linkFaceVehicleId\\\":\\t\\\"\\\",\\n\\t\\\"matchResult\\\":\\t0,\\n\\t\\\"plateNo\\\":\\t\\\"\\\",\\n\\t\\\"rect\\\":\\t{\\n\\t\\t\\\"height\\\":\\t0.188000,\\n\\t\\t\\\"width\\\":\\t0.106000,\\n\\t\\t\\\"x\\\":\\t0.308000,\\n\\t\\t\\\"y\\\":\\t0.544000\\n\\t},\\n\\t\\\"startDate\\\":\\t\\\"\\\",\\n\\t\\\"termofvalidity\\\":\\t0,\\n\\t\\\"trafficUuid\\\":\\t\\\"\\\"\\n}\",\n" +
//                "\t\t\"faces\":\t[{\n" +
//                "\t\t\t\t\"faceId\":\t1,\n" +
//                "\t\t\t\t\"eyePosition\":\t{\n" +
//                "\t\t\t\t\t\"leftEye\":\t{\n" +
//                "\t\t\t\t\t\t\"x\":\t0.451511,\n" +
//                "\t\t\t\t\t\t\"y\":\t0.473036\n" +
//                "\t\t\t\t\t},\n" +
//                "\t\t\t\t\t\"rightEye\":\t{\n" +
//                "\t\t\t\t\t\t\"x\":\t0.586799,\n" +
//                "\t\t\t\t\t\t\"y\":\t0.519980\n" +
//                "\t\t\t\t\t}\n" +
//                "\t\t\t\t},\n" +
//                "\t\t\t\t\"faceMark\":\t{\n" +
//                "\t\t\t\t\t\"leftEye\":\t{\"x\":\t0.451511,\n" +
//                "\t\t\t\t\t\t\"y\":\t0.473036},\n" +
//                "\t\t\t\t\t\"rightEye\":\t{\n" +
//                "\t\t\t\t\t\t\"x\":\t0.586799,\n" +
//                "\t\t\t\t\t\t\"y\":\t0.519980\n" +
//                "\t\t\t\t\t},\n" +
//                "\t\t\t\t\t\"leftMouth\":\t{\n" +
//                "\t\t\t\t\t\t\"x\":\t0.422283,\n" +
//                "\t\t\t\t\t\t\"y\":\t0.624544\n" +
//                "\t\t\t\t\t},\n" +
//                "\t\t\t\t\t\"rightMouth\":\t{\n" +
//                "\t\t\t\t\t\t\"x\":\t0.521230,\n" +
//                "\t\t\t\t\t\t\"y\":\t0.653073\n" +
//                "\t\t\t\t\t},\n" +
//                "\t\t\t\t\t\"noseTip\":\t{\n" +
//                "\t\t\t\t\t\t\"x\":\t0.500044,\n" +
//                "\t\t\t\t\t\t\"y\":\t0.580441\n" +
//                "\t\t\t\t\t}\n" +
//                "\t\t\t\t},\n" +
//                "\t\t\t\t\"faceRect\":\t{\n" +
//                "\t\t\t\t\t\"x\":\t0.338235,\n" +
//                "\t\t\t\t\t\"y\":\t0.392157,\n" +
//                "\t\t\t\t\t\"width\":\t0.362745,\n" +
//                "\t\t\t\t\t\"height\":\t0.362745\n" +
//                "\t\t\t\t},\n" +
//                "\t\t\t\t\"recommendFaceRect\":\t{\n" +
//                "\t\t\t\t\t\"x\":\t0,\n" +
//                "\t\t\t\t\t\"y\":\t0.029412,\n" +
//                "\t\t\t\t\t\"width\":\t1,\n" +
//                "\t\t\t\t\t\"height\":\t0.970588\n" +
//                "\t\t\t\t},\n" +
//                "\t\t\t\t\"facePose\":\t{\n" +
//                "\t\t\t\t\t\"pitch\":\t-7.057061,\n" +
//                "\t\t\t\t\t\"roll\":\t-1,\n" +
//                "\t\t\t\t\t\"yaw\":\t-1.461770,\n" +
//                "\t\t\t\t\t\"confidence\":\t-1\n" +
//                "\t\t\t\t},\n" +
//                "\t\t\t\t\"age\":\t{\n" +
//                "\t\t\t\t\t\"range\":\t5,\n" +
//                "\t\t\t\t\t\"value\":\t42,\n" +
//                "\t\t\t\t\t\"ageGroup\":\t2\n" +
//                "\t\t\t\t},\n" +
//                "\t\t\t\t\"gender\":\t{\n" +
//                "\t\t\t\t\t\"confidence\":\t1,\n" +
//                "\t\t\t\t\t\"value\":\t2\n" +
//                "\t\t\t\t},\n" +
//                "\t\t\t\t\"glass\":\t{\n" +
//                "\t\t\t\t\t\"confidence\":\t0.797911,\n" +
//                "\t\t\t\t\t\"value\":\t2\n" +
//                "\t\t\t\t},\n" +
//                "\t\t\t\t\"smile\":\t{\n" +
//                "\t\t\t\t\t\"confidence\":\t0.983327,\n" +
//                "\t\t\t\t\t\"value\":\t1\n" +
//                "\t\t\t\t},\n" +
//                "\t\t\t\t\"ethnic\":\t{\n" +
//                "\t\t\t\t\t\"confidence\":\t0.962143,\n" +
//                "\t\t\t\t\t\"value\":\t1\n" +
//                "\t\t\t\t},\n" +
//                "\t\t\t\t\"faceIQA\":\t{\n" +
//                "\t\t\t\t\t\"detectQuality\":\t2,\n" +
//                "\t\t\t\t\t\"pointsQuality\":\t0.995340,\n" +
//                "\t\t\t\t\t\"eyeDistance\":\t29.212971,\n" +
//                "\t\t\t\t\t\"colorful\":\t1,\n" +
//                "\t\t\t\t\t\"grayScale\":\t0,\n" +
//                "\t\t\t\t\t\"grayMean\":\t-1,\n" +
//                "\t\t\t\t\t\"grayVar\":\t-1,\n" +
//                "\t\t\t\t\t\"clearity\":\t0,\n" +
//                "\t\t\t\t\t\"posePitch\":\t-7.057061,\n" +
//                "\t\t\t\t\t\"poseRoll\":\t-1,\n" +
//                "\t\t\t\t\t\"poseYaw\":\t-1.461770,\n" +
//                "\t\t\t\t\t\"poseConf\":\t-1,\n" +
//                "\t\t\t\t\t\"frontal\":\t-1,\n" +
//                "\t\t\t\t\t\"uncovered\":\t-1,\n" +
//                "\t\t\t\t\t\"totalQuality\":\t-1\n" +
//                "\t\t\t\t},\n" +
//                "\t\t\t\t\"modeldata\":\t\"SElLREZSMzAwAAAAAAAAAAA9Hw4NQOD/H+QRAR0yDgEuxg5PDtIu/BH78D4/DvAExCPf4+vR8A//IjATDe4S7jHQIATAEfPh4vQQ4/4R8SzsLwTAPh4e8B5sARER8BLCADHCHg2i4g4xUbBE8E/gMA7+RBMjFfDhHeMf0ULO/TA8AdH0Hf8BDiAw/14REj8wHuAU/g7PIBUR8C8/IwHxLgTx8OBDLBAP4iEy/jLP0C01AiARM/wDAvHRAOH+Mf7w8kE+Luz+8DEEswA8HV8gH08BAD7y7d8d0gDPESG/MQDQ/i0hAA0O8R7Svw4fDiMgUr8PBQEc4uUi4d0O/gO+8f7tM8Ee4vPg8N/94/U+sVFNATIO3+DS0k6y4Q0fAfDT/RDTMQDs7yAwDQJNATQA8O8QDwFEEeBE8CDx//H/L0QsQw8fATAf6x8f4SMOFuDVAQDw8SBP7wMQEv7w8B4yD14d/x/z0vD14v8N4x91LwEMUtEXQR4A4CAdTyXzL8Eg8x3d4lIS4g09Qe3yMv8yP9EABE8R/jPyE+3N2zL8ASD/r98G0T8iAu7fPg0PIyHlIRAQHwLwACIt3V/cMdDj72//bxANEeEf7eECPfLSwRAhIhwPAe3tTy4h7/IP8OwuH/6+YeIP8gEeDx3esU/0Ai4RIzAGIB835P4e8fAjDBDCC+H+Ae8vLhITDi4OPf8hOAAQ2w0A\",\n" +
//                "\t\t\t\t\"identify\":\t[{\n" +
//                "\t\t\t\t\t\t\"relationId\":\t1,\n" +
//                "\t\t\t\t\t\t\"maxsimilarity\":\tnan,\n" +
//                "\t\t\t\t\t\t\"candidate\":\t[{\n" +
//                "\t\t\t\t\t\t\t\t\"alarmId\":\t1,\n" +
//                "\t\t\t\t\t\t\t\t\"blacklist_id\":\t\"1\",\n" +
//                "\t\t\t\t\t\t\t\t\"human_data\":\t[{\n" +
//                "\t\t\t\t\t\t\t\t\t\t\"face_id\":\t\"4b89870ee5264f3e82febe53355ebcd9\",\n" +
//                "\t\t\t\t\t\t\t\t\t\t\"bkg_picurl\":\t\"\",\n" +
//                "\t\t\t\t\t\t\t\t\t\t\"face_picurl\":\t\"http://37.88.50.48:6120/pic?2dd134i6d-e*06510289e02b--622a1487e5c6ci0b2*=ids1*=idp2*=tdpe*m5i1-=291d241z0fcs=4i58=\",\n" +
//                "\t\t\t\t\t\t\t\t\t\t\"face_rect\":\t{\n" +
//                "\t\t\t\t\t\t\t\t\t\t\t\"x\":\t0,\n" +
//                "\t\t\t\t\t\t\t\t\t\t\t\"y\":\t0,\n" +
//                "\t\t\t\t\t\t\t\t\t\t\t\"height\":\t0,\n" +
//                "\t\t\t\t\t\t\t\t\t\t\t\"width\":\t0\n" +
//                "\t\t\t\t\t\t\t\t\t\t},\n" +
//                "\t\t\t\t\t\t\t\t\t\t\"similarity\":\tnan\n" +
//                "\t\t\t\t\t\t\t\t\t}],\n" +
//                "\t\t\t\t\t\t\t\t\"human_id\":\t\"13cac233f6eb44d596c9176b5ea30e0d\",\n" +
//                "\t\t\t\t\t\t\t\t\"reserve_field\":\t\"{}\",\n" +
//                "\t\t\t\t\t\t\t\t\"similarity\":\tnan\n" +
//                "\t\t\t\t\t\t\t}]\n" +
//                "\t\t\t\t\t}]\n" +
//                "\t\t\t}]\n" +
//                "\t}]";
//
//        List<SnapshotPushCallbackEntity> snapshotEntitysFromHikResponseJson = getSnapshotEntitysFromHikResponseJson(str);
//        System.out.println(snapshotEntitysFromHikResponseJson);
//    }
}


