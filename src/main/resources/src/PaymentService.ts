import { paymentConstants } from './PaymentConstants';
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
  private timeout: number = 60000;
  private version: string = 'worldlinejs-1.1.0';

  constructor(deviceAPIObj: any) {
    this.encryptedPayload = deviceAPIObj.encryptedPayload;
    this.endpoint = this.getEndpoint(deviceAPIObj);
  }

  public setRequestTimeout(timeout: number) {
    if (timeout >= 2000) {
      this.timeout = timeout;
    }
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

  public getIbpPaymentMethods() {
    this.paymentMethodType = 'ibp';
    this.endpointUrl = this.endpoint.concat(paymentConstants.paymentMethodApi);
    return this;
  }

  public getEftPaymentMethods() {
    this.paymentMethodType = 'eft';
    this.endpointUrl = this.endpoint.concat(paymentConstants.paymentMethodApi);
    return this;
  }

  public getEWalletPaymentMethods() {
    this.paymentMethodType = 'ewallet';
    this.endpointUrl = this.endpoint.concat(paymentConstants.paymentMethodApi);
    return this;
  }

  public getRequestData() {
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
    this.data = this.getRequestData();
    const getRejectObject = (xhttp: XMLHttpRequest, text: string) => {
      return {
        status: xhttp.status,
        statusText: text
      };
    };
    return new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest();
      xhttp.open(this.method, this.endpointUrl, true);
      xhttp.timeout = this.timeout;
      const headers = {
        'Content-type': 'application/json',
        'X-JS-SDK-VERSION': this.version
      };
      for (const key in headers) {
        if (headers.hasOwnProperty(key)) {
          xhttp.setRequestHeader(key, headers[key]);
        }
      }

      xhttp.onload = () => {
        if (xhttp.status >= 200 && xhttp.status < 300) {
          resolve(JSON.parse(xhttp.response));
        } else {
          const text =
            xhttp.status === 405
              ? 'Please verify the Worldline Device API URL'
              : xhttp.statusText;
          reject(getRejectObject(xhttp, text));
        }
      };

      xhttp.onerror = () =>
        reject(
          getRejectObject(
            xhttp,
            xhttp.statusText === ''
              ? 'Could not send transaction.'
              : xhttp.statusText
          )
        );

      xhttp.ontimeout = () => reject(getRejectObject(xhttp, xhttp.statusText));

      if (this.method === 'POST') {
        xhttp.send(JSON.stringify(this.data));
      } else if (this.method === 'GET') {
        xhttp.send();
      }
    });
  }

  private getEndpoint(deviceAPIObj: any) {
    if (deviceAPIObj.deviceEndpoint) {
      const endpointEndsIndex = deviceAPIObj.deviceEndpoint.indexOf('/api');
      if (endpointEndsIndex !== -1) {
        return deviceAPIObj.deviceEndpoint.substring(0, endpointEndsIndex);
      }
    }
    return deviceAPIObj.deviceEndpoint;
  }
}