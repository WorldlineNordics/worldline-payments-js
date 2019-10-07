import { paymentConstants } from "./PaymentConstants";
const PaymentRequestState = {
  ERROR: 4,
  NEW: 1,
  OK: 3,
  SENT: 2,
  properties: {
    1: { name: "NEW", value: 1 },
    2: { name: "SENT", value: 2 },
    3: { name: "OK", value: 3 },
    4: { name: "ERROR", value: 4 }
  }
};

let state = PaymentRequestState.NEW;

export class PaymentService {
  public cardHolderName: string;
  public cardNumber: string;
  public endpointUrl: string;
  public expDateMonth: number;
  public expDateYear: number;
  public cvCode: number;
  public storedUserRef: string;
  public provider: string;
  public method: string = "POST";
  public timeout: number;
  public data: any;
  public paymentMethodId: string;
  protected encryptedPayload: string;
  protected endpoint: string;
  protected paymentMethodType: string;
  private worldlineSessionData: string;

  constructor(deviceAPIObj) {
    this.encryptedPayload = deviceAPIObj.encryptedPayload;
    this.endpoint = deviceAPIObj.deviceEndpoint;
    return this;
  }

  public setWorldlineSessionData(worldlineSessionData: string) {
    this.worldlineSessionData = worldlineSessionData;
    return this;
  }

  public initAuth() {
    this.endpointUrl = this.endpoint.concat(paymentConstants.initAuthCardApi);
    return this;
  }

  public continueAuth() {
    this.endpointUrl = this.endpoint.concat(
      paymentConstants.continueAuthCardApi
    );
    return this;
  }

  public cardPayment() {
    this.endpointUrl = this.endpoint.concat(paymentConstants.cardPaymentApi);
    return this;
  }
  public redirectPayment() {
    this.endpointUrl = this.endpoint.concat(paymentConstants.redirectApi);
    return this;
  }
  public eftPayment() {
    this.endpointUrl = this.endpoint.concat(paymentConstants.eftApi);
    return this;
  }

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
    this.data = {
      cardHolderName: this.cardHolderName,
      cardNumber: this.cardNumber,
      cvCode: this.cvCode,
      encryptedPayload: this.encryptedPayload,
      expDateMonth: this.expDateMonth,
      expDateYear: this.expDateYear,
      provider: this.provider,
      storedUserReference: this.storedUserRef,
      worldlineSessionData: this.worldlineSessionData
    };
    return this;
  }

  public storedUserReference(n) {
    this.storedUserRef = n;
  }

  public paymentForm(document: Document, tag: string) {
    const el = document.querySelector("[" + tag + "]");
    this.paymentMethodId = (el as HTMLInputElement).value;
    this.data = {
      encryptedPayload: this.encryptedPayload,
      paymentMethodId: this.paymentMethodId
    };
    return this;
  }

  public pmType(n) {
    this.paymentMethodType = n;
    return this;
  }

  public getPaymentMethod() {
    this.endpointUrl = this.endpoint.concat(paymentConstants.paymentMethodApi);
    this.data = {
      encryptedPayload: this.encryptedPayload,
      paymentMethodType: this.paymentMethodType
    };
    return this;
  }

  public send() {
    return new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest();
      xhttp.open(this.method, this.endpointUrl, true);
      xhttp.timeout = 60000;
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.onload = () => {
        if (xhttp.status >= 200 && xhttp.status < 300) {
          state = PaymentRequestState.OK;
          resolve(JSON.parse(xhttp.response));
        } else if (xhttp.status === 405) {
          state = PaymentRequestState.ERROR;
          reject({
            status: xhttp.status,
            statusText: "Please verify the Worldline Device API URL"
          });
        } else {
          state = PaymentRequestState.ERROR;
          reject({
            status: xhttp.status,
            statusText: xhttp.statusText
          });
        }
      };

      xhttp.onerror = () => {
        state = PaymentRequestState.ERROR;
        reject({
          status: xhttp.status,
          statusText:
            xhttp.statusText === ""
              ? "Could not send transaction."
              : xhttp.statusText
        });
      };
      xhttp.ontimeout = () => {
        state = PaymentRequestState.ERROR;
        reject({
          status: xhttp.status,
          statusText: xhttp.statusText
        });
      };

      state = PaymentRequestState.SENT;
      if (this.method === "POST") {
        xhttp.send(JSON.stringify(this.data));
      } else if (this.method === "GET") {
        xhttp.send();
      }
    });
  }
}
