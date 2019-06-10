import { ProcessRequest } from "./ProcessRequest";
export class PaymentMethodRequest extends ProcessRequest{
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