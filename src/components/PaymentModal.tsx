import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Building, Wallet, AlertTriangle } from 'lucide-react';
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
    { 
      id: 'esewa', 
      name: 'eSewa', 
      icon: <Wallet className="w-6 h-6" />, 
      color: 'bg-green-600',
      status: 'available',
      note: 'Secure digital wallet payment'
    },
    { 
      id: 'khalti', 
      name: 'Khalti', 
      icon: <Smartphone className="w-6 h-6" />, 
      color: 'bg-purple-600',
      status: 'coming-soon',
      note: 'Digital payment solution'
    },
    { 
      id: 'connectips', 
      name: 'ConnectIPS', 
      icon: <CreditCard className="w-6 h-6" />, 
      color: 'bg-blue-600',
      status: 'coming-soon',
      note: 'Bank card payment gateway'
    },
    { 
      id: 'imepay', 
      name: 'IME Pay', 
      icon: <Smartphone className="w-6 h-6" />, 
      color: 'bg-red-600',
      status: 'coming-soon',
      note: 'Mobile payment service'
    }
  ];

  const otherPaymentMethods = [
    { 
      id: 'fonepay', 
      name: 'FonePay', 
      icon: <Smartphone className="w-6 h-6" />, 
      color: 'bg-orange-600',
      status: 'coming-soon',
      note: 'Mobile banking solution'
    },
    { 
      id: 'bank-transfer', 
      name: 'Bank Transfer', 
      icon: <Building className="w-6 h-6" />, 
      color: 'bg-gray-600',
      status: 'coming-soon',
      note: 'Direct bank account transfer'
    },
    { 
      id: 'other', 
      name: 'Cash on Delivery', 
      icon: <CreditCard className="w-6 h-6" />, 
      color: 'bg-gray-500',
      status: 'coming-soon',
      note: 'Pay when you receive'
    }
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
      alert(`${selectedMethod.charAt(0).toUpperCase() + selectedMethod.slice(1)} integration coming soon! Please use eSewa for now.`);
    }
  };

  if (!isOpen) return null;

  if (showEsewaPayment) {
    return (
      <div className="fixed inset-0 z-50 bg-white">
        <EsewaPayment
          amount={total}
          onSuccess={() => {
            setShowEsewaPayment(false);
            onPaymentComplete();
          }}
          onFailure={() => {
            setShowEsewaPayment(false);
            alert('Payment cancelled. Please try again.');
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

            {/* Connection Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertTriangle className="text-blue-600 mr-2 mt-0.5" size={16} />
                <div className="text-sm">
                  <p className="text-blue-800 font-medium mb-1">Payment Gateway Notice</p>
                  <p className="text-blue-700">
                    If automatic redirect fails, manual payment options will be provided.
                  </p>
                </div>
              </div>
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
                    } ${method.status === 'coming-soon' ? 'opacity-75' : ''}`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={selectedMethod === method.id}
                      onChange={(e) => setSelectedMethod(e.target.value)}
                      className="sr-only"
                      disabled={method.status === 'coming-soon'}
                    />
                    <div className={`${method.color} text-white p-2 rounded-lg mr-3`}>
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-900">{method.name}</span>
                        {method.status === 'available' && (
                          <div className="text-xs text-green-600 font-medium bg-green-100 px-2 py-1 rounded">
                            ✓ Available
                          </div>
                        )}
                        {method.status === 'coming-soon' && (
                          <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            Coming Soon
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-gray-600">{method.note}</p>
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
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 opacity-75 ${
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
                      disabled={true}
                    />
                    <div className={`${method.color} text-white p-2 rounded-lg mr-3`}>
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-900">{method.name}</span>
                        <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          Coming Soon
                        </div>
                      </div>
                      <p className="text-xs text-gray-600">{method.note}</p>
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
              disabled={!selectedMethod || selectedMethod !== 'esewa'}
              className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 text-white py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:transform-none"
            >
              {selectedMethod === 'esewa' ? `Pay with eSewa - Rs ${total.toFixed(2)}` : 
               selectedMethod ? 'Coming Soon' : `Select Payment Method`}
            </button>

            <div className="text-xs text-gray-500 text-center space-y-1">
              <p>Your payment is secured with industry-standard encryption</p>
              {selectedMethod === 'esewa' && (
                <p className="text-green-600 font-medium">
                  ✓ eSewa integration active - Secure payment gateway
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