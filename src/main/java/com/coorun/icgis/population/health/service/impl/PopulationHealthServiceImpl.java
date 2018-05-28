package com.coorun.icgis.population.health.service.impl;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;
import com.coorun.icgis.jites.common.util.JSONUtils;
import com.coorun.icgis.jites.geodo.api.bean.HealthDetailInfo;
import com.coorun.icgis.jites.geodo.api.bean.NameValuedArrayInfo;
import com.coorun.icgis.jites.geodo.api.bean.NameValuedSingleInfo;
import com.coorun.icgis.jites.geodo.api.response.HealthStatisticsInfoResponse;
import com.coorun.icgis.population.health.model.LineChatResponse;
import com.coorun.icgis.population.health.model.NameDataArray;
import com.coorun.icgis.population.health.service.IPopulationHealthService;

@Service
public class PopulationHealthServiceImpl implements IPopulationHealthService {

	@Override
	public HealthStatisticsInfoResponse getPopulationHealthStatistics(String token, String queryFlag) throws Exception {
		return fillNomeaningData();
	}

	@Override
	public HealthDetailInfo getPopulationStatisticsPerson(String token, String condition) throws Exception {
		return fillNOData(condition);
	}
	
	// 填充健康统计假数据
	@SuppressWarnings("unchecked")
	private HealthStatisticsInfoResponse fillNomeaningData() {
		String allData = "[{\"value\":350,\"name\":\"0-50\"},{\"value\":29,\"name\":\"51-60\"},{\"value\":49,\"name\":\"61-70\"},{\"value\":65,\"name\":\"71-85\"},{\"value\":2,\"name\":\"\u5927\u4e8e86\"}]";
		String yearData = "[{\"value\":[[2017,334],[2018,16]],\"name\":\"0-50\"},{\"value\":[[2017,29]],\"name\":\"51-60\"},{\"value\":[[2017,49]],\"name\":\"61-70\"},{\"value\":[[2017,57],[2018,8]],\"name\":\"71-85\"},{\"value\":[[2017,2]],\"name\":\"\u5927\u4e8e86\"}]";
		List<NameValuedSingleInfo> singleInfo = (List<NameValuedSingleInfo>) JSONUtils.stringToCollectionType(allData, List.class, NameValuedSingleInfo.class);
		List<NameValuedArrayInfo> arrayInfo = (List<NameValuedArrayInfo>) JSONUtils.stringToCollectionType(yearData, List.class, NameValuedArrayInfo.class);
		
		// 数据重组
		LineChatResponse line = new LineChatResponse();
		List<String> years = new ArrayList<>();
		years.add("2017");
		years.add("2018");
		line.setYears(years);
		List<NameDataArray> dataA = new ArrayList<>();
		for (NameValuedArrayInfo nai : arrayInfo) {
			NameDataArray da = new NameDataArray();
			da.setName(nai.getName());
			List<Integer[]> value = nai.getValue();
			// 初始化数据
			List<Integer> datas = new ArrayList<>();
			datas.add(value.get(0)[1]);
			if (value.size() > 1 ) {
				datas.add(value.get(1)[1]);
			} else {
				datas.add(0);
			}
			da.setDatas(datas);
			dataA.add(da);
		}
		line.setDataArrays(dataA);
		HealthStatisticsInfoResponse res = new HealthStatisticsInfoResponse();
		res.setNameValuedSingleInfos(singleInfo);
		res.setLineChatResponse(line);
//		res.setNameValuedArrayInfos(arrayInfo);
		return res;
	}
	
	// 填充人员健康假数据
	private HealthDetailInfo fillNOData(String condition) {
		String str = "{\"status\":200,\"rlp\":\"81\",\"rhp\":\"127\",\"rhr\":\"79\",\"rbs\":\"\",\"ahr\":[[\"2017-11-14\",\"78\"],[\"2017-11-14\",\"71\"],[\"2017-11-20\",\"76\"],[\"2017-11-20\",\"77\"],[\"2017-11-21\",\"75\"],[\"2017-11-21\",\"73\"],[\"2017-11-21\",\"79\"]],\"ahp\":[[\"2017-11-14\",\"142\"],[\"2017-11-14\",\"133\"],[\"2017-11-20\",\"133\"],[\"2017-11-20\",\"137\"],[\"2017-11-21\",\"121\"],[\"2017-11-21\",\"114\"],[\"2017-11-21\",\"127\"]],\"alp\":[[\"2017-11-14\",\"93\"],[\"2017-11-14\",\"82\"],[\"2017-11-20\",\"84\"],[\"2017-11-20\",\"82\"],[\"2017-11-21\",\"78\"],[\"2017-11-21\",\"72\"],[\"2017-11-21\",\"81\"]],\"abs\":[]}";
		HealthDetailInfo healthDetailInfo = (HealthDetailInfo) JSONUtils.StringToObject(str, HealthDetailInfo.class);
		healthDetailInfo.setSex("男");
		healthDetailInfo.setName(condition);
		healthDetailInfo.setImgurl("http://106.14.24.63:8081/scmp/resources/image/pgAdmin31513680113321.jpg");
		healthDetailInfo.setAge("36");
		healthDetailInfo.setTel("135443334343");
		return healthDetailInfo;
	}
}
