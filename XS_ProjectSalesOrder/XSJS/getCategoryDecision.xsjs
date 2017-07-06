//var conn = $.db.getConnection();
var pstmt;
var rs;
var get_query;
var output = {listOfBeverageValidDto: [] };
var sample_input = $.request.parameters.get("sampleInput");

try {
	
	var conn = $.db.getConnection();
	get_query = 'select SAMPLEINPUT, CATEGORY, BRAND, IMAGE from PEPSI_POC.CATEGORY_DECISION where SAMPLEINPUT = ?';
    pstmt = conn.prepareStatement(get_query);
    pstmt.setString(1, sample_input);
//    pstmt.setString(2, dateto);
    rs = pstmt.executeQuery();
    var record = {};
    while (rs.next()) {
            record.SampleInput = rs.getString(1);
            record.category = rs.getString(2);
            record.brand = rs.getString(3);
            record.image = rs.getString(4);
            output.listOfBeverageValidDto.push(record);
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