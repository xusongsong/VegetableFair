package com.coorun.faceidentifymanage.mq.alarmessage;

import com.alibaba.fastjson.JSONObject;
import com.coorun.faceidentifymanage.entity.AlarmHumanBo;
import com.coorun.faceidentifymanage.entity.AlarmPushCallbackEntity;
import com.coorun.faceidentifymanage.mq.PushListener;
import org.apache.log4j.Logger;
import org.directwebremoting.Browser;
import org.directwebremoting.ScriptBuffer;
import org.directwebremoting.ScriptSession;
import org.directwebremoting.ScriptSessionFilter;
import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttMessage;

import java.io.UnsupportedEncodingException;
import java.util.*;

/**  
 * 发布消息的回调类  
 *   
 * 必须实现MqttCallback的接口并实现对应的相关接口方法  
 *      ◦CallBack 类将实现 MqttCallBack。每个客户机标识都需要一个回调实例。在此示例中，构造函数传递客户机标识以另存为实例数据。在回调中，将它用来标识已经启动了该回调的哪个实例。  
 *  ◦必须在回调类中实现三个方法：  
 *   
 *  public void messageArrived(MqttTopic topic, MqttMessage message)  
 *  接收已经预订的发布。  
 *   
 *  public void connectionLost(Throwable cause)  
 *  在断开连接时调用。  
 *   
 *  public void deliveryComplete(MqttDeliveryToken token))  
 *      接收到已经发布的 QoS 1 或 QoS 2 消息的传递令牌时调用。  
 *  ◦由 MqttClient.connect 激活此回调。  
 *   
 */    
public class AlarmPushCallback implements MqttCallback {

	private Logger logger = Logger.getLogger(AlarmPushCallback.class);

    public void connectionLost(Throwable cause) {
        // 连接丢失后，一般在这里面进行重连  
		System.out.println("Break the connection " + new Date());
        System.out.println("连接断开，可以做重连");  
    }  
  
	public void messageArrived(String topic, MqttMessage message) {
		logger.debug(" alarm 获取抓拍数据: topic: " + topic + "  message:" + new String(message.getPayload()));
//		while (true) {
//			try {
//				Thread.sleep(10000);
//
//				if (!PushListener.getScriptSessions().isEmpty()) {
//
//					// 创建测试数据
//					AlarmPushCallbackEntity entity = getEntity();
//
//					AlarmPushCallbackEntity alarmPushCallbackEntity = getAlarmPushCallbackFromHikResponseJson(JSONObject.toJSONString(entity));
//
//					if (null != alarmPushCallbackEntity) {
//						String responseStr = toResponseJSON(alarmPushCallbackEntity);
//						System.err.println("预警推送信息: " + responseStr);
//						sendMessage(responseStr);
//					}
//				}
//			} catch (Exception e) {
//				e.printStackTrace();
//			}
//		}

		byte[] payload = message.getPayload();

		String msg = null;
		try {
			msg = new String(payload, "utf-8");
		} catch (UnsupportedEncodingException e) {
			logger.error("编码错误", e);
		}

		try {
			AlarmPushCallbackEntity alarmPushCallbackEntity = JSONObject.parseObject(msg, AlarmPushCallbackEntity.class);
			sendMessage(toResponseJSON(alarmPushCallbackEntity));
		} catch (Exception e) {
			logger.error("解析预警数据异常", e);
		}
	}

	public void deliveryComplete(IMqttDeliveryToken token) {
		try {
			System.out.println(new Date() + "Server:2:" + "deliveryComplete"+ token.isComplete() + token.getMessageId());
		} catch (Exception e) {
			e.printStackTrace();
		}  
	}

	public void sendMessage(final String message) {
		Browser.withAllSessionsFiltered(new ScriptSessionFilter() {
				public boolean match(ScriptSession session){
					return true;
				}
			},

			new Runnable(){
				private ScriptBuffer script = new ScriptBuffer();
				public void run(){
					script.appendCall("showAlarmMessage", message);

					Collection<ScriptSession> scriptSessions = PushListener.getScriptSessions();
					for (ScriptSession scriptSession : scriptSessions) {
						logger.debug("推送预警消息:  " + scriptSession + "   script:" + script);
						scriptSession.addScript(script);
					}
				}
			});
	}

	private AlarmPushCallbackEntity getAlarmPushCallbackFromHikResponseJson(String jsonstr) {
		AlarmPushCallbackEntity alarmPushCallbackEntity = JSONObject.parseObject(jsonstr, AlarmPushCallbackEntity.class);

//		List<AlarmHumanBo> humans = alarmPushCallbackEntity.getHumans();
//		if (null != humans && humans.size() > 1) {
//
//			int similar = 0;
//			Iterator<AlarmHumanBo> iterator = humans.iterator();
//				while (iterator.hasNext()) {
//					AlarmHumanBo alarmHumanBo = iterator.next();
//					int similarity = Integer.parseInt(alarmHumanBo.getSimilarity());
//					if (similarity < similar) {
//						iterator.remove();
//					} else {
//						similar = Integer.parseInt(alarmHumanBo.getSimilarity());
//					}
//				}
//		}
		return alarmPushCallbackEntity;
	}

	/**
	 * 返回预警信息
	 *
	 * @param alarmPushCallbackEntity 警报信息实体类
	 * @return 警报json信息
	 */
	private String toResponseJSON(AlarmPushCallbackEntity alarmPushCallbackEntity) {
		if (null == alarmPushCallbackEntity) {
			return null;
		}

		Map<String, Object> responseMap = new HashMap<>();
		String responseStr;

		try {
			responseMap.put("alarmId", alarmPushCallbackEntity.getAlarmId());
			responseMap.put("indexCode", alarmPushCallbackEntity.getIndexCode());
			responseMap.put("cameraName", alarmPushCallbackEntity.getCameraName());
			responseMap.put("age", alarmPushCallbackEntity.getAge());
			responseMap.put("sex", getSexTye(alarmPushCallbackEntity.getSex()));
			responseMap.put("glass", getGlassType(alarmPushCallbackEntity.getGlass()));
			responseMap.put("smile", getSmileType(alarmPushCallbackEntity.getSmile()));
			responseMap.put("ethnic", getEthnicType(alarmPushCallbackEntity.getEthnic()));
			responseMap.put("bkgPicUrl", alarmPushCallbackEntity.getBkgPicUrl());
			responseMap.put("facePicUrl", alarmPushCallbackEntity.getFacePicUrl());
			responseMap.put("similarity", alarmPushCallbackEntity.getSimilarity());
			responseMap.put("status", getStatusType(alarmPushCallbackEntity.getStatus()));
			responseMap.put("msg", alarmPushCallbackEntity.getMsg());
			responseMap.put("alarmTime", alarmPushCallbackEntity.getAlarmTime());
			responseMap.put("controlId", alarmPushCallbackEntity.getControlId());

			// 存储返回到客户端的AlarmHumanBo的json数组
			List<Map<String, Object>> humans = new ArrayList<>();
			responseMap.put("humans", humans);

			// 对推送过来的AlarmHumanBo进行属性信息处理
			List<AlarmHumanBo> humanEntitys = alarmPushCallbackEntity.getHumans();
			Map<String, Object> humanMap;
			for (AlarmHumanBo alarmHumanBo : humanEntitys) {
				humanMap = new HashMap<>();

				humanMap.put("humanId", alarmHumanBo.getHumanId());
				humanMap.put("listLibId", alarmHumanBo.getListLibId());
				humanMap.put("listLibName", alarmHumanBo.getListLibName());
				humanMap.put("humanName", alarmHumanBo.getHumanName());
				humanMap.put("sex", getSexTye(alarmHumanBo.getSex()));
				humanMap.put("birthday", alarmHumanBo.getBirthday());
				humanMap.put("provinceName", alarmHumanBo.getProvinceName());
				humanMap.put("cityName", alarmHumanBo.getCityName());
				humanMap.put("address", alarmHumanBo.getAddress());
				humanMap.put("credentialsType", getCredentialsType(alarmHumanBo.getCredentialsType()));
				humanMap.put("credentialsNum", alarmHumanBo.getCredentialsNum());
				humanMap.put("facePicUrl", alarmHumanBo.getFacePicUrl());
				humanMap.put("similarity", alarmHumanBo.getSimilarity());
				humanMap.put("smile", getSmileType(alarmHumanBo.getSmile()));
				humanMap.put("ethnic", getEthnicType(alarmHumanBo.getEthnic()));

				humans.add(humanMap);
			}

			JSONObject jsonObject = new JSONObject(responseMap);
			responseStr = jsonObject.toString();
		} catch (Exception e) {
			responseStr = null;
			logger.error("获取预警信息异常", e);
		}
		return responseStr;
	}

	/**
	 * 获取年龄段信息
	 *
	 * @param type 年龄段
	 * @return 年龄段
	 */
	private String getAgeRange(int type) {
		switch (type) {
			case 0:
				return "未知";
			case 1:
				return "少年";
			case 2:
				return "青年";
			case 3:
				return "中年";
			case 4:
				return "老年";
			default:
				throw new IllegalArgumentException("未知年龄端信息: " + type);
		}
	}

	/**
	 * 获取证件类型
	 *
	 * @param type 类型
	 * @return 类型
	 */
	private String getCredentialsType(int type) {
		switch (type) {
			case -1:
				return "无限制";
			case 0:
				return "未知";
			case 1:
				return "身份证";
			case 2:
				return "警官证";
				default:
					throw new IllegalArgumentException("传入证件类型参数异常");
		}
	}

	/**
	 * 获取性别类型
	 * @param type 性别类型
	 * @return 类型
	 */
	private String getSexTye(int type) {
		switch (type) {
			case 1:
				return "男";
			case 2:
				return "女";
			case 0:
				return "未知";
			default:
				throw new IllegalArgumentException("传入性别类型参数异常");
		}
	}

	/**
	 * 是否微笑
	 *
	 * @param type 微笑类型
	 * @return 微笑类型
	 */
	private String getSmileType(int type) {
		switch (type) {
			case 1:
				return "不微笑";
			case 2:
				return "微笑";
			case 0:
				return "未知";
			default:
				throw new IllegalArgumentException("是否微笑传入参数异常");
		}
	}

	/**
	 * 获取带眼镜状态
	 * @param type 带眼镜状态
	 * @return 带眼镜状态
	 */
	private String getGlassType(int type) {
		switch (type) {
			case 0:
				return "未知";
			case 1:
				return "否";
			case 2:
				return "是";
			default:
				throw new IllegalArgumentException("未知带眼镜状态:" + type);
		}
	}

	/**
	 * 获取名族类型
	 * @param type 名族类型
	 * @return 名族类型
	 */
	private String getEthnicType(int type) {
		switch (type) {
			case 0:
				return "未知";
			case 1:
				return "否";
			case 2:
				return "是";
			default:
				throw new IllegalArgumentException("未知是否少数名族类型: " + type);
		}
	}

	/**
	 * 获取告警状态
	 *
	 * @param type 告警状态
	 * @return 告警状态
	 */
	private String getStatusType(int type) {
		switch (type) {
			case 0:
				return "新建";
			case 1:
				return "确认";
			case 2:
				return "忽略";
			default:
				throw new IllegalArgumentException("无法获取告警状态类型: " + type);
		}
	}

	/**
	 * 制造测试数据
	 *
	 * @return AlarmPushCallbackEntity
	 */
	private AlarmPushCallbackEntity getEntity() {

		AlarmHumanBo alarmHumanBo = new AlarmHumanBo();
		alarmHumanBo.setListLibId(1);
		alarmHumanBo.setListLibName("一");
		alarmHumanBo.setHumanId("97823");
		alarmHumanBo.setHumanName("张三");
		alarmHumanBo.setSex(1);
		alarmHumanBo.setBirthday("2012-2-2 2-2-2");
		alarmHumanBo.setProvinceName("山东省");
		alarmHumanBo.setCityName("潍坊市");
		alarmHumanBo.setAddress("寿光");
		alarmHumanBo.setCredentialsType(1);
		alarmHumanBo.setCredentialsNum("983456234323982334");
		alarmHumanBo.setFacePicUrl("http://37.88.50.48:6501/pic?1dd101i6d-e*96510639e08b--622a1487e5c6ci0b8*=*d3d3i*s1d=i0p4t=pe*m5i10=8-2101d240z0fcs=1i54=");
		alarmHumanBo.setSimilarity("20");
		alarmHumanBo.setSmile(2);
		alarmHumanBo.setEthnic(1);

		List<AlarmHumanBo> boList = new ArrayList<>();
		boList.add(alarmHumanBo);

		AlarmPushCallbackEntity alarmPushCallbackEntity = new AlarmPushCallbackEntity();
		alarmPushCallbackEntity.setAlarmId("123");
		alarmPushCallbackEntity.setIndexCode("121212");
		alarmPushCallbackEntity.setCameraName("gasdfa");
		alarmPushCallbackEntity.setAge(21);
		alarmPushCallbackEntity.setSex(1);
		alarmPushCallbackEntity.setGlass(1);
		alarmPushCallbackEntity.setSmile(1);
		alarmPushCallbackEntity.setEthnic(1);
		alarmPushCallbackEntity.setBkgPicUrl("http://37.88.50.48:6120/pic?=d57icf3e*52di060-898512e3=t1i1m*dp=*4pdi=*1s8i3i3dc=*7b01c625e-840a206-1b10e9-40z561s=6d16d0");
		alarmPushCallbackEntity.setFacePicUrl("http://37.88.50.48:6501/pic?1dd101i6d-e*96510639e08b--622a1487e5c6ci0b8*=*d3d3i*s1d=i0p4t=pe*m5i10=8-2101d240z0fcs=1i54=");
		alarmPushCallbackEntity.setStatus(1);
		alarmPushCallbackEntity.setMsg("抓拍可疑人物");
		alarmPushCallbackEntity.setSimilarity(20);
		alarmPushCallbackEntity.setAlarmTime("2018-4-15 1:2;2");
		alarmPushCallbackEntity.setControlId("5634");
		alarmPushCallbackEntity.setHumans(boList);
		return alarmPushCallbackEntity;
	}
}