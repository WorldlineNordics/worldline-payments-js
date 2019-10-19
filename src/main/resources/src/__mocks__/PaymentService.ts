export class PaymentService {
  public method: string;
  private data: any;
  private endpointUrl: string;
  private cardHolderName: string = 'John';
  private cardNumber: string = '4444333322221111';
  private expDateMonth: number = 11;
  private expDateYear: number = 2020;
  private cvCode: number = 123;
  private version: string = 'worldlinejs-1.1.0';

  public getEndpoint(deviceAPIObj: any) {
    if (deviceAPIObj.deviceEndpoint) {
      const endpointEndsIndex = deviceAPIObj.deviceEndpoint.indexOf('/api');
      if (endpointEndsIndex !== -1) {
        return deviceAPIObj.deviceEndpoint.substring(0, endpointEndsIndex);
      }
    }
    return deviceAPIObj.deviceEndpoint;
  }

  public getRequestData() {
    const data = {
      cardHolderName: this.cardHolderName,
      cardNumber: this.cardNumber,
      cvCode: this.cvCode,
      encryptedPayload:
        'BgAAA-wdjkb0rDBjsl_bx46s0RLrrlv9-N738QWCE0YezPC9cUAJfVmSunJQyP7lrOcnSbb8nJcMIXHYEHwMSz9g2kX3SxCuOpnGJeiiFC97jgpzsWjW-71lLAlyqb2jQh_SWNZzaLqsRqjeSAe6wWaat6y66ljFGEeuqqBczCRIY84V7YXiibunYH6xkhE8SN5wPUB2KNpGSeNI2gZT2n1wvOaMXXsl3ZugpW90E2xloVRZclzBsLnSgU0suvy0N2aFfv_BRlBMTHEJ7cqnVMK-z18msaRCmaLCemTQSuiAyqe7hyVzLw_h5Uw6f_Bt8rKQB9gcDfiHiUZICQ16CZeVUZogpQRVA4F6GZiIO77GEkxX9IDDPO4-76pSYcfVKaSIm6LrzgudHz1DCE6Ier1zBB2X4w84btAmZWlfqQM-_yab-HMy7M547iOzYenq85vVaMsLDDSYFND7U6CCVfVxD6lKe_PMXXuNGkb4k7XKc8qlFYTkhD3tHXagFwIeVDYxT8qWZ6-vdnjHuEtcATn77cEl55p9XmcRjELrdFGKP33IQpoPzri7ATLNM8HDx7lbINTpP6vAWmmjg2cvGqtpuSau6xWqjo7tE7qL7imI90Ud3zHFUqgPCe_5-E8ynWud5FOrLrEb6W3YL4y6IFndAFC2fsiV9q6dAi6zzuxLTpZbAydG9r4GvGk_sZNWZuhcFLCLbAnAnPrjBykMoTAByDs88VZ0D7bBjebtAslRREZoJg64QIJ_4IAvg86qeL7LSCZa_-y3CCaxQ5dT-EoZSo_uTGPFiYFVoY4c-DLNcQ2rzE0c3Ix_kBIU0WhCHfmksOrE7EuKIcbH26H4-MXyUNzfbPGKXK91GNQTj-heOcWicbuu9KD0fYTgFbhxQN_kfJ4HdUZC',
      expDateMonth: this.expDateMonth,
      expDateYear: this.expDateYear
    };
    return data;
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

  public send() {
    this.endpointUrl =
      'http://wp121dapp020.dc12.digitalriverws.net:9354/api/v1/payments/';
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
      xhttp.timeout = 60000;
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
        } else if (xhttp.status === 405) {
          reject(
            getRejectObject(xhttp, 'Please verify the Worldline Device API URL')
          );
        } else {
          reject(getRejectObject(xhttp, xhttp.statusText));
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
}
