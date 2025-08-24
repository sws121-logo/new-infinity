import React, { useState } from 'react';
import { X, Calendar, Users, CreditCard, Check } from 'lucide-react';
import { useApp, Room, PartyHall } from '../../contexts/AppContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Room | PartyHall | null;
  type: 'room' | 'hall';
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, item, type }) => {
  const { addBooking } = useApp();
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
  });

  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  if (!isOpen || !item) return null;

  const calculateTotal = () => {
    if (!formData.checkIn || !formData.checkOut) return item.price;
    
    const checkIn = new Date(formData.checkIn);
    const checkOut = new Date(formData.checkOut);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    
    return type === 'room' ? item.price * (nights || 1) : item.price;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'details') {
      setStep('payment');
    }
  };

  const handlePayment = () => {
    setPaymentStatus('processing');
    
    // Simulate Razorpay payment with real-time processing
    setTimeout(() => {
      const booking = {
        customerName: formData.customerName,
        email: formData.email,
        phone: formData.phone,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut || formData.checkIn,
        [type === 'room' ? 'roomId' : 'hallId']: item.id,
        type,
        guests: formData.guests,
        totalAmount: calculateTotal(),
        status: 'confirmed' as const,
        paymentStatus: 'completed' as const,
        paymentId: 'pay_' + Date.now().toString(),
      };
      
      addBooking(booking);
      setPaymentStatus('success');
      setStep('success');
    }, 1500);
  };

  const handleClose = () => {
    setStep('details');
    setPaymentStatus('idle');
    setFormData({
      customerName: '',
      email: '',
      phone: '',
      checkIn: '',
      checkOut: '',
      guests: 1,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 rounded-t-xl">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">
              {step === 'details' && `Book ${item.name}`}
              {step === 'payment' && 'Payment'}
              {step === 'success' && 'Booking Confirmed!'}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {step === 'details' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {type === 'room' ? 'Check In' : 'Event Date'}
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.checkIn}
                    onChange={(e) => setFormData(prev => ({ ...prev, checkIn: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                {type === 'room' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check Out
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.checkOut}
                      onChange={(e) => setFormData(prev => ({ ...prev, checkOut: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Guests
                </label>
                <input
                  type="number"
                  min="1"
                  max={item.capacity}
                  value={formData.guests}
                  onChange={(e) => setFormData(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total Amount:</span>
                  <span className="text-blue-600">₹{calculateTotal()}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Proceed to Payment
              </button>
            </form>
          )}

          {step === 'payment' && (
            <div className="text-center space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">{formData.customerName}</p>
                <div className="text-2xl font-bold text-blue-600">₹{calculateTotal()}</div>
              </div>

              <div className="space-y-4">
                <div className="text-left">
                  <h4 className="font-semibold mb-2">Payment via Razorpay</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    You will be redirected to Razorpay for secure payment processing.
                  </p>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={paymentStatus === 'processing'}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center ${
                    paymentStatus === 'processing'
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white'
                  }`}
                >
                  {paymentStatus === 'processing' ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5 mr-2" />
                      Pay with Razorpay
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Booking Confirmed!</h3>
                <p className="text-gray-600">
                  Your booking has been successfully confirmed. You will receive a confirmation email shortly.
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg text-left">
                <h4 className="font-semibold mb-2">Booking Details:</h4>
                <div className="space-y-1 text-sm">
                  <p><strong>Name:</strong> {formData.customerName}</p>
                  <p><strong>{type === 'room' ? 'Room' : 'Hall'}:</strong> {item.name}</p>
                  <p><strong>Date:</strong> {formData.checkIn}</p>
                  <p><strong>Guests:</strong> {formData.guests}</p>
                  <p><strong>Total:</strong> ₹{calculateTotal()}</p>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg font-semibold transition-all duration-200"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;