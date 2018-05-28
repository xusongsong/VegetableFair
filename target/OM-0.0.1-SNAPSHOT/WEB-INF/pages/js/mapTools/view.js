/** 视角功能 */
		function view(viewType){
		var navagation = map.CreateRoam();
		var resp = map.CreateResponserOptions("UICompassResponser");
        resp.AddConfig("Visible", "true");/////设置罗盘响应器显隐状态。特别注意，罗盘响应器因为内部的关系，已经默认创建，外部需要通过更新配置接口设置显隐状态，而不是通过添加的方式
        var resCompass = map.CreateResponser("UICompassResponser", resp); /////创建罗盘响应器，必须为UICompassResponser
        resCompass.UpdateResponserOptions(resp); /////更新罗盘响应器配置，这里必须这么处理
		///设置视图旋转模式
        ///参数1：是否绕视点旋转：true，按视点；false，按目标点
        ///参数2：目的俯仰角设置（绝对值）；范围-89到0，单位角度。当为0时，为默认取当前俯仰角，不进行垂直转动
        ///参数3：旋转角设置（相对值）：范围-180到180，单位角度，绕视点时，向左为负，向右为正；绕目标点时，向右为负，向左为正。为0时不进行水平转动
        ///参数4：转动时间，单位毫秒，范围1-无穷大。不可取0
		switch (viewType) {
			case 0: //正北
				 navagation.SetViewRotateRoamMode(false, 0, 0, 1500); ///绕目标点，进行旋转
				break;
			case 1: //东北
				navagation.SetViewRotateRoamMode(false, 0, 45, 1500); ///绕目标点，进行旋转
				break;
			case 2: //正东
				navagation.SetViewRotateRoamMode(false, 0, 90, 1500); ///绕目标点，进行旋转
				break;
			case 3: //东南
				navagation.SetViewRotateRoamMode(false, 0, 135, 1500); ///绕目标点，进行旋转
				break;
			case 4: //正南
				navagation.SetViewRotateRoamMode(false, 0, -180, 1500); ///绕目标点，进行旋转
				break;
			case 5: //西南
				navagation.SetViewRotateRoamMode(false, 0, -135, 1500); ///绕目标点，进行旋转
				break;	
			case 6: //正西
				navagation.SetViewRotateRoamMode(false, 0, -90, 1500); ///绕目标点，进行旋转
				break;
			case 7: //西北
				navagation.SetViewRotateRoamMode(false, 0, -45, 1500); ///绕目标点，进行旋转
				break;	
			default:
				break;
		}
	}