//
//fetch('http://localhost:8080/CFT/SampleServlet').
//	then(response => {
//		console.log(response.status);
//	    return response.text();
//	 });


function hoge(){

	fetch('http://localhost:8080/CFT/SampleServlet').
		then(response => {
			console.log(response.status);
		    return response.text();
		 });




//	console.log("hoge");
//    	fetch('http://localhost:8080/CFT/SampleServlet?id="so"&pass="no"', {
//    		method: 'GET',
//    		parameter:{
//   		  	id: "idid",
//   		  	pass: "passpass"
//    	}
//
//
//
//    	})
//
//
//    	  .then(response => {
//    		  console.log(response.status);
//    	    return response.text();
//    	  })
//
//
//
//
//
//    	  .then((text) => {
//    		  var data = text;
//    		  var obj = (new Function("return " + data))();
//    		  console.dir(obj);
//    		  });

}