import React, { useEffect, useRef } from 'react';
import { generateEsewaSignature, createEsewaPaymentData, EsewaPaymentData } from '../utils/esewaSignature';

interface EsewaPaymentProps {
  amount: number;
  onSuccess?: () => void;
  onFailure?: () => void;
}

const EsewaPayment: React.FC<EsewaPaymentProps> = ({ amount, onSuccess, onFailure }) => {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Auto-submit the form when component mounts
    if (formRef.current) {
      formRef.current.submit();
    }
  }, []);

  const paymentData: EsewaPaymentData = createEsewaPaymentData(amount);
  const signature = generateEsewaSignature(
    paymentData.total_amount,
    paymentData.transaction_uuid,
    paymentData.product_code
  );

  const signed_field_names = 'total_amount,transaction_uuid,product_code';

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="mb-6">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <h2 className="text-xl font-semibold text-gray-900 mt-4">
            Redirecting to eSewa...
          </h2>
          <p className="text-gray-600 mt-2">
            Please wait while we redirect you to eSewa for secure payment.
          </p>
        </div>

        {/* Hidden form that auto-submits to eSewa */}
        <form
          ref={formRef}
          action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
          method="POST"
          style={{ display: 'none' }}
        >
          <input type="hidden" name="amount" value={paymentData.amount} />
          <input type="hidden" name="tax_amount" value={paymentData.tax_amount} />
          <input type="hidden" name="total_amount" value={paymentData.total_amount} />
          <input type="hidden" name="transaction_uuid" value={paymentData.transaction_uuid} />
          <input type="hidden" name="product_code" value={paymentData.product_code} />
          <input type="hidden" name="product_service_charge" value={paymentData.product_service_charge} />
          <input type="hidden" name="product_delivery_charge" value={paymentData.product_delivery_charge} />
          <input type="hidden" name="success_url" value={paymentData.success_url} />
          <input type="hidden" name="failure_url" value={paymentData.failure_url} />
          <input type="hidden" name="signed_field_names" value={signed_field_names} />
          <input type="hidden" name="signature" value={signature} />
        </form>

        <div className="text-sm text-gray-500 mt-4">
          <p>Amount: Rs {paymentData.total_amount}</p>
          <p>Transaction ID: {paymentData.transaction_uuid}</p>
        </div>
      </div>
    </div>
  );
};

export default EsewaPayment;