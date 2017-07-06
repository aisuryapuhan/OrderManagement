var pstmt;
var rs;
var get_query;
var output = {roles: [] };
//var output;
var userid = $.request.parameters.get("UserID");

try {
	
	var conn = $.db.getConnection();
	get_query = 'SELECT ROLE_NAME FROM GRANTED_ROLES WHERE GRANTEE = ?';
    pstmt = conn.prepareStatement(get_query);
    pstmt.setString(1, userid);
//    pstmt.setString(2, dateto);
    rs = pstmt.executeQuery();
    var record = {};
    while (rs.next()) {
            record.roleName = rs.getString(1);
            output.roles.push(record);
            record = {};
    }
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