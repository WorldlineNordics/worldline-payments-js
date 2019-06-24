import { paymentConstants } from "./PaymentConstants";
import { ProcessRequest } from "./ProcessRequest";

export class PaymentOptionsRequest extends ProcessRequest {
  public method: string = "GET";

  public send() {
    const url = "?encryptedPayload=" + this.encryptedPayload;
    const hasApiUrl =
      this.endpoint.indexOf(paymentConstants.paymentOptionApi) > -1;
    const endpointUrl = hasApiUrl
      ? url
      : paymentConstants.paymentOptionApi + url;
    super.sendPayment(endpointUrl, "", this.method);
    return this;
  }
}
