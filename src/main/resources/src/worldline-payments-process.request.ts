var PaymentRequestState = {
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

var state = PaymentRequestState.NEW;

export class ProcessRequest {
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
	            state = PaymentRequestState.OK;
	            worldlineRequest.successFn(JSON.parse(xhttp.response));
	        }
			else if (this.status === 405) {
	            state = PaymentRequestState.ERROR;
	            worldlineRequest.errorFn({
	                status: this.status,
	                statusText: 'Please verify the Worldline Device API URL'
	            });
	        } else {
	            state = PaymentRequestState.ERROR;
	            worldlineRequest.errorFn({
	                status: this.status,
	                statusText: xhttp.statusText
	            });
	        }
		};
		
		xhttp.onerror = function () {
			state = PaymentRequestState.ERROR;
			worldlineRequest.errorFn({
	            status: this.status,
	            statusText: xhttp.statusText === '' ? 'Could not send transaction.' : xhttp.statusText
	        });
	    };
	    xhttp.ontimeout = function () {
	        state = PaymentRequestState.ERROR;
	        worldlineRequest.errorFn({
	            status: this.status,
	            statusText: xhttp.statusText
	        });

	    };
	    
	    state = PaymentRequestState.SENT;
	    if(method === "POST"){
	    	xhttp.send(data);
	    }
	    else if(method === "GET"){
	    	xhttp.send();
	    }
	};
}