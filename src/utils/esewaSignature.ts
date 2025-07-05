import CryptoJS from 'crypto-js';

export interface EsewaPaymentData {
  amount: number;
  tax_amount: number;
  total_amount: number;
  transaction_uuid: string;
  product_code: string;
  product_service_charge: number;
  product_delivery_charge: number;
  success_url: string;
  failure_url: string;
}

export const generateEsewaSignature = (
  total_amount: number,
  transaction_uuid: string,
  product_code: string
): string => {
  const secret_key = '8gBm/:&EnhH.1/q'; // UAT Secret Key
  const message = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
  
  const hash = CryptoJS.HmacSHA256(message, secret_key);
  const signature = CryptoJS.enc.Base64.stringify(hash);
  
  return signature;
};

export const generateTransactionUUID = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `${timestamp}-${random}`;
};

export const createEsewaPaymentData = (cartTotal: number): EsewaPaymentData => {
  const amount = cartTotal;
  const tax_amount = 0; // No tax for now
  const product_service_charge = 0;
  const product_delivery_charge = 0;
  const total_amount = amount + tax_amount + product_service_charge + product_delivery_charge;
  const transaction_uuid = generateTransactionUUID();
  const product_code = 'EPAYTEST'; // Use test product code
  
  const success_url = `${window.location.origin}/payment/success`;
  const failure_url = `${window.location.origin}/payment/failure`;
  
  return {
    amount,
    tax_amount,
    total_amount,
    transaction_uuid,
    product_code,
    product_service_charge,
    product_delivery_charge,
    success_url,
    failure_url
  };
};