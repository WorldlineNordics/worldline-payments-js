export class ProcessRequest {
  sendPayment(endpoint: string, data: string, method: string) {
    return {
      status: 201,
      statusText: "success"
    };
  }
}
