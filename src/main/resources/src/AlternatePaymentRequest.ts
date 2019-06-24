import { paymentConstants } from "./PaymentConstants";
import { ProcessRequest } from "./ProcessRequest";
export class AlternatePaymentRequest extends ProcessRequest {
  public paymentMethodId: string;
  public method: string = "POST";

  public paymentForm(document: Document, tag: string) {
    const el = document.querySelector("[" + tag + "]");
    this.paymentMethodId = (el as HTMLInputElement).value;
    return this;
  }

  public send(paymentMethodType) {
    let endpointUrl;
    if (paymentMethodType === "ibp" || paymentMethodType === "ewallet") {
      endpointUrl = this.endpoint.concat(paymentConstants.redirectApi);
    } else if (paymentMethodType === "eft") {
      endpointUrl = this.endpoint.concat(paymentConstants.eftApi);
    }
    const data = JSON.stringify({
      encryptedPayload: this.encryptedPayload,
      paymentMethodId: this.paymentMethodId
    });
    super.sendPayment(endpointUrl, data, this.method);
    return this;
  }
}
