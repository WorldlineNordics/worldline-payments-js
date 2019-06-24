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
  public encryptedPayload: string;
  public endpoint: string;

  public onSuccess(success: any) {
    this.successFn = success;
    return this;
  }

  public onError(error: any) {
    this.errorFn = error;
    return this;
  }

  public deviceAPIRequest(deviceAPIObj) {
    this.encryptedPayload = deviceAPIObj.encryptedPayload;
    this.endpoint = deviceAPIObj.deviceEndpoint;
    return this;
  }

  public sendPayment(endpoint: string, data: string, method: string) {
    const xhttp = new XMLHttpRequest();
    xhttp.open(method, endpoint, true);
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
      xhttp.send(data);
    } else if (method === "GET") {
      xhttp.send();
    }
  }
}
