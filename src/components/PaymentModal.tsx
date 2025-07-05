import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Building, Wallet } from 'lucide-react';
import EsewaPayment from './EsewaPayment';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  onPaymentComplete: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, total, onPaymentComplete }) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [showEsewaPayment, setShowEsewaPayment] = useState(false);

  const onlinePaymentMethods = [
    { id: 'esewa', name: 'eSewa', icon: <Wallet className="w-6 h-6" />, color: 'bg-green-600' },
    { id: 'khalti', name: 'Khalti', icon: <Smartphone className="w-6 h-6" />, color: 'bg-purple-600' },
    { id: 'connectips', name: 'ConnectIPS', icon: <CreditCard className="w-6 h-6" />, color: 'bg-blue-600' },
    { id: 'imepay', name: 'IME Pay', icon: <Smartphone className="w-6 h-6" />, color: 'bg-red-600' }
  ];

  const otherPaymentMethods = [
    { id: 'fonepay', name: 'FonePay', icon: <Smartphone className="w-6 h-6" />, color: 'bg-orange-600' },
    { id: 'bank-transfer', name: 'Bank Transfer', icon: <Building className="w-6 h-6" />, color: 'bg-gray-600' },
    { id: 'other', name: 'Other', icon: <CreditCard className="w-6 h-6" />, color: 'bg-gray-500' }
  ];

  const handlePayment = () => {
    if (!selectedMethod) {
      alert('Please select a payment method');
      return;
    }

    if (selectedMethod === 'esewa') {
      setShowEsewaPayment(true);
    } else {
      // For other payment methods, show coming soon message
      alert(`${selectedMethod} integration coming soon! Please use eSewa for now.`);
    }
  };

  if (!isOpen) return null;

  if (showEsewaPayment) {
    return (
      <div className="fixed inset-0 z-50 bg-white">
        <EsewaPayment
          amount={total}
          onSuccess={onPaymentComplete}
          onFailure={() => {
            setShowEsewaPayment(false);
            alert('Payment failed. Please try again.');
          }}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      <div className="absolute inset-x-4 top-1/2 transform -translate-y-1/2 max-w-md mx-auto bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">
              Payment Method
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Amount */}
            <div className="bg-amber-50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Total Amount</p>
              <p className="text-3xl font-bold text-amber-900">Rs {total.toFixed(2)}</p>
            </div>

            {/* Step 1 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Step 1: Payment Method
              </h3>
              <p className="text-gray-600 mb-4">
                Select your preferred payment method to proceed with your payment.
              </p>
            </div>

            {/* Online Payment Options */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                Select an online payment option
              </h4>
              <div className="space-y-3">
                {onlinePaymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedMethod === method.id
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={selectedMethod === method.id}
                      onChange={(e) => setSelectedMethod(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`${method.color} text-white p-2 rounded-lg mr-3`}>
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-900">{method.name}</span>
                      {method.id === 'esewa' && (
                        <div className="text-xs text-green-600 font-medium">✓ Available</div>
                      )}
                      {method.id !== 'esewa' && (
                        <div className="text-xs text-gray-500">Coming Soon</div>
                      )}
                    </div>
                    <div className={`ml-auto w-4 h-4 rounded-full border-2 ${
                      selectedMethod === method.id
                        ? 'border-amber-500 bg-amber-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedMethod === method.id && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Other Payment Options */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                Other payment options
              </h4>
              <div className="space-y-3">
                {otherPaymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedMethod === method.id
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={selectedMethod === method.id}
                      onChange={(e) => setSelectedMethod(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`${method.color} text-white p-2 rounded-lg mr-3`}>
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-900">{method.name}</span>
                      <div className="text-xs text-gray-500">Coming Soon</div>
                    </div>
                    <div className={`ml-auto w-4 h-4 rounded-full border-2 ${
                      selectedMethod === method.id
                        ? 'border-amber-500 bg-amber-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedMethod === method.id && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Button */}
            <button
              onClick={handlePayment}
              disabled={!selectedMethod}
              className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 text-white py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:transform-none"
            >
              {selectedMethod === 'esewa' ? `Pay with eSewa - Rs ${total.toFixed(2)}` : `Pay Rs ${total.toFixed(2)}`}
            </button>

            <div className="text-xs text-gray-500 text-center space-y-1">
              <p>Your payment is secured with industry-standard encryption</p>
              {selectedMethod === 'esewa' && (
                <p className="text-green-600 font-medium">
                  ✓ eSewa integration active - You will be redirected to eSewa for secure payment
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;