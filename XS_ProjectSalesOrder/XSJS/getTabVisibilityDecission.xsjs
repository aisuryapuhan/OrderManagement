var pstmt;
var rs;
var get_query;
var output = {roles: [] };
//var output;
var role = $.request.parameters.get("roleName");

try {
	
	var conn = $.db.getConnection();
	get_query = 'SELECT ROLE,NAME,ICON FROM "PEPSI_POC"."ADMIN_ROLE_ACCESS" WHERE ROLE = ?';
    pstmt = conn.prepareStatement(get_query);
    pstmt.setString(1, role); 
//    pstmt.setString(2, dateto);
    rs = pstmt.executeQuery();
    var record = {};
    while (rs.next()) {
            record.ROLE = rs.getString(1);
            record.NAME = rs.getString(2);
            record.ICON = rs.getString(3);
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