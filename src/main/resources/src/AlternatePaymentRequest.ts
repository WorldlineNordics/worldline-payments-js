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

  public send() {
    const data = JSON.stringify({
      encryptedPayload: this.encryptedPayload,
      paymentMethodId: this.paymentMethodId
    });
    super.sendPayment(this.endpointUrl, data, this.method);
    return this;
  }
}
