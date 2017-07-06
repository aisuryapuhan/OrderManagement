var pstmt;
var rs, rs2;
var get_query;
var output = {};
var brand = $.request.parameters.get("sampleInput");

try {
	
	var conn = $.db.getConnection();
	get_query = 'select distinct BRAND_NAME, IMAGE_PATH from "PEPSI_POC"."PROMOTION_DECISION"';
    pstmt = conn.prepareStatement(get_query);
    // pstmt.setString(1, brand);
//    pstmt.setString(2, dateto);
    rs = pstmt.executeQuery();
    var record = {};
    var subrecord = {};
    var promotions = [];
    while (rs.next()) { 
        var getOffers_Query = 'select OFFER FROM "PEPSI_POC"."PROMOTION_DECISION" WHERE BRAND_NAME = ?';
         pstmt = conn.prepareStatement(getOffers_Query);
          pstmt.setString(1, rs.getString(1));
          rs2 = pstmt.executeQuery();
          
          var aOfferArray = [];
            while(rs2.next()) {
                var element = {};
                element.offer = rs2.getString(1);
                // aOfferArray.push(element);
                aOfferArray.push(rs2.getString(1));
            }
          var oPromotionElement = {};
          oPromotionElement.brandName = rs.getString(1);
          oPromotionElement.imagePath = rs.getString(2);
          oPromotionElement.listOfOffers = aOfferArray;
           promotions.push(oPromotionElement);
    }
    output.promotions = promotions;
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