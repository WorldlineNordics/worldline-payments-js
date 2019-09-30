import { paymentConstants } from "./PaymentConstants";
import { ProcessRequest } from "./ProcessRequest";
export class PaymentMethodRequest extends ProcessRequest {
  public method: string = "POST";
  public encryptedPayload: string;
  public send(): void {
    const endpointUrl = this.endpoint.concat(paymentConstants.paymentMethodApi);
    const data = {
      encryptedPayload: this.encryptedPayload,
      paymentMethodType: this.paymentMethodType
    };
    super.sendData(endpointUrl, data, this.method);
  }
}
