/**
 * @file
 * Provides Worldline Payment API.
 *
 * Usage:
 * var Request = new WLPaymentRequest()
 *      .chdForm(document.getElementById("paymentForm"), 'data-chd')
 *      .deviceAPIRequest(deviceAPIRequest)
 *      .onSuccess(callback)
 *      .onError(callback)
 *      .send();
 *      
 *  Where
 *  - The form has input fields for cardNumber, cardExpiryMonth, cardExpiryYear, cardCVC.
 *    Note that the form input fields may not have "name", as that could risk that the cardholderdata gets
 *    passed to the merchant server. This method explicitly warns on the console in that case.
 *  - The deviceAPIRequest contains a JSON with encryptedPayload and deviceEndpoint.
 *  - Callbacks for success and error. Error callback provides a JSON with status and statusText.
 *    The success callback contains an encryptedResponse that requires decryption on server side.
 *    
 *    
 * Usage for VisaCheckout:
 * var Request = new WLPaymentRequest()
 *      .storedUserReference(storedUserReference)
 *      .deviceAPIRequest(deviceAPIRequest)
 *      .onSuccess(callback)
 *      .onError(callback)
 *      .send();
 *      
 *  Where
 *  - The reference Id contains the call id obtained from VisaCheckout.
 *  - The deviceAPIRequest contains a JSON with encryptedPayload and deviceEndpoint.
 *  - Callbacks for success and error. Error callback provides a JSON with status and statusText.
 *    The success callback contains an encryptedResponse that requires decryption on server side.    
 * Usage for Get Payment Options Request for StoredUserService:
 * new WLPaymentOptionsRequest()
 *           .deviceAPIRequest(JSON.parse(JSON.parse(response).deviceAPIRequest))
 *           .onSuccess(resolve)
 *           .onError(reject)
 *           .send() 
 *
 * Where
 *  - The deviceAPIRequest contains a JSON with encryptedPayload and deviceEndpoint.
 *  - Callbacks for success and error. Error callback provides a JSON with status and statusText.
 *    The success callback contains an encryptedResponse that requires decryption on server side. 
 * 
 * 
 * Usage:
 In case of IBP
 * var Request = new WLRedirectPaymentRequest()
 *      .redirectForm(document.getElementById("online_banking_details"), 'data-ibp')
 *      .deviceAPIRequest(deviceAPIRequest)
 *      .onSuccess(callback)
 *      .onError(callback)
 *      .send();
 
 In case of eWallet
 * var Request = new WLRedirectPaymentRequest()
 *      .redirectForm(document.getElementById("ewallet_details"), 'data-ewallet')
 *      .deviceAPIRequest(deviceAPIRequest)
 *      .onSuccess(callback)
 *      .onError(callback)
 *      .send();
 *      
 *  Where
 *  - The form has select list for banks.
 *  - The deviceAPIRequest contains a JSON with paymentMethodId , encryptedPayload and deviceEndpoint.
 *  - Callbacks for success and error. Error callback provides a JSON with status and statusText.
 *    The success callback contains an encryptedResponse that requires decryption on server side.
 *  
 *	Usage  
 * var Request = new WLEftPaymentRequest()
 *      .redirectForm(document.getElementById("ewallet_details"), 'data-ewallet')
 *      .deviceAPIRequest(deviceAPIRequest)
 *      .onSuccess(callback)
 *      .onError(callback)
 *      .send();
 *      
 *  Where
 *  - The form has select list for banks.
 *  - The deviceAPIRequest contains a JSON with paymentMethodId , encryptedPayload and deviceEndpoint.
 *  - Callbacks for success and error. Error callback provides a JSON with status and statusText.
 *    The success callback contains an encryptedResponse that requires decryption on server side.
 *    
 *Usage:
 * var Request = new WLPaymentMethodRequest()
 *      .pmType(paymentMethodType)
 *      .deviceAPIRequest(deviceAPIRequest)
 *      .onSuccess(callback)
 *      .onError(callback)
 *      .send();
 *      
 *  Where
 *  - The deviceAPIRequest contains a JSON with paymentMethodType , encryptedPayload and deviceEndpoint.
 *  - Callbacks for success and error. Error callback provides a JSON with status and statusText.
 *    The success callback contains an encryptedResponse that requires decryption on server side.    
 */

var WLPaymentRequestState = {
    NEW: 1,
    SENT: 2,
    OK: 3,
    ERROR: 4,
    properties: {
        1: {name: "NEW", value: 1},
        2: {name: "SENT", value: 2},
        3: {name: "OK", value: 3},
        4: {name: "ERROR", value: 4}
    }
};

var state = WLPaymentRequestState.NEW;

class WLProcessRequest {
	successFn:any;
	errorFn:any;
	protected encryptedPayload:string;
	protected endpoint:string;
	
	onSuccess(success:Function){
		this.successFn = success;
		return this;
	}

	onError(error:Function){
		this.errorFn=error;
		return this;
	}
	
	deviceAPIRequest(deviceAPIObj) {
		this.encryptedPayload = deviceAPIObj.encryptedPayload;
        this.endpoint = deviceAPIObj.deviceEndpoint;
        return this;
	}

	sendPayment(endpoint:string,data:string,method:string){
		var xhttp = new XMLHttpRequest();
		xhttp.open(method, endpoint, true);
		xhttp.timeout = 60000;
		xhttp.setRequestHeader("Content-type", "application/json");
		var worldlineRequest = this;
		xhttp.onload = function () {
			if (this.status >= 200 && this.status < 300) {
	            state = WLPaymentRequestState.OK;
	            worldlineRequest.successFn(JSON.parse(xhttp.response));
	        }
			else if (this.status === 405) {
	            state = WLPaymentRequestState.ERROR;
	            worldlineRequest.errorFn({
	                status: this.status,
	                statusText: 'Please verify the Worldline Device API URL'
	            });
	        } else {
	            state = WLPaymentRequestState.ERROR;
	            worldlineRequest.errorFn({
	                status: this.status,
	                statusText: xhttp.statusText
	            });
	        }
		};
		
		xhttp.onerror = function () {
			state = WLPaymentRequestState.ERROR;
			worldlineRequest.errorFn({
	            status: this.status,
	            statusText: xhttp.statusText === '' ? 'Could not send transaction.' : xhttp.statusText
	        });
	    };
	    xhttp.ontimeout = function () {
	        state = WLPaymentRequestState.ERROR;
	        worldlineRequest.errorFn({
	            status: this.status,
	            statusText: xhttp.statusText
	        });

	    };
	    
	    state = WLPaymentRequestState.SENT;
	    if(method === "POST"){
	    	xhttp.send(data);
	    }
	    else if(method === "GET"){
	    	xhttp.send();
	    }
	};
}

class WLPaymentRequest extends WLProcessRequest{

	cardHolderName:string;
 	cardNumber:string;
 	expDateMonth:number;
 	expDateYear:number;
 	cvCode:number;
 	storedUserRef:string;
 	provider:string;
	method:string = "POST"

	storedUser(storeUserObj) {
		if ("provider" in storeUserObj) this.provider = storeUserObj.provider;
		if ("storedUserReference" in storeUserObj) this.storedUserRef = storeUserObj.storedUserRef;
		return this
	}

	chdForm(document:Document,tag:string){
		var chdElements = document.querySelectorAll('['+tag+']');
        var chd = {};
        chdElements.forEach(function (x) {
        	chd[x.attributes["data-chd"].nodeValue] = (<HTMLInputElement>x).value;
            if (x.hasAttribute("name")) {
            	console.warn("Form compliancy warning: input field " + x.attributes[tag].nodeValue + " has 'name' attribute");
            }
        });
        this.cardHolderName = chd["cardHolderName"];
        this.cardNumber = chd["cardNumber"];
        this.expDateMonth = chd["cardExpiryMonth"];
        this.expDateYear = chd["cardExpiryYear"];
        this.cvCode = chd["cardCVC"];
        return this;
	}
	
	card(cardObj) {
        if ("cardNumber" in cardObj) this.cardNumber = cardObj.cardNumber;
        if ("cardHolderName" in cardObj) this.cardHolderName = cardObj.cardHolderName;
        if ("expDateMonth" in cardObj) this.expDateMonth = cardObj.cardExpiryMonth;
        if ("expDateYear" in cardObj) this.expDateYear = cardObj.cardExpiryYear;
        if ("cvCode" in cardObj) this.cvCode = cardObj.cardCVC;
        return this
    }
	
	storedUserReference(n) {
        this.storedUserRef = n;
        return this
    }
	
	send(){
		var endpointUrl = this.endpoint;
		if(endpointUrl.indexOf("/api/v1/payments") <= -1){
			endpointUrl = endpointUrl.concat("/api/v1/payments");
	    }
		var data = JSON.stringify({
		   	cardHolderName: this.cardHolderName,
		   	cardNumber: this.cardNumber,
		   	expDateMonth: this.expDateMonth,
		   	expDateYear: this.expDateYear,
		   	cvCode: this.cvCode,
		    encryptedPayload: this.encryptedPayload,
		    storedUserReference: this.storedUserRef,
			provider: this.provider
		});
        super.sendPayment(endpointUrl,data,this.method);
        return this;
    }

}

class WLRedirectPaymentRequest extends WLProcessRequest{
	paymentMethodId:string;
	method:string = "POST"

	redirectForm(document:Document,tag:string){
    	var el = document.querySelector('['+tag+']');
    	this.paymentMethodId =  (<HTMLInputElement>el).value;
    	return this;
    }

	send(){
		var endpointUrl = this.endpoint.concat("/api/v1/redirectpayments");
		var data = JSON.stringify({
			paymentMethodId:this.paymentMethodId,
			encryptedPayload:this.encryptedPayload
		});
		super.sendPayment(endpointUrl,data,this.method);
		return this;
	}
}

class WLEftPaymentRequest extends WLProcessRequest{
	paymentMethodId:string;
	method:string = "POST"

	eftForm(document:Document,tag:string){
    	var el = document.querySelector('['+tag+']');
    	this.paymentMethodId =  (<HTMLInputElement>el).value;
    	return this;
    }

	send(){
		var endpointUrl = this.endpoint.concat("/api/v1/eftpayments");
		var data = JSON.stringify({
			paymentMethodId:this.paymentMethodId,
			encryptedPayload:this.encryptedPayload
		});
		super.sendPayment(endpointUrl,data,this.method);
		return this;
	}
}

class WLPaymentMethodRequest extends WLProcessRequest{
	paymentMethodType:string;
	method:string = "POST"

  	pmType(n){
  		this.paymentMethodType = n;
  		return this;
  	}
  	
	send(){
		var endpointUrl = this.endpoint.concat("/api/v1/paymentmethods");
		var data = JSON.stringify({
      		paymentMethodType:this.paymentMethodType,
      		encryptedPayload:this.encryptedPayload
      	});
		super.sendPayment(endpointUrl,data,this.method);
		return this;
	}
	
}

class WLPaymentOptionsRequest extends WLProcessRequest{
	method:string = "GET"
	
	send(){
		var endpointUrl = this.endpoint;
		if(endpointUrl.indexOf("/api/v1/paymentoptions") > -1){
			endpointUrl = endpointUrl.concat("?encryptedPayload=" + this.encryptedPayload);
		}
		else{
			endpointUrl = endpointUrl.concat("/api/v1/paymentoptions?encryptedPayload=" + this.encryptedPayload);
		}
		super.sendPayment(endpointUrl,'',this.method);
		return this;
	}
}

