import { 
    AbstractPaymentProcessor, 
    PaymentProcessorContext, 
    PaymentProcessorError, 
    PaymentProcessorSessionResponse, 
    PaymentSessionStatus,
  } from "@medusajs/medusa"
import { PaymentProcessorError } from "../interfaces/PaymentProcessorError"

  const mercadopago = require("mercadopago");

    
  
  class MercadoPagoService extends AbstractPaymentProcessor {

    constructor(container, options) {
      super(container)
      this.apikey = options.apikey
      this.secretkey = options.secretkey
      // you can access options here
    }

    identifier = "mercado-pago"

  
    async capturePayment(
      paymentSessionData: Record<string, unknown>
    ): Promise<Record<string, unknown> | PaymentProcessorError> {
      throw new Error("Method not implemented.")
    }
    async authorizePayment(
      paymentSessionData: Record<string, unknown>, 
      context: Record<string, unknown>
    ): Promise<
      PaymentProcessorError | 
      { 
        status: PaymentSessionStatus; 
        data: Record<string, unknown>; 
      }
    > {
      throw new Error("Method not implemented.")
    }
    async cancelPayment(
      paymentSessionData: Record<string, unknown>
    ): Promise<Record<string, unknown> | PaymentProcessorError> {
      throw new Error("Method not implemented.")
    }
    async initiatePayment(
      context: PaymentProcessorContext
    ): Promise<
      PaymentProcessorError | PaymentProcessorSessionResponse
    > {

      mercadopago.configure({
        access_token: process.env.MERCADO_PAGO_TOKEN,
      });
  
      // Crea un objeto de preferencia
      console.log(context);

      let itemhard = {
        title: "producto",
        quantity: 1,
        currency_id: "ARS",
        unit_price: 999,
      };

      let preference = {
        //titulo, valor, moneda
        items: itemhard,
        // back_urls: {
        //   success: `${baseUrl}/sales/processing/${saleId}/success`,
        //   failure: `${baseUrl}/sales/processing/${saleId}/failure`,
        //   pending: `${baseUrl}/sales/processing/${saleId}/pending`,
        // },
      }
  
      const mercadoId = await mercadopago.preferences
        .create(preference)
        .then(function (response: any) {
          console.log(response.body);
          return response.body.id;
        })
        .catch(function (error: any) {
          console.log(error);
        });

      throw new Error("Method not implemented.")
    }



    async deletePayment(
      paymentSessionData: Record<string, unknown>
    ): Promise<Record<string, unknown> | PaymentProcessorError> {
      throw new Error("Method not implemented.")
    }
    async getPaymentStatus(
      paymentSessionData: Record<string, unknown>
    ): Promise<PaymentSessionStatus> {


      const order = (await this.retrievePayment(
        paymentSessionData
      )) as any
  
      switch (order.status) {
        case "success":
          return PaymentSessionStatus.AUTHORIZED;
        case "pending":
          return PaymentSessionStatus.PENDING;
        case "failure":
          return PaymentSessionStatus.CANCELED
        default:
          return PaymentSessionStatus.PENDING
      }
    }
    async refundPayment(
      paymentSessionData: Record<string, unknown>, 
      refundAmount: number
    ): Promise<Record<string, unknown> | PaymentProcessorError> {
      throw new Error("Method not implemented.")
    }
    async retrievePayment(
      paymentSessionData: Record<string, unknown>
    ): Promise<Record<string, unknown> | PaymentProcessorError> {
      throw new Error("Method not implemented.")
    }
    async updatePayment(
      context: PaymentProcessorContext
    ): Promise<
      void | 
      PaymentProcessorError | 
      PaymentProcessorSessionResponse
    > {
      throw new Error("Method not implemented.")
    }








    
  }
  
  export default MyPaymentProcessor