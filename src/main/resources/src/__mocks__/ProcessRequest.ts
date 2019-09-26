export class ProcessRequest {
  public sendPayment(endpoint: string, data: string, method: string) {
    return {
      status: 201,
      statusText: "success"
    };
  }

  public setPaymentMethodType(paymentMethodType: string) {
    return {
      card: "/api/v1/payments",
      continueAuth: "/api/v1/continueauthentication",
      eft: "/api/v1/eftpayments",
      ewallet: "/api/v1/redirectpayments",
      ibp: "/api/v1/redirectpayments",
      initAuth: "/api/v1/initauthentication"
    }[paymentMethodType];
  }
}
