import { ProcessRequest } from "./worldline-payments-process.request";
export class PaymentRequest extends ProcessRequest {

	cardHolderName:string;
 	cardNumber:string;
 	expDateMonth:number;
 	expDateYear:number;
 	cvCode:number;
 	storedUserRef:string;
 	provider:string;
	method:string = "POST";

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
