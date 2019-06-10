import { ProcessRequest } from "./ProcessRequest";
export class AlternatePaymentRequest extends ProcessRequest{
	paymentMethodId:string;
	method:string = "POST"

	paymentForm(document:Document,tag:string){
    	var el = document.querySelector('['+tag+']');
    	this.paymentMethodId =  (<HTMLInputElement>el).value;
    	return this;
    }

	send(paymentMethodType){
		if (paymentMethodType==="ibp" || paymentMethodType==="ewallet") {
			var endpointUrl = this.endpoint.concat("/api/v1/redirectpayments");
		}
		else if (paymentMethodType==="eft") {
			var endpointUrl = this.endpoint.concat("/api/v1/eftpayments");
		}
		var data = JSON.stringify({
			paymentMethodId:this.paymentMethodId,
			encryptedPayload:this.encryptedPayload
		});
		super.sendPayment(endpointUrl,data,this.method);
		return this;
	}
	
}


