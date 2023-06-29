<script setup lang='ts'>
import { ref, nextTick } from 'vue'
import { getJsp, jspLogin } from "@/api/jsp";

const data = {
  j_username: 'chutian',
  j_password: 123456
}
// jspLogin(data).then(res => {
//   console.log(res);
// })
const jsp = ref();
const jspRef = ref();
getJsp().then((res: any) => {
	// res = res.replace("url:'/ct-admin'", "url:'/demo/ct-admin'")
	console.log(res.indexOf("url:'/ct-admin'"));
	
  // var reg = /<script>([\s\S]+?)<\/script>/g;
  console.log(res.slice(0, res.lastIndexOf('<script type="text/javascript">')));
  let aaa = res.slice(0, res.lastIndexOf('<script type="text/javascript">'));
	console.log(aaa.indexOf("/ct-admin/register/province/complete/page"));

	jsp.value = aaa.replace("/ct-admin/register/province/complete/page", "/demo/ct-admin/register/province/complete/page")
  const script = document.createElement('script');
  script.innerHTML = `
  $('#comm_btn').click(function(){
	var rows = $('#dg').datagrid('getSelections');
	if(rows.length > 0){
		$.messager.confirm('提示','选中'+rows.length+'条记录,确定同步吗?',function(r){  
		    if (r){  
		    	var code=0;
		    	var ids = [];
				$.each(rows,function(n,obj){
					ids.push(obj.id);
					if(obj.stratus==1){
						code=1;
					}
				});
				/* if(code==1){
					alert('包含已归档数据！');
				} */
				//else{
				var idStr = ids.join(',');
				showLoadingMask();
				 $.post('/ct-admin/register/province/synchro',{ids:idStr},function(res){
					hideLoadingMask();
					if(res){
						alert('同步成功！');
						$('#dg').datagrid('clearSelections');
						$('#dg').datagrid('reload');
					}
				}); 
				//}
		    }
		}); 
	} 
});


function gkdwGroup(row, value, index) {
	if (row.regGroup && row.regGroup.gkdwGroups && row.regGroup.gkdwGroups.length > 0) {
		return row.regGroup.gkdwGroups[0].code + "-" + row.regGroup.gkdwGroups[0].name;
	}
	return '';
}

function rowStyler(index,row){
	if (row.isDelete == 1 ||row.registerstatus == 'NO_REGISTER' ){
        return 'color:red;font-weight:bold;';
    }
	if (row.isVerify == 'ZERO'){
        return 'color:orange;font-weight:bold;';
    }
	if(row.registerstatus == 'LOGOUT'){
		return 'color:#0000ff;font-weight:bold;';
	}
	//毕业
	if(row.registerstatus == 'NOAVAIL'){
		return 'color:#A42D2D;font-weight:bold;font-style:italic;';
	}	
	//停靠
	if(row.registerstatus == 'STOP'){
		return 'color:darkorange;font-weight:bold;';
	}	
	//归档欠费
	if(row.registerstatus == 'COMPLETE_NO_MONEY'){
		return 'color:#9933FF;font-weight:bold;';
	}
	//stop欠费
	if(row.registerstatus == 'STOP_NO_MONEY'){
		return 'color:#ff0000;font-weight:bold;';
	}
	
	//非正常注册
	if (row.nonNormal=='1'){
        return 'color:#00AA00;font-weight:bold;';
    }
}
function gettime(value,row,index){
	if(value!=null)
	return getFormatDate(new Date(value), "yyyy-MM-dd hh:mm:ss");
	else
	return null;
	
}
function getFormatDate(date, pattern) {
    if (date == undefined) {
        date = new Date();
    }
    if (pattern == undefined) {
        pattern = "yyyy-MM-dd hh:mm:ss";
    }
    return date.format(pattern);
}
$(function(){
	 $("#specialtyPlanCode").autocombo({
	    	url:'/demo/ct-admin/specialtyplan/list/combo/zsCatalogId?applyType=3&zsCatalogId=1',
	    	placeholder:'选择专业'
	    });
	$("#togetherSpecialtyPlanId").autocombo({
		url:'/demo/ct-admin/specialtyplan/list/combo/zsCatalogId?applyType=3&zsCatalogId=1',
		placeholder:'选择套读专业'
	});
	    $("#schoolCode").autocombo({
	    	url:'/demo/ct-admin/school/list/combo/SCHOOL',
	    	placeholder:'选择主考院校'
	    });
	    $("#helpLearningCode").autocombo({
	    	url:'/demo/ct-admin/school/listHlp/combo',
	    	placeholder:'选择助学机构或学习服务中心'
	    });
	    
	    $("#groupCode").autocombo({
	    	url:'/demo/ct-admin/school/listDljg/combo',
	    	placeholder:'选择合作伙伴'
	    });
	    
		
		    $("#groupPointId").autocombo({
		    	url:'/demo/ct-admin/school/listDljgPoint/combo/16198',
		    	placeholder:'选择分合作伙伴'
		    });
	    
});
$('#cc').combobox({   
	     url:'/demo/ct-admin/register/linkedu/specialtyplan',   
	     valueField:'id',   
	     textField:'text'  
	  });  


function viewtext(value,row,index){
	if (value==1) {
		return "已同步";
	} else {
		return "未同步";
	}
} 

function chisCheck(value,row,index){
	if (row.student.chisCheck==1) {
		return "是";
	} else {
		return "否";
	}
} 

$('#search-form').submit(function(event){
	event.preventDefault(); 
	$('#dg').datagrid('clearSelections');
	var param = $('#search-form').serializeJson();	
	$('#dg').datagrid('load',param);	
});

//退学注销
$('#logout-btn').click(function(){
	var rows = $('#dg').datagrid('getSelections');
	if(rows.length > 0){
		var ids = [];
		let flag = true;
		$.each(rows,function(n,obj){
			if (obj.registerstatus != 3) {
				alert("只有在籍状态才可退学注销！");
				flag = false;
				return false;
			}
			ids.push(obj.id);
		});
		if (!flag) {
			return false;
		}
		$.messager.confirm('提示','选中'+rows.length+'条记录,确定退学注销吗?',function(r){
		    if (r){  
				var idStr = ids.join(',');
				showLoadingMask();
				$.post('/ct-admin/register/province/logout',{ids:idStr},function(res){
					hideLoadingMask();
					if(res){
						alert('注销成功！');
						$('#dg').datagrid('clearSelections');
						$('#dg').datagrid('reload');
					}
				});
		    }
		});
	} else{
    	 showMsg('请选择一条记录','warning');
    }
});
//恢复注销
$('#resume-btn').click(function(event){
	event.preventDefault(); 
	var rows = $('#dg').datagrid('getSelections');
	if(rows.length > 0){
		$.messager.confirm('提示','选中'+rows.length+'条记录,确定要恢复吗?',function(r){  
		    if (r){  
				var ids = [];
				$.each(rows,function(n,obj){
					ids.push(obj.id);
				});
				var idStr = ids.join(',');
				showLoadingMask();
				$.post('/ct-admin/register/province/resume/logout',{ids:idStr},function(res){
					hideLoadingMask();
					if(res){
						alert('恢复成功！');
						$('#dg').datagrid('clearSelections');
						$('#dg').datagrid('reload');
					}
				});
		  	}
		});
	}else{
		showMsg('至少选择一条记录!','warning');
	}
})
//套读重刷注销
$('#stop-btn').click(function(){
	var rows = $('#dg').datagrid('getSelections');
	if(rows.length > 0){
		$.messager.confirm('提示','选中'+rows.length+'条记录,确定套读重刷注销吗?',function(r){
		    if (r){  
		    	var ids = [];
				$.each(rows,function(n,obj){
					ids.push(obj.id);
				});
				var idStr = ids.join(',');
				showLoadingMask();
				$.post('/ct-admin/register/province/stop',{ids:idStr},function(res){
					hideLoadingMask();
					if(res){
						alert('套读重刷注销成功！');
						$('#dg').datagrid('clearSelections');
						$('#dg').datagrid('reload');
					}
				});
		    }
		});
	}else{
        showMsg('至少选择一条记录!','warning');
    }
});
//毕业注销
$('#over-btn').click(function(){
	var rows = $('#dg').datagrid('getSelections');
	if(rows.length > 0){
		$.messager.confirm('提示','选中'+rows.length+'条记录,确定毕业注销吗?',function(r){
		    if (r){  
		    	var ids = [];
				$.each(rows,function(n,obj){
					ids.push(obj.id);
				});
				var idStr = ids.join(',');
				showLoadingMask();
				$.post('/ct-admin/register/province/over',{ids:idStr},function(res){
					hideLoadingMask();
					if(res){
						alert('毕业注销成功！');
						$('#dg').datagrid('clearSelections');
						$('#dg').datagrid('reload');
					}
				});
		    }
		});
	}else{
        showMsg('至少选择一条记录!','warning');
    }
});

//归档欠费
$('#arrears-btn').click(function(){
	var rows = $('#dg').datagrid('getSelections');
	if(rows.length > 0){
		$.messager.confirm('提示','选中'+rows.length+'条记录,确定归档欠费吗?',function(r){  
		    if (r){  
		    	var ids = [];
				$.each(rows,function(n,obj){
					ids.push(obj.id);
				});
				var idStr = ids.join(',');
				showLoadingMask();
				$.post('/ct-admin/register/province/arrears',{ids:idStr},function(res){
					hideLoadingMask();
					if(res){
						alert('归档欠费成功！');
						$('#dg').datagrid('clearSelections');
						$('#dg').datagrid('reload');
					}
				});
		    }
		});
	}
});
//停靠欠费
$('#stopmoney-btn').click(function(){
	var rows = $('#dg').datagrid('getSelections');
	if(rows.length > 0){
		$.messager.confirm('提示','选中'+rows.length+'条记录,确定停考欠费吗?',function(r){  
		    if (r){  
		    	var ids = [];
				$.each(rows,function(n,obj){
					ids.push(obj.id);
				});
				var idStr = ids.join(',');
				showLoadingMask();
				$.post('/ct-admin/register/province/stopMoney',{ids:idStr},function(res){
					hideLoadingMask();
					if(res){
						alert('停考欠费成功！');
						$('#dg').datagrid('clearSelections');
						$('#dg').datagrid('reload');
					}
				});
		    }
		});
	}
});
//全部停靠欠费
$('#stopmoneyAll-btn').click(function(){
	var yearCode = $('#yearCode_tk').val();
	if(yearCode!='' && yearCode != null ){
		$.messager.confirm('提示','确定将'+yearCode+'年度中没有标记缴纳管理费考生标记停考欠费吗?',function(r){  
		    if (r){  
		    	
				showLoadingMask();
				 $.post('/ct-admin/register/province/stopAllMoney',{yearCode:yearCode},function(res){
					hideLoadingMask();
					if(res){
						alert('全部标记停考欠费成功！');
						$('#dg').datagrid('clearSelections');
						$('#dg').datagrid('reload');
					}
				});
		    }
		});
	}else{
		alert('请输入全部标记停考欠费年度码！');
	}
});
//标记缴纳第一年管理费
$('#paymgrmoneyone-btn').click(function(){
	var rows = $('#dg').datagrid('getSelections');
	if(rows.length > 0){
		$.messager.confirm('提示','选中'+rows.length+'条记录,确定标记缴纳第一年管理费吗?',function(r){  
		    if (r){  
		    	var ids = [];
				$.each(rows,function(n,obj){
					ids.push(obj.id);
				});
				var idStr = ids.join(',');
				//showLoadingMask();
				$.post('/ct-admin/register/province/payMgrMoneyOne',{ids:idStr},function(res){
					hideLoadingMask();
					if(res){
						alert('标记缴纳第一年管理费成功！');
						$('#dg').datagrid('clearSelections');
						$('#dg').datagrid('reload');
					}
				});
		    }
		});
	}
});
//标记缴纳第二年管理费
$('#paymgrmoney-btn').click(function(){
	var rows = $('#dg').datagrid('getSelections');
	if(rows.length > 0){
		$.messager.confirm('提示','选中'+rows.length+'条记录,确定标记缴纳第二年管理费吗?',function(r){  
		    if (r){  
		    	var ids = [];
				$.each(rows,function(n,obj){
					ids.push(obj.id);
				});
				var idStr = ids.join(',');
				showLoadingMask();
				$.post('/ct-admin/register/province/payMgrMoney',{ids:idStr},function(res){
					hideLoadingMask();
					if(res){
						alert('标记缴纳第二年管理费成功！');
						$('#dg').datagrid('clearSelections');
						$('#dg').datagrid('reload');
					}
				});
		    }
		});
	}
});
//修改专业
$('#update-btn').click(function(){
	var rows = $('#dg').datagrid('getSelections');
	if(rows.length == 1){
		var id = rows[0].id;
		openDialog('修改专业信息','/ct-admin/register/province/complete/update/specialty/'+id);
	}
	else{
		showMsg('请选择一条记录','warning');
	}	
});
$('#update-dljg').click(function(){
	var rows = $('#dg').datagrid('getSelections');
	if(rows.length == 1){
		var id = rows[0].id;
		customOpenDialog('修改合作伙伴','/ct-admin/register/province/complete/update/dljg/'+id, 500, 700);
	}
	else{
		showMsg('请选择一条记录','warning');
	}	
});
$('#updatebase-btn').click(function(){
	var rows = $('#dg').datagrid('getSelections');
	if(rows.length == 1){
		var id = rows[0].id;
		openDialog('修改基本信息','/ct-admin/register/updateAll/'+id);
	}
	else{
		showMsg('请选择一条记录','warning');
	}
});
//标记非正常注册
$('#nonnormal-btn').click(function(){
	var rows = $('#dg').datagrid('getSelections');
	if(rows.length > 0){
		$.messager.confirm('提示','选中'+rows.length+'条记录,确定申请非正常注册吗?',function(r){  
		    if (r){  
		    	var ids = [];
		    	var flag = true;
				$.each(rows,function(n,obj){
					if(obj.nonNormal==1){
						flag = false;
						return false;
					}
					ids.push(obj.id);
				});
				if(!flag){
					showMsg('该记录已是非正常注册','warn');
					return false;
				}
				var idStr = ids.join(',');
				//showLoadingMask();
				$.post('/ct-admin/register/province/apply/nonnormal',{ids:idStr},function(res){
					if(res){
						showMsg('非正常注册成功！');
						$('#dg').datagrid('clearSelections');
						$('#dg').datagrid('reload');
					}
				});
		    }
		});
	}
});
//取消非正常注册标识
$('#resume-normal-btn').click(function(){
	var rows = $('#dg').datagrid('getSelections');
	if(rows.length > 0){
		$.messager.confirm('提示','选中'+rows.length+'条记录,确定取消非正常注册标识吗?',function(r){  
		    if (r){  
		    	var ids = [];
				$.each(rows,function(n,obj){
					ids.push(obj.id);
				});
				var idStr = ids.join(',');
				//showLoadingMask();
				$.post('/ct-admin/register/province/resume/normal',{ids:idStr},function(res){
					if(res){
						showMsg('取消非正常注册标识成功！');
						$('#dg').datagrid('clearSelections');
						$('#dg').datagrid('reload');
					}
				});
		    }
		});
	}
});
//专业修改申请
$('#apply-btn').click(function(){
	var rows = $('#dg').datagrid('getSelections');
	if(rows.length == 1){
		var id = rows[0].id;
		openDialog('专业修改申请','/ct-admin/register/specialty/edit/apply/'+id);
	}else{
		showMsg('请选择一条记录','warning');
	}	
});


$("#remove-btn").click(function () {
  console.log(123);
	var rows = $('#dg').datagrid('getSelections');
	if(rows.length == 1){
		var id = rows[0].id;
		$.messager.confirm("提示", "确认删除，删除后不可恢复？", function (r) {
			if (r) {
				$.post('/ct-admin/register/province/remove/' + id, function (res) {
					if (res == 1) {
						showMsg("操作成功！");
						$('#dg').datagrid('clearSelections');
						$('#dg').datagrid('reload');
					} else if (res == 2) {
						showMsg("该考生存在多条注册信息！已删除当前报考信息！");
					} else {
						showMsg("删除失败！", 'warning');
					}
				})

			}});
	}else{
		showMsg('请选择一条记录','warning');
	}
});
//缴费情况
function getPayment(value,row,index){
	if(value==null || value=='0'){
		return "未交费";
	}else if(value=='1'){
		return "一期已交费";
	}else{
		return "二期已交费";
	}
};
function gettimeymd(value,row,index){
	if(value!=null)
		return getFormatDate(new Date(value), "yyyy-MM-dd");
	else
		return null;
}`;

  nextTick(() => {
    jspRef.value.append(script);
  })

  console.log(res);
})

</script>

<template>
  <div v-html="jsp" ref="jspRef">

  </div>
</template>

<style scoped lang='scss'>

</style>