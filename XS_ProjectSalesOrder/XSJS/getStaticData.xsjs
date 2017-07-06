var body = '';
    body = JSON.stringify({
        "orderData": [{
        
          //$.session.getUsername() - Returns the user name of the logged-on database user
          "completelyProcessed": 16,
        
         //$.session.language - Contains an empty string unless a language is explicitly set by the XS session layer.
         "partiallyProcessed": 28,
        
         //$.session.getInvocationCount() - Returns the number of requests sent to the current session
         "deliveryOnTime": 24,
        
         //$.session.hasSystemPrivilege(privilegeName) - Checks whether the logged-on user has a specified system privilege
         "delayed": 8,
        
        
        }]
    });
    $.response.contentType = 'application/json';
    $.response.accept = 'application/json';
    $.response.setBody(body);
    $.response.status = $.net.http.OK;