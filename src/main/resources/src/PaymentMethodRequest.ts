import { paymentConstants } from "./PaymentConstants";
import { ProcessRequest } from "./ProcessRequest";
export class PaymentMethodRequest extends ProcessRequest {
  paymentMethodType: string;
  method: string = "POST";

  pmType(n) {
    this.paymentMethodType = n;
    return this;
  }

  send() {
    const endpointUrl = this.endpoint.concat(paymentConstants.paymentMethodApi);
    let data = JSON.stringify({
      paymentMethodType: this.paymentMethodType,
      encryptedPayload: this.encryptedPayload
    });
    super.sendPayment(endpointUrl, data, this.method);
    return this;
  }
}