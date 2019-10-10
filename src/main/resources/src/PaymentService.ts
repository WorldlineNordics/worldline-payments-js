import { paymentConstants } from './PaymentConstants';
const PaymentRequestState = {
  ERROR: 4,
  NEW: 1,
  OK: 3,
  SENT: 2,
  properties: {
    1: { name: 'NEW', value: 1 },
    2: { name: 'SENT', value: 2 },
    3: { name: 'OK', value: 3 },
    4: { name: 'ERROR', value: 4 }
  }
};

export class PaymentService {
  private cardHolderName: string;
  private cardNumber: string;
  private endpointUrl: string;
  private expDateMonth: number;
  private expDateYear: number;
  private cvCode: number;
  private data: any;
  private method: string = 'POST';
  private paymentMethodId: string;
  private encryptedPayload: string;
  private endpoint: string;
  private paymentMethodType: string;
  private worldlineSessionData: string;

  constructor(deviceAPIObj) {
    this.encryptedPayload = deviceAPIObj.encryptedPayload;
    this.endpoint = deviceAPIObj.deviceEndpoint;
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

  public chdForm(document: Document, tag: string) {
    const chdElements = document.querySelectorAll('[' + tag + ']');
    const chd = {};
    chdElements.forEach(x => {
      chd[x.attributes['data-chd'].nodeValue] = (x as HTMLInputElement).value;
    });
    this.cardHolderName = chd['cardHolderName'];
    this.cardNumber = chd['cardNumber'];
    this.expDateMonth = chd['cardExpiryMonth'];
    this.expDateYear = chd['cardExpiryYear'];
    this.cvCode = chd['cardCVC'];
    return this;
  }

  public paymentForm(document: Document, tag: string) {
    const el = document.querySelector('[' + tag + ']');
    this.paymentMethodId = (el as HTMLInputElement).value;
    return this;
  }

  public getPaymentMethods(paymentMethodType) {
    this.paymentMethodType = paymentMethodType;
    this.endpointUrl = this.endpoint.concat(paymentConstants.paymentMethodApi);
    return this;
  }
  public buildRequest() {
    const data = {
      cardHolderName: this.cardHolderName,
      cardNumber: this.cardNumber,
      cvCode: this.cvCode,
      encryptedPayload: this.encryptedPayload,
      expDateMonth: this.expDateMonth,
      expDateYear: this.expDateYear,
      paymentMethodId: this.paymentMethodId,
      paymentMethodType: this.paymentMethodType,
      worldlineSessionData: this.worldlineSessionData
    };
    return data;
  }

  public send() {
    let state = PaymentRequestState.NEW;
    this.data = this.buildRequest();
    return new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest();
      xhttp.open(this.method, this.endpointUrl, true);
      xhttp.timeout = 60000;
      xhttp.setRequestHeader('Content-type', 'application/json');
      xhttp.onload = () => {
        if (xhttp.status >= 200 && xhttp.status < 300) {
          state = PaymentRequestState.OK;
          resolve(JSON.parse(xhttp.response));
        } else if (xhttp.status === 405) {
          state = PaymentRequestState.ERROR;
          reject({
            status: xhttp.status,
            statusText: 'Please verify the Worldline Device API URL'
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
            xhttp.statusText === ''
              ? 'Could not send transaction.'
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
      if (this.method === 'POST') {
        xhttp.send(JSON.stringify(this.data));
      } else if (this.method === 'GET') {
        xhttp.send();
      }
    });
  }
}
