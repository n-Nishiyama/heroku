showTodo_Day();
showTodo_All();



function checkChange(todoId){
//	var todoId = null;
	var cookie_all = document.cookie;
	var gid;
//	todoId = document.getElementById("todoId").value
	var i=0;

		while(cookie_all.split( '; ' )[ i ] != null){

			if(cookie_all.split( '; ' )[ i ].split( '=' )[ 0 ] == 'gId'){
				gid=cookie_all.split('; ')[ i ].split( '=' )[ 1 ];
			}
			i++;
		}
		gid=decodeURIComponent(gid);

		console.log(gid+":"+todoId);

    	fetch('/CFT/ChangeDone_todo', {
    		mode: 'cors', //クロスオリジンリクエストをするのでCORSモードにする
    		credentials: 'include',
    		redirect: 'follow',
    		method: 'POST',
			body : 'gid='+gid+'&todoId='+todoId,
			headers : new Headers({'Content-type' : 'application/x-www-form-urlencoded;charset=UTF-8' })
    	})
    	  .then(response => {
    		  console.log(response);
					if(response.status=="200"){
						//入力欄を空欄にする
//						document.getElementById("Todoadd").value=null;
//						メッセージを更新

						showTodo_Day();
						showTodo_All()
					}
    	    return response.text();
    	})
	}




function addTodo(){

	var cookie_all = document.cookie;
	var gid;
	var contents=document.getElementById("Todoadd").value
	var i=0;

	if(contents!=''){
		while(cookie_all.split( '; ' )[ i ] != null){

			if(cookie_all.split( '; ' )[ i ].split( '=' )[ 0 ] == 'gId'){
				gid=cookie_all.split('; ')[ i ].split( '=' )[ 1 ];
			}
			i++;
		}
		gid=decodeURIComponent(gid);

//		console.log(gid+":"+contents);

    	fetch('/CFT/ToDo', {
    		mode: 'cors', //クロスオリジンリクエストをするのでCORSモードにする
    		credentials: 'include',
    		redirect: 'follow',
    		method: 'POST',
			body : 'gid='+gid+'&contents='+contents,
			headers : new Headers({'Content-type' : 'application/x-www-form-urlencoded;charset=UTF-8' })
    	})
    	  .then(response => {
    		  console.log(response);
					if(response.status=="200"){
						//入力欄を空欄にする
						document.getElementById("Todoadd").value=null;
//						メッセージを更新
						showTodo_All();
						showTodo_Day();
					}
    	    return response.text();
    	})
	}
}

function showTodo_Day(){

	var cookie_all = document.cookie;
	var gid;
	var date_source = new Date();
	var date = date_source.getFullYear()+"-"+(date_source.getMonth()+1)+"-"+date_source.getDate();
	var i=0;


	while(cookie_all.split( '; ' )[ i ] != null){

		if(cookie_all.split( '; ' )[ i ].split( '=' )[ 0 ] == 'gId'){
			gid=cookie_all.split('; ')[ i ].split( '=' )[ 1 ];
		}
		i++;
	}
	gid=decodeURIComponent(gid);

		var url= '/CFT/ToDo?gid='+gid+'&date='+date;

//		console.log("showtodo");
    	fetch(url, {
    		mode: 'cors', //クロスオリジンリクエストをするのでCORSモードにする
    		credentials: 'include',
    		redirect: 'follow',
    		method: 'GET',
    		headers : new Headers({'Content-type' : 'application/x-www-form-urlencoded;charset=UTF-8' })
    	})
    	  .then(response => {
    		  console.log(response);
    		  if(response.status=="200"){
    		  }
    	    return response.text();
    	  }).then(text => {
//    		  メッセージの書き換え
    		  console.dir(text);
    		  writeTodo($.parseJSON(text));
    	  });

}

function showTodo_All(){

	var cookie_all = document.cookie;
	var gid;
	var i=0;


	while(cookie_all.split( '; ' )[ i ] != null){

		if(cookie_all.split( '; ' )[ i ].split( '=' )[ 0 ] == 'gId'){
			gid=cookie_all.split('; ')[ i ].split( '=' )[ 1 ];
		}
		i++;
	}
	gid=decodeURIComponent(gid);

		var url= '/CFT/ToDo?gid='+gid;

//		console.log("showtodo");
    	fetch(url, {
    		mode: 'cors', //クロスオリジンリクエストをするのでCORSモードにする
    		credentials: 'include',
    		redirect: 'follow',
    		method: 'GET',
    		headers : new Headers({'Content-type' : 'application/x-www-form-urlencoded;charset=UTF-8' })
    	})
    	  .then(response => {
    		  console.log(response);
    		  if(response.status=="200"){
    		  }
    	    return response.text();
    	  }).then(text => {
//    		  メッセージの書き換え
    		  writeTodo_false($.parseJSON(text));
    	  });

}



//メッセージの書き換え
function writeTodo(todoObj){
//	message要素の削除
	$("#toDayTodo table tbody").empty();

//    messageObjを一行ずつ表示
    for(let k in todoObj) {
    	if(todoObj[k].done == "false"){
    	    $('#toDayTodo table tbody').prepend('<tr id='+todoObj[k].todoId+'><td><input type="checkbox" name="" id="todoId" value="'+todoObj[k].todoId+'" onClick="checkChange('+todoObj[k].todoId+')"></td><td>'+todoObj[k].date+'</td><td>'+todoObj[k].contents+'</td></tr>');
    	}
    	else{
    	    $('#toDayTodo table tbody').prepend('<tr id='+todoObj[k].todoId+'><td><input type="checkbox" checked = "checked"  name="" id="todoId" value="'+todoObj[k].todoId+'" onClick="checkChange('+todoObj[k].todoId+')"></td><td>'+todoObj[k].date+'</td><td>'+todoObj[k].contents+'</td></tr>');
    	}

    }
//  messageTableを一番下までスクロール
//    $("#toDayTodo").scrollTop($("#toDayTodo")[0].scrollHeight);
}


//未完了のtodo
function writeTodo_false(todoObj_false){
//	message要素の削除
	$("#allDayTodo table tbody").empty();
//    messageObjを一行ずつ表示

    for(let s in todoObj_false) {
//    	console.log(todoObj_false[s].contents);
	    $('#allDayTodo table tbody').prepend('<tr id='+todoObj_false[s].todoId+'><td><input type="checkbox" name="" id="todoId" value="'+todoObj_false[s].todoId+'" onClick="checkChange('+todoObj_false[s].todoId+')"></td><td>'+todoObj_false[s].date+'</td><td>'+todoObj_false[s].contents+'</td></tr>');
    }
//  messageTableを一番下までスクロール
//    $("#allDayTodo").scrollTop($("#allDayTodo")[0].scrollHeight);
}



//グループ作成画面の表示切り替え
function allDayTableOpen()
{
  document.getElementById("toDayTodo").style.display="none";
  document.getElementById("allDayTodo").style.display="block";

  return null;
}

function toDayTableOpen()
{
  document.getElementById("allDayTodo").style.display="none";
  document.getElementById("toDayTodo").style.display="block";

  return null;
}
