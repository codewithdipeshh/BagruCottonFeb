import { useState } from 'react';
import { Package, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';

const orderStatuses = [
  { id: 'ordered', label: 'Order Placed', icon: CheckCircle },
  { id: 'processing', label: 'Processing', icon: Clock },
  { id: 'shipped', label: 'Shipped', icon: Truck },
  { id: 'delivered', label: 'Delivered', icon: Package },
];

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<null | {
    id: string;
    status: string;
    date: string;
    items: { name: string; quantity: number; price: number }[];
    tracking: { location: string; time: string; status: string }[];
  }>(null);
  const [error, setError] = useState('');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!orderId.trim()) {
      setError('Please enter an order ID');
      return;
    }

    // Mock order data
    if (orderId.toUpperCase() === 'BCF12345') {
      setOrder({
        id: 'BCF12345',
        status: 'shipped',
        date: '2024-01-15',
        items: [
          { name: 'Royal Blue Cotton Saree', quantity: 1, price: 2499 },
          { name: 'Handblock Print Saree', quantity: 2, price: 3998 },
        ],
        tracking: [
          { location: 'Bagru, Jaipur', time: '2024-01-15 10:00 AM', status: 'Order Placed' },
          { location: 'Processing Center', time: '2024-01-15 02:00 PM', status: 'Processing' },
          { location: 'Jaipur Hub', time: '2024-01-16 09:00 AM', status: 'Shipped' },
          { location: 'Delhi Hub', time: '2024-01-17 06:00 AM', status: 'In Transit' },
        ],
      });
    } else {
      setError('Order not found. Please check your order ID and try again.');
    }
  };

  return (
    <div className="bg-[#E8EDF2] min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#080616] mb-4">Track Your Order</h1>
          <p className="text-gray-600">
            Enter your order ID to check the status of your order
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter Order ID (e.g., BCF12345)"
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#080616]"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-[#080616] text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Track Order
            </button>
          </form>
          {error && (
            <p className="mt-4 text-red-500 text-sm">{error}</p>
          )}
          <p className="mt-4 text-gray-500 text-sm">
            Demo: Use order ID "BCF12345" to see tracking
          </p>
        </div>

        {/* Order Details */}
        {order && (
          <div className="space-y-6">
            {/* Order Info */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-gray-600">Order ID</p>
                  <p className="text-2xl font-bold text-[#080616]">{order.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Order Date</p>
                  <p className="text-lg font-medium text-[#080616]">{order.date}</p>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="mb-8">
                <div className="flex justify-between items-center">
                  {orderStatuses.map((status, index) => {
                    const currentIndex = orderStatuses.findIndex(s => s.id === order.status);
                    const isCompleted = index <= currentIndex;
                    const Icon = status.icon;

                    return (
                      <div key={status.id} className="flex-1 text-center relative">
                        <div
                          className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${
                            isCompleted ? 'bg-[#080616] text-white' : 'bg-gray-200 text-gray-400'
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <p className={`mt-2 text-sm ${isCompleted ? 'text-[#080616] font-medium' : 'text-gray-400'}`}>
                          {status.label}
                        </p>
                        {index < orderStatuses.length - 1 && (
                          <div
                            className={`absolute top-6 left-[60%] w-[80%] h-1 ${
                              index < currentIndex ? 'bg-[#080616]' : 'bg-gray-200'
                            }`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Items */}
              <div>
                <h3 className="font-bold text-[#080616] mb-4">Order Items</h3>
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200">
                      <div>
                        <p className="font-medium text-[#080616]">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-[#080616]">Rs. {item.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tracking History */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="font-bold text-[#080616] mb-6">Tracking History</h3>
              <div className="space-y-4">
                {order.tracking.map((track, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-[#080616]" />
                      {index < order.tracking.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-300 my-2" />
                      )}
                    </div>
                    <div className="pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-4 h-4 text-gray-600" />
                        <p className="font-medium text-[#080616]">{track.location}</p>
                      </div>
                      <p className="text-sm text-gray-600">{track.status}</p>
                      <p className="text-xs text-gray-400">{track.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
