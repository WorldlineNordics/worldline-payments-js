import { paymentConstants } from "./PaymentConstants";
import { ProcessRequest } from "./ProcessRequest";

export class PaymentRequest extends ProcessRequest {
  public cardHolderName: string;
  public cardNumber: string;
  public expDateMonth: number;
  public expDateYear: number;
  public cvCode: number;
  public storedUserRef: string;
  public provider: string;
  public method: string = "POST";

  public storedUser(storeUserObj) {
    if ("provider" in storeUserObj) {
      this.provider = storeUserObj.provider;
    }
    if ("storedUserReference" in storeUserObj) {
      this.storedUserRef = storeUserObj.storedUserRef;
    }
    return this;
  }

  public chdForm(document: Document, tag: string) {
    const chdElements = document.querySelectorAll("[" + tag + "]");
    const chd = {};
    chdElements.forEach(x => {
      chd[x.attributes["data-chd"].nodeValue] = (x as HTMLInputElement).value;
    });
    this.cardHolderName = chd["cardHolderName"];
    this.cardNumber = chd["cardNumber"];
    this.expDateMonth = chd["cardExpiryMonth"];
    this.expDateYear = chd["cardExpiryYear"];
    this.cvCode = chd["cardCVC"];
    return this;
  }

  public card(cardObj) {
    if ("cardNumber" in cardObj) {
      this.cardNumber = cardObj.cardNumber;
    }
    if ("cardHolderName" in cardObj) {
      this.cardHolderName = cardObj.cardHolderName;
    }
    if ("expDateMonth" in cardObj) {
      this.expDateMonth = cardObj.cardExpiryMonth;
    }
    if ("expDateYear" in cardObj) {
      this.expDateYear = cardObj.cardExpiryYear;
    }
    if ("cvCode" in cardObj) {
      this.cvCode = cardObj.cardCVC;
    }
    return this;
  }

  public storedUserReference(n) {
    this.storedUserRef = n;
    return this;
  }

  public send(key) {
    let endpointUrl = this.endpoint;
    if (key === "initAuth") {
      endpointUrl = endpointUrl.concat(paymentConstants.initAuthCardApi);
    } else if (key === "continueAuth") {
      endpointUrl = endpointUrl.concat(paymentConstants.continueAuthCardApi);
    } else if (key === "payment") {
      endpointUrl = endpointUrl.concat(paymentConstants.completeCardApi);
    }
    const data = JSON.stringify({
      cardHolderName: this.cardHolderName,
      cardNumber: this.cardNumber,
      cvCode: this.cvCode,
      encryptedPayload: this.encryptedPayload,
      expDateMonth: this.expDateMonth,
      expDateYear: this.expDateYear,
      provider: this.provider,
      storedUserReference: this.storedUserRef
    });
    super.sendPayment(endpointUrl, data, this.method);
    return this;
  }
}
