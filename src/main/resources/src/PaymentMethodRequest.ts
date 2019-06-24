import { paymentConstants } from "./PaymentConstants";
import { ProcessRequest } from "./ProcessRequest";
export class PaymentMethodRequest extends ProcessRequest {
  public paymentMethodType: string;
  public method: string = "POST";

  public pmType(n) {
    this.paymentMethodType = n;
    return this;
  }

  public send() {
    const endpointUrl = this.endpoint.concat(paymentConstants.paymentMethodApi);
    const data = JSON.stringify({
      encryptedPayload: this.encryptedPayload,
      paymentMethodType: this.paymentMethodType
    });
    super.sendPayment(endpointUrl, data, this.method);
    return this;
  }
}
