var MapSearcher = OM.Class.extend({
	"type" : "mapSearcher",
	/* 获取城市数据列表 */
	"getCityList" : function(jsonPath, condition) {
		var cityList = new Array();
		var list;
		$.ajaxSettings.async = false;// 将异步方法改为同步方法
		$.getJSON(jsonPath, function(data) {
			if (condition == 'CITY') {// 获取城市名列表AREANAME
				for (var i = 0; i < data.length; i++) {
					var code = data[i].AREACODE;
					var numLast = code.length - 1;// 末位数
					var numSecond = code.length - 2;// 倒数第二位数
					if (code.charAt(numLast) == ("0")
							&& code.charAt(numSecond) == ("0")) {// 城市末位2个数字都为0
						list = data[i].AREANAME;
						cityList.push(list);
					}
				}
			}
			if (condition == 'LETTER') {// 获取城市开头字母ENAME
				for (var i = 0; i < data.length; i++) {
					var code = data[i].AREACODE;
					var numLast = code.length - 1;// 末位数
					var numSecond = code.length - 2;// 倒数第二位数
					if (code.charAt(numLast) == ("0")
							&& code.charAt(numSecond) == ("0")) {// 城市末位2个数字都为0
						list = data[i].ENAME;
						cityList.push(list);
					}
				}
			}

		});
		return cityList;
	},
	/* 通过城市编码获取该城市的下属区域列表 */
	"getBelongCityList" : function(jsonPath, condition, areaCode) {
		var cityList = new Array();
		var list;
		$.ajaxSettings.async = false;// 将异步方法改为同步方法
		$.getJSON(jsonPath, function(data) {
			if (condition == 'BELONGCITY') {// 获取城市下属区域
				var areaCode1 = areaCode[0];// 父级城市areacode第一位
				var areaCode2 = areaCode[1];// 父级城市areacode第二位
				var areaCode3 = areaCode[2];// 父级城市areacode第三位
				var areaCode4 = areaCode[3];// 父级城市areacode第四位
				var num1;// json-areaCode第一位
				var num2;// json-areaCode第二位
				var num3;// json-areaCode第三位
				var num4;// json-areaCode第四位
				for (var i = 0; i < data.length; i++) {
					var code = data[i].AREACODE;
					num1 = code[0];
					num2 = code[1];
					num3 = code[2];
					num4 = code[3];
					if (num1 == areaCode1 && num2 == areaCode2
							&& num3 == areaCode3 && num4 == areaCode4) {
						if (areaCode != code) {
							list = data[i].AREANAME;
							cityList.push(list);
						}
					}
				}
			}
		});
		return cityList;
	},
	/* 通过城市名获取城市编码 */
	"getCityCodeByName" : function(jsonPath, city) {
		var list;
		$.ajaxSettings.async = false;// 将异步方法改为同步方法
		$.getJSON(jsonPath, function(data) {
			for (var i = 0; i < data.length; i++) {
				if (data[i].AREANAME == city) {
					list = data[i].AREACODE;
				}
			}
		});
		return list;
	},
	/* 通过城市名获取城市首字母 */
	"getCityEnameByName" : function(jsonPath, city) {
		var list;
		$.ajaxSettings.async = false;// 将异步方法改为同步方法
		$.getJSON(jsonPath, function(data) {
			for (var i = 0; i < data.length; i++) {
				if (data[i].AREANAME == city) {
					list = data[i].ENAME;
				}
			}
		});
		return list;
	},
	/* 通过城市首字母获取主城市名列表 */
	"getCityByEname" : function(jsonPath, Ename) {
		var cityList = new Array();
		var list;
		$.ajaxSettings.async = false;// 将异步方法改为同步方法
		$.getJSON(jsonPath, function(data) {
			for (var i = 0; i < data.length; i++) {
				if (data[i].ENAME == Ename) {// 获取首字母相同的主城市名的集合
					var code = data[i].AREACODE;
					var numLast = code.length - 1;// 末位数
					var numSecond = code.length - 2;// 倒数第二位数
					if (code.charAt(numLast) == ("0")
							&& code.charAt(numSecond) == ("0")) {// 城市末位2个数字都为0
						list = data[i].AREANAME;
						cityList.push(list);
					}
				}
			}
		});
		return cityList;
	}

});

// 注册类名
OM.Class.className(MapSearcher, "MapSearcher");
// 空间命名
OM["MapSearcher"] = MapSearcher;