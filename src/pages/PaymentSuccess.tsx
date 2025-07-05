import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowRight, Home, ShoppingBag } from 'lucide-react';
import { generateEsewaSignature } from '../utils/esewaSignature';

const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState<any>(null);
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  useEffect(() => {
    // Get the encoded data from URL parameters
    const encodedData = searchParams.get('data');
    
    if (encodedData) {
      try {
        // Decode the base64 data
        const decodedData = JSON.parse(atob(encodedData));
        setPaymentData(decodedData);
        
        // Verify the signature
        const expectedSignature = generateEsewaSignature(
          decodedData.total_amount,
          decodedData.transaction_uuid,
          decodedData.product_code
        );
        
        setIsVerified(expectedSignature === decodedData.signature);
      } catch (error) {
        console.error('Error decoding payment data:', error);
        setIsVerified(false);
      }
    } else {
      // If no data parameter, assume it's a direct success
      setIsVerified(true);
    }
  }, [searchParams]);

  const handleContinueShopping = () => {
    navigate('/shop');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600">
            Thank you for your order. Your payment has been processed successfully.
          </p>
        </div>

        {/* Payment Details */}
        {paymentData && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-3">Payment Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-medium">{paymentData.transaction_uuid}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">Rs {paymentData.total_amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium text-green-600">{paymentData.status}</span>
              </div>
              {paymentData.transaction_code && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Reference:</span>
                  <span className="font-medium">{paymentData.transaction_code}</span>
                </div>
              )}
            </div>
            
            {isVerified !== null && (
              <div className="mt-3 pt-3 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">Verification:</span>
                  <span className={`text-sm font-medium ${isVerified ? 'text-green-600' : 'text-red-600'}`}>
                    {isVerified ? '✓ Verified' : '✗ Failed'}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Next Steps */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">What's Next?</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>• You will receive a confirmation email shortly</p>
            <p>• Your order will be processed within 24 hours</p>
            <p>• Delivery will be arranged through our partner network</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleContinueShopping}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
          >
            <ShoppingBag className="mr-2" size={20} />
            Continue Shopping
            <ArrowRight className="ml-2" size={20} />
          </button>
          
          <button
            onClick={handleGoHome}
            className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center"
          >
            <Home className="mr-2" size={20} />
            Go to Home
          </button>
        </div>

        {/* Support */}
        <div className="mt-6 pt-6 border-t text-xs text-gray-500">
          <p>Need help? Contact us at <strong>hello@forevermitho.com</strong></p>
          <p>or call <strong>982-8567365</strong></p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;