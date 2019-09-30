import { paymentConstants } from "./PaymentConstants";
import { ProcessRequest } from "./ProcessRequest";

export class PaymentOptionsRequest extends ProcessRequest {
  public method: string = "GET";

  public send(): void {
    const url = "?encryptedPayload=" + this.encryptedPayload;
    const endpointUrl =
      this.endpoint.indexOf(paymentConstants.paymentOptionApi) > -1
        ? url
        : paymentConstants.paymentOptionApi + url;
    super.sendData(endpointUrl, "", this.method);
  }
}
