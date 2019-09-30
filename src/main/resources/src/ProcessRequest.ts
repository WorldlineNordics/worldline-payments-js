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

export class ProcessRequest {
  public successFn: any;
  public errorFn: any;
  public timeout: number;
  protected encryptedPayload: string;
  protected endpoint: string;
  protected paymentMethodType: string;
  private PAYMENT_ENDPOINT_URL = {
    card: paymentConstants.cardPaymentApi,
    continueAuth: paymentConstants.continueAuthCardApi,
    eft: paymentConstants.eftApi,
    ewallet: paymentConstants.redirectApi,
    ibp: paymentConstants.redirectApi,
    initAuth: paymentConstants.initAuthCardApi
  };

  public onSuccess(success: any) {
    this.successFn = success;
    return this;
  }

  public onError(error: any) {
    this.errorFn = error;
    return this;
  }

  public setEncryptedPayload(encryptedPayload: string) {
    this.encryptedPayload = encryptedPayload;
    return this;
  }

  public setEndpoint(endpoint: string) {
    this.endpoint = endpoint;
    return this;
  }

  public setPaymentMethodType(paymentMethodType) {
    this.paymentMethodType = paymentMethodType;
    return this;
  }

  public sendPayment(data: any, method: string) {
    const endpointUrl = this.endpoint.concat(
      this.PAYMENT_ENDPOINT_URL[this.paymentMethodType]
    );
    data.encryptedPayload = this.encryptedPayload;
    this.sendData(endpointUrl, data, method);
  }

  protected sendData(endpointUrl: string, data: any, method: string) {
    const xhttp = new XMLHttpRequest();
    xhttp.open(method, endpointUrl, true);
    xhttp.timeout = 60000;
    xhttp.setRequestHeader("Content-type", "application/json");
    const worldlineRequest = this;
    xhttp.onload = function() {
      if (this.status >= 200 && this.status < 300) {
        state = PaymentRequestState.OK;
        worldlineRequest.successFn(JSON.parse(xhttp.response));
      } else if (this.status === 405) {
        state = PaymentRequestState.ERROR;
        worldlineRequest.errorFn({
          status: this.status,
          statusText: "Please verify the Worldline Device API URL"
        });
      } else {
        state = PaymentRequestState.ERROR;
        worldlineRequest.errorFn({
          status: this.status,
          statusText: xhttp.statusText
        });
      }
    };

    xhttp.onerror = function() {
      state = PaymentRequestState.ERROR;
      worldlineRequest.errorFn({
        status: this.status,
        statusText:
          xhttp.statusText === ""
            ? "Could not send transaction."
            : xhttp.statusText
      });
    };
    xhttp.ontimeout = function() {
      state = PaymentRequestState.ERROR;
      worldlineRequest.errorFn({
        status: this.status,
        statusText: xhttp.statusText
      });
    };

    state = PaymentRequestState.SENT;
    if (method === "POST") {
      xhttp.send(JSON.stringify(data));
    } else if (method === "GET") {
      xhttp.send();
    }
  }
}
