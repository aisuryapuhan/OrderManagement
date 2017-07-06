var pstmt;
var rs;
var get_query;
//var output = {results: [] };
var output = {};

var userid = $.request.parameters.get("userId");

try {
	
	var conn = $.db.getConnection();
	get_query = 'select USERID, ORDERTYPE, ORDERDESCRIPTION from PEPSI_POC.USER_DECISION where USERID = ?';
    pstmt = conn.prepareStatement(get_query);
    pstmt.setString(1, userid);
//    pstmt.setString(2, dateto);
    rs = pstmt.executeQuery();
//    var record = {};
//    while (rs.next()) {
//            record.userid = rs.getString(1);
//            record.orderType = rs.getString(2);
//            record.orderDescription = rs.getString(3);
//            output.results.push(record);
//            record = {};
//    }
    rs.next();
    output.orderType = rs.getString(2);
    output.orderDescription = rs.getString(3);
    //rs.close();
    //pstmt.close();
    conn.close();
} 
catch (e) {
$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
$.response.setBody(e.message);
}


	//--------------------------------------------------------//
	var body = JSON.stringify(output);
	$.response.contentType = 'application/json';
	$.response.setBody(body);
	$.response.status = $.net.http.OK;