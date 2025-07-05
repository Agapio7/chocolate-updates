import React, { useEffect, useRef, useState } from 'react';
import { generateEsewaSignature, createEsewaPaymentData, EsewaPaymentData } from '../utils/esewaSignature';
import { AlertCircle, ExternalLink, Copy, CheckCircle } from 'lucide-react';

interface EsewaPaymentProps {
  amount: number;
  onSuccess?: () => void;
  onFailure?: () => void;
}

const EsewaPayment: React.FC<EsewaPaymentProps> = ({ amount, onSuccess, onFailure }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [showManualForm, setShowManualForm] = useState(false);
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Try auto-submit first, but show manual option after 10 seconds
    const timer = setTimeout(() => {
      setShowManualForm(true);
    }, 10000);

    const countdownTimer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Try to auto-submit the form
    if (formRef.current) {
      try {
        formRef.current.submit();
      } catch (error) {
        console.error('Auto-submit failed:', error);
        setShowManualForm(true);
      }
    }

    return () => {
      clearTimeout(timer);
      clearInterval(countdownTimer);
    };
  }, []);

  const paymentData: EsewaPaymentData = createEsewaPaymentData(amount);
  const signature = generateEsewaSignature(
    paymentData.total_amount,
    paymentData.transaction_uuid,
    paymentData.product_code
  );

  const signed_field_names = 'total_amount,transaction_uuid,product_code';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const esewaUrl = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
  const productionUrl = "https://epay.esewa.com.np/api/epay/main/v2/form";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        {!showManualForm ? (
          <div className="text-center">
            <div className="mb-6">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
              <h2 className="text-xl font-semibold text-gray-900 mt-4">
                Redirecting to eSewa...
              </h2>
              <p className="text-gray-600 mt-2">
                Please wait while we redirect you to eSewa for secure payment.
              </p>
              {countdown > 0 && (
                <p className="text-sm text-gray-500 mt-2">
                  Manual option available in {countdown} seconds
                </p>
              )}
            </div>

            <div className="text-sm text-gray-500">
              <p>Amount: Rs {paymentData.total_amount}</p>
              <p>Transaction ID: {paymentData.transaction_uuid}</p>
            </div>

            <button
              onClick={() => setShowManualForm(true)}
              className="mt-4 text-green-600 hover:text-green-700 text-sm underline"
            >
              Having trouble? Click here for manual payment
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center mb-4">
              <AlertCircle className="text-amber-500 mr-2" size={20} />
              <h2 className="text-lg font-semibold text-gray-900">
                Manual eSewa Payment
              </h2>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-amber-800 mb-2">
                <strong>Connection Issue:</strong> Unable to automatically redirect to eSewa.
              </p>
              <p className="text-sm text-amber-700">
                Please use one of the manual options below to complete your payment.
              </p>
            </div>

            {/* Manual Form Option */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Option 1: Manual Form Submission</h3>
              <form
                ref={formRef}
                action={esewaUrl}
                method="POST"
                target="_blank"
                className="space-y-3"
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
                
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
                >
                  <ExternalLink className="mr-2" size={18} />
                  Open eSewa Payment (New Tab)
                </button>
              </form>
            </div>

            {/* Direct Link Option */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Option 2: Direct eSewa Link</h3>
              <div className="space-y-2">
                <a
                  href={esewaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200 text-center"
                >
                  Open eSewa UAT Environment
                </a>
                <a
                  href={productionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200 text-center"
                >
                  Open eSewa Production
                </a>
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Payment Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium">Rs {paymentData.total_amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID:</span>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">{paymentData.transaction_uuid}</span>
                    <button
                      onClick={() => copyToClipboard(paymentData.transaction_uuid)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Product Code:</span>
                  <span className="font-medium">{paymentData.product_code}</span>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-900 mb-2">Payment Instructions:</h4>
              <ol className="text-sm text-blue-800 space-y-1">
                <li>1. Click one of the payment buttons above</li>
                <li>2. Login to your eSewa account</li>
                <li>3. Enter verification token: <strong>123456</strong> (for testing)</li>
                <li>4. Complete the payment</li>
                <li>5. You'll be redirected back automatically</li>
              </ol>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={onFailure}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={onSuccess}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
              >
                I've Completed Payment
              </button>
            </div>
          </div>
        )}

        {/* Hidden auto-submit form */}
        <form
          ref={formRef}
          action={esewaUrl}
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
      </div>
    </div>
  );
};

export default EsewaPayment;