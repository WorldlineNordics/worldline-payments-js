import { WLProcessRequest } from "./worldline-payments-process.request";

export class WLPaymentOptionsRequest extends WLProcessRequest{
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