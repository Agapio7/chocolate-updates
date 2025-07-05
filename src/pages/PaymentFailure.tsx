import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle, ArrowLeft, RefreshCw, Home } from 'lucide-react';

const PaymentFailure: React.FC = () => {
  const navigate = useNavigate();

  const handleTryAgain = () => {
    navigate('/shop');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleContactSupport = () => {
    navigate('/contact');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Failure Icon */}
        <div className="mb-6">
          <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Failed
          </h1>
          <p className="text-gray-600">
            We're sorry, but your payment could not be processed at this time.
          </p>
        </div>

        {/* Possible Reasons */}
        <div className="bg-red-50 rounded-lg p-4 mb-6 text-left">
          <h3 className="font-semibold text-gray-900 mb-3">Possible Reasons:</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Insufficient balance in your account</p>
            <p>• Network connectivity issues</p>
            <p>• Payment was cancelled by user</p>
            <p>• Technical issues with payment gateway</p>
          </div>
        </div>

        {/* What to do next */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">What can you do?</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>• Check your account balance and try again</p>
            <p>• Ensure stable internet connection</p>
            <p>• Try a different payment method</p>
            <p>• Contact our support team for assistance</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleTryAgain}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
          >
            <RefreshCw className="mr-2" size={20} />
            Try Again
          </button>
          
          <button
            onClick={handleContactSupport}
            className="w-full border-2 border-amber-600 text-amber-600 hover:bg-amber-50 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center"
          >
            Contact Support
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
          <p>Need immediate help?</p>
          <p>Email: <strong>hello@forevermitho.com</strong></p>
          <p>Phone: <strong>982-8567365</strong></p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;