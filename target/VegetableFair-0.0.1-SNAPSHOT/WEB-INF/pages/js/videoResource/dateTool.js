$(document).ready(function() {	

					//初始化时间表单
				 	var theDate = new Date();
				 		var endTime = theDate.getYear();
				 		var startTime = theDate.getYear();		
				 		$('#StartTime').val(startTime);
				 		$('#EndTime').val(endTime);
					$('#StartTime').on('click', function() {
						var opt = {
							showtime : true,
							maxDate : '#F{$dp.$D(\'EndTime\')}',
							dateFmt : 'yyyy-MM-dd HH:mm:ss'
						};
						WdatePicker.call(this, opt);
					});

					$('#EndTime').on('click', function() {
						var opt = {
							showtime : true,
							minDate : '#F{$dp.$D(\'StartTime\')}',
							dateFmt : 'yyyy-MM-dd HH:mm:ss'
						};
						WdatePicker.call(this, opt);
					});
				
					
})