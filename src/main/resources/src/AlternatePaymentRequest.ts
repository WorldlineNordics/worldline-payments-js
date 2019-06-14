import { ProcessRequest } from "./ProcessRequest";
import { paymentConstants } from "./PaymentConstants";
export class AlternatePaymentRequest extends ProcessRequest {
  paymentMethodId: string;
  method: string = "POST";

  paymentForm(document: Document, tag: string) {
    const el = document.querySelector("[" + tag + "]");
    this.paymentMethodId = (<HTMLInputElement>el).value;
    return this;
  }

  send(paymentMethodType) {
    let endpointUrl;
    if (paymentMethodType === "ibp" || paymentMethodType === "ewallet") {
      endpointUrl = this.endpoint.concat(paymentConstants.redirectApi);
    } else if (paymentMethodType === "eft") {
      endpointUrl = this.endpoint.concat(paymentConstants.eftApi);
    }
    let data = JSON.stringify({
      paymentMethodId: this.paymentMethodId,
      encryptedPayload: this.encryptedPayload
    });
    super.sendPayment(endpointUrl, data, this.method);
    return this;
  }
}
