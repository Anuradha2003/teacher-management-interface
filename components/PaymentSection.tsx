'use client'

import { useState } from 'react';
import { CreditCard, DollarSign, TrendingUp, Plus, Trash, Edit, CalendarDays } from 'lucide-react';

interface Payment {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
}

export default function PaymentSection() {
  const [payments, setPayments] = useState<Payment[]>([
    { id: '1', date: '2023-10-15', description: 'Monthly Salary', amount: 2500, status: 'completed' },
    { id: '2', date: '2023-10-05', description: 'Workshop Bonus', amount: 350, status: 'completed' },
    { id: '3', date: '2023-10-01', description: 'Monthly Salary', amount: 2500, status: 'completed' },
    { id: '4', date: '2023-09-25', description: 'Extra Class', amount: 120, status: 'completed' }
  ]);
  
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [isAddingPayment, setIsAddingPayment] = useState(false);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const validatePayment = () => {
    let isValid = true;
    
    if (!amount || parseFloat(amount) <= 0) {
      setAmountError('Please enter a valid amount');
      isValid = false;
    } else {
      setAmountError('');
    }
    
    if (!description.trim()) {
      setDescriptionError('Description is required');
      isValid = false;
    } else {
      setDescriptionError('');
    }
    
    return isValid;
  };

  const handleAddPayment = () => {
    if (validatePayment()) {
      const newPayment: Payment = {
        id: (payments.length + 1).toString(),
        date: new Date().toISOString().split('T')[0],
        description,
        amount: parseFloat(amount),
        status: 'pending'
      };
      
      setPayments([...payments, newPayment]);
      setAmount('');
      setDescription('');
      setIsAddingPayment(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <CreditCard className="text-indigo-500 w-5 h-5" />
          Payment Management
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="border rounded-lg p-5 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600">Total Earnings</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">$5,470.00</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>12.5% from last month</span>
          </div>
        </div>
        
        <div className="border rounded-lg p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600">Pending Payments</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">$350.00</p>
            </div>
            <div className="p-2 bg-yellow-100 rounded-lg">
              <CreditCard className="w-5 h-5 text-yellow-500" />
            </div>
          </div>
          <button className="mt-4 text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors">
            View Details
          </button>
        </div>
        
        <div className="border rounded-lg p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600">Next Payment</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">Nov 5, 2023</p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <CalendarDays className="w-5 h-5 text-green-500" />
            </div>
          </div>
          <button className="mt-4 text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors">
            Schedule Payment
          </button>
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
          <h4 className="font-medium text-gray-700">Payment History</h4>
          <button 
            onClick={() => setIsAddingPayment(true)}
            className="flex items-center gap-1 text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Payment
          </button>
        </div>
        
        {isAddingPayment && (
          <div className="p-4 border-b bg-blue-50">
            <h5 className="font-medium mb-3">Add New Payment</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Amount ($)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    amountError ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {amountError && <p className="text-red-500 text-xs mt-1">{amountError}</p>}
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    descriptionError ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {descriptionError && <p className="text-red-500 text-xs mt-1">{descriptionError}</p>}
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Payment Method</label>
                <select 
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="bank">Bank Transfer</option>
                  <option value="paypal">PayPal</option>
                  <option value="card">Credit Card</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={handleAddPayment}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Save Payment
              </button>
              <button 
                onClick={() => setIsAddingPayment(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        
        <div className="divide-y">
          {payments.map(payment => (
            <div key={payment.id} className="grid grid-cols-1 md:grid-cols-4 p-4 hover:bg-gray-50 transition-colors">
              <div className="md:col-span-2">
                <p className="font-medium text-gray-800">{payment.description}</p>
                <p className="text-sm text-gray-500 mt-1">{payment.date}</p>
              </div>
              <p className="text-gray-800 font-medium">${payment.amount.toFixed(2)}</p>
              <div className="flex justify-end">
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(payment.status)}`}>
                  {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
          
          {payments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <CreditCard className="mx-auto w-8 h-8 text-gray-300 mb-2" />
              <p>No payment history available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};