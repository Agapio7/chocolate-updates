import React, { useEffect, useRef, useState } from 'react';
import { generateEsewaSignature, createEsewaPaymentData, EsewaPaymentData } from '../utils/esewaSignature';
import { AlertCircle, ExternalLink, Copy, CheckCircle, CreditCard, Globe } from 'lucide-react';

interface EsewaPaymentProps {
  amount: number;
  onSuccess?: () => void;
  onFailure?: () => void;
}

const EsewaPayment: React.FC<EsewaPaymentProps> = ({ amount, onSuccess, onFailure }) => {
  const [showManualOptions, setShowManualOptions] = useState(true);
  const [copied, setCopied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'form' | 'url' | 'manual'>('form');

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

  // Create form data for manual submission
  const formData = {
    amount: paymentData.amount,
    tax_amount: paymentData.tax_amount,
    total_amount: paymentData.total_amount,
    transaction_uuid: paymentData.transaction_uuid,
    product_code: paymentData.product_code,
    product_service_charge: paymentData.product_service_charge,
    product_delivery_charge: paymentData.product_delivery_charge,
    success_url: paymentData.success_url,
    failure_url: paymentData.failure_url,
    signed_field_names: signed_field_names,
    signature: signature
  };

  const handleFormSubmit = () => {
    // Create a form dynamically and submit it
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://rc-epay.esewa.com.np/api/epay/main/v2/form';
    form.target = '_blank';

    Object.entries(formData).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value.toString();
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  const handleProductionSubmit = () => {
    // Create a form for production environment
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://epay.esewa.com.np/api/epay/main/v2/form';
    form.target = '_blank';

    Object.entries(formData).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value.toString();
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <div className="text-center mb-6">
          <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <CreditCard className="text-green-600" size={32} />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            eSewa Payment
          </h2>
          <p className="text-gray-600">
            Complete your payment securely through eSewa
          </p>
        </div>

        {/* Connection Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <AlertCircle className="text-blue-600 mr-2 mt-0.5" size={16} />
            <div className="text-sm">
              <p className="text-blue-800 font-medium mb-1">Payment Gateway Information</p>
              <p className="text-blue-700">
                Due to CORS restrictions, we'll open eSewa in a new tab for secure payment processing.
              </p>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Payment Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-medium text-green-600">Rs {paymentData.total_amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Transaction ID:</span>
              <div className="flex items-center">
                <span className="font-medium mr-2">{paymentData.transaction_uuid}</span>
                <button
                  onClick={() => copyToClipboard(paymentData.transaction_uuid)}
                  className="text-gray-400 hover:text-gray-600"
                  title="Copy Transaction ID"
                >
                  {copied ? <CheckCircle size={14} className="text-green-500" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Product Code:</span>
              <span className="font-medium">{paymentData.product_code}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Test Token:</span>
              <span className="font-medium text-green-600">123456</span>
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Choose Payment Method</h3>
          <div className="space-y-3">
            <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="paymentMethod"
                value="form"
                checked={paymentMethod === 'form'}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="mr-3"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900">eSewa UAT (Recommended)</div>
                <div className="text-sm text-gray-600">Testing environment with test credentials</div>
              </div>
            </label>

            <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="paymentMethod"
                value="url"
                checked={paymentMethod === 'url'}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="mr-3"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900">eSewa Production</div>
                <div className="text-sm text-gray-600">Live environment (requires real eSewa account)</div>
              </div>
            </label>

            <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="paymentMethod"
                value="manual"
                checked={paymentMethod === 'manual'}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="mr-3"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900">Manual Payment Details</div>
                <div className="text-sm text-gray-600">Copy payment details for manual processing</div>
              </div>
            </label>
          </div>
        </div>

        {/* Manual Payment Details */}
        {paymentMethod === 'manual' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-yellow-900 mb-3">Manual Payment Information</h4>
            <div className="text-sm space-y-2">
              <div><strong>eSewa ID:</strong> Use your eSewa account</div>
              <div><strong>Amount:</strong> Rs {paymentData.total_amount}</div>
              <div><strong>Reference:</strong> {paymentData.transaction_uuid}</div>
              <div><strong>Purpose:</strong> FOREVER Mitho Chocolate Purchase</div>
            </div>
            <p className="text-xs text-yellow-700 mt-3">
              After manual payment, please contact us with the transaction reference.
            </p>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-green-900 mb-2">Payment Instructions:</h4>
          <ol className="text-sm text-green-800 space-y-1">
            <li>1. Click the payment button below</li>
            <li>2. You'll be redirected to eSewa in a new tab</li>
            <li>3. Login with your eSewa credentials</li>
            <li>4. Enter verification token: <strong>123456</strong> (for UAT)</li>
            <li>5. Complete the payment process</li>
            <li>6. Return to this page and confirm payment</li>
          </ol>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {paymentMethod === 'form' && (
            <button
              onClick={handleFormSubmit}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <ExternalLink className="mr-2" size={18} />
              Pay with eSewa UAT - Rs {paymentData.total_amount}
            </button>
          )}

          {paymentMethod === 'url' && (
            <button
              onClick={handleProductionSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <Globe className="mr-2" size={18} />
              Pay with eSewa Production - Rs {paymentData.total_amount}
            </button>
          )}

          {paymentMethod === 'manual' && (
            <button
              onClick={() => {
                copyToClipboard(`Amount: Rs ${paymentData.total_amount}, Reference: ${paymentData.transaction_uuid}`);
                alert('Payment details copied! Please make manual payment and contact us.');
              }}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <Copy className="mr-2" size={18} />
              Copy Payment Details
            </button>
          )}

          <div className="flex space-x-3">
            <button
              onClick={onFailure}
              className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel Payment
            </button>
            <button
              onClick={onSuccess}
              className="flex-1 bg-amber-600 text-white py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors duration-200"
            >
              Payment Completed
            </button>
          </div>
        </div>

        {/* Support Information */}
        <div className="mt-6 pt-4 border-t text-center">
          <p className="text-xs text-gray-500 mb-2">
            Having trouble with payment?
          </p>
          <div className="text-xs text-gray-600 space-y-1">
            <p>Email: <strong>hello@forevermitho.com</strong></p>
            <p>Phone: <strong>982-8567365</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EsewaPayment;