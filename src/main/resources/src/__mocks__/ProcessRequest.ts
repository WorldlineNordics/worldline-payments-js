export class ProcessRequest {
  public sendPayment(endpoint: string, data: string, method: string) {
    return {
      status: 201,
      statusText: "success"
    };
  }
  public deviceAPIRequest(deviceAPIObj: string, worldlineSessionData: string) {
    if (worldlineSessionData) {
      return {
        encryptedPayload:
          "BgAAA-wdjkb0DYTHKakkOQSmhf87QmWdFFRKHnmcJ7gtfap0b4…mgeBBukLcu_62R9bommN6fanXhhjltfjGVQ9HzHCFk5dW_w==",
        endpoint: "http://localhost:9354",
        worldlineSessionData:
          "AThlkCHdnzydrj_2ambZsdCuVjzouINihWfLrWnz5TVeriGCsZ-zzj2dl7eAQbUtIfNLLWe24HRd8mk8X_zzwb7v0EEk="
      };
    } else {
      return {
        encryptedPayload:
          "BgAAA-wdjkb0DYTHKakkOQSmhf87QmWdFFRKHnmcJ7gtfap0b4…mgeBBukLcu_62R9bommN6fanXhhjltfjGVQ9HzHCFk5dW_w==",
        endpoint: "http://localhost:9354"
      };
    }
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
