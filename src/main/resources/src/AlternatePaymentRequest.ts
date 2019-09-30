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

  public send(): void {
    const data = {
      paymentMethodId: this.paymentMethodId
    };
    super.sendPayment(data, this.method);
  }
}
