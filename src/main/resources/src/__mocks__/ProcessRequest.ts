export class ProcessRequest {
  public sendPayment(endpoint: string, data: string, method: string) {
    return {
      status: 201,
      statusText: "success"
    };
  }
}
