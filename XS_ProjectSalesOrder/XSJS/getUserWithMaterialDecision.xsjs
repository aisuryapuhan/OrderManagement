var pstmt;
var rs;
var get_query;
var output = {item: {ShipToParty:[]} };
var userId = $.request.parameters.get("userId");

try {
	
	var conn = $.db.getConnection();
	get_query = 'select USERID, SOLDTOPARTY, SHIPTOPARTY, SOLDTOPARTYDESCRIPTION, SHIPTPPARTYDESCRIPTION from PEPSI_POC.USER_WITH_MATERIAL_DECISION where USERID = ?';
    pstmt = conn.prepareStatement(get_query);
    pstmt.setString(1, userId);
    rs = pstmt.executeQuery();
    var record = {};
    while (rs.next()) {
    		output.item.UserId = rs.getString(1);
            output.item.SoldToParty = rs.getString(2);
            record.ShipToParty = rs.getString(3);
            record.ShipToPartyDescription = rs.getString(5);
            output.item.SoldToPartyDescription = rs.getString(4);
            output.item.ShipToParty.push(record);
            //output.item.shipToParty.push(rs.getString(3));
            record = {};
    }
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