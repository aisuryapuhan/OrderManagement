var pstmt;
var rs;
var get_query;
var output = {listOfMaterialInfo: [] };
//var output;
var brand = $.request.parameters.get("brandName");

try {
	
	var conn = $.db.getConnection();
	get_query = 'select SHORTDESCRIPTION, MATERIALID, MATERIAL_DESCRIPTION, PRICE, CURRENCY, UNIT, IMAGE_PATH, QUANTITY from PEPSI_POC.BRAND_DESCRIPTION where BRAND = ?';
    pstmt = conn.prepareStatement(get_query);
    pstmt.setString(1, brand);
//    pstmt.setString(2, dateto);
    rs = pstmt.executeQuery();
    var record = {};
    while (rs.next()) {
            record.eccDescription = rs.getString(1);
            record.materialId = rs.getString(2);
            record.materialDescription = rs.getString(3);
            record.price = rs.getString(4);
            record.currency = rs.getString(5);
            record.unit = rs.getString(6);
            record.imagepath = rs.getString(7);
            record.quantity = parseInt(rs.getString(8),10);
            output.listOfMaterialInfo.push(record);
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