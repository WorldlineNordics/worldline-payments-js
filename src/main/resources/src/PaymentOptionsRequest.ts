import { ProcessRequest } from "./ProcessRequest";
import { paymentConstants } from "./PaymentConstants";

export class PaymentOptionsRequest extends ProcessRequest {
  method: string = "GET";

  send() {
    let url = "?encryptedPayload=" + this.encryptedPayload;
    const hasApiUrl =
      this.endpoint.indexOf(paymentConstants.paymentOptionApi) > -1;
    const endpointUrl = hasApiUrl
      ? url
      : paymentConstants.paymentOptionApi + url;
    super.sendPayment(endpointUrl, "", this.method);
    return this;
  }
}
