const PaymentRequestState = {
  ERROR: 4,
  NEW: 1,
  OK: 3,
  SENT: 2
};
let state = PaymentRequestState.NEW;
export class ProcessRequest {
  public successFn: any;
  public errorFn: any;
  public timeout: number;

  public onSuccess(success: any) {
    this.successFn = success;
    return this;
  }

  public onError(error: any) {
    this.errorFn = error;
    return this;
  }

  public sendData(endpointUrl: string, data: any, method: string) {
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
      xhttp.send(data);
    } else if (method === "GET") {
      xhttp.send();
    }
  }
}
