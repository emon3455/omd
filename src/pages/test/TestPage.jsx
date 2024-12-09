import React, { useState } from 'react';
import { useChargeCreditCardMutation } from '../../redux/features/payment/paymentApiSlice';

const TestPage = () => {
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState(''); // Format MMYY
  const [cardCode, setCardCode] = useState('');
  const [message, setMessage] = useState('');

  // Get the mutation hook from redux
  const [chargeCreditCard, { isLoading, error, data }] = useChargeCreditCardMutation();

  const handlePayment = async (e) => {
    e.preventDefault();

    // Dispatch the payment request through redux
    try {
      const response = await chargeCreditCard({
        amount,
        cardNumber,
        expirationDate,
        cardCode,
      }).unwrap(); // unwrap to get the data directly or throw error if any

      setMessage(response.message);
    } catch (err) {
      setMessage(err.message || 'Error processing payment');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handlePayment} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Payment Form</h2>
        
        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-700 font-medium">Amount</label>
          <input
            type="text"
            id="amount"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="cardNumber" className="block text-gray-700 font-medium">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="expirationDate" className="block text-gray-700 font-medium">Expiration Date (MMYY)</label>
          <input
            type="text"
            id="expirationDate"
            placeholder="Expiration Date (MMYY)"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="cardCode" className="block text-gray-700 font-medium">CVV</label>
          <input
            type="text"
            id="cardCode"
            placeholder="CVV"
            value={cardCode}
            onChange={(e) => setCardCode(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? 'Processing...' : 'Submit Payment'}
        </button>

        {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
        {error && <p className="mt-4 text-center text-red-500">{error.message}</p>}
        {data && <p className="mt-4 text-center text-primary">{data.message}</p>}
      </form>
    </div>
  );
};

export default TestPage;
