import axios from "axios"

export default class PaymentClient {
  private static instance: PaymentClient

  private constructor() {
    // EMPTY
  }

  public static getInstance(): PaymentClient {
    if (!PaymentClient.instance) {
      PaymentClient.instance = new PaymentClient()
    }

    return PaymentClient.instance
  }

  async post<T>(
    url: string,
    body?: Record<string, any>,
    options?: Record<string, any>
  ): Promise<T> {
    return (
      await axios.post(url, body, {
        headers: {
          Authorization: "",
        },
        params: {
          ...(options != null ? options : {}),
        },
      })
    ).data as T
  }
}
