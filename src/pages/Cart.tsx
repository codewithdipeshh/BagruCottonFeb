import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Cart() {
  const { cartCount, setCartCount } = useApp();

  return (
    <div className="max-w-2xl mx-auto px-6 py-20 text-center">
      <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#080616] text-white flex items-center justify-center">
        <ShoppingBag className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-serif font-bold text-[#080616] mb-4">Your Cart</h1>
      <p className="text-stone-600 mb-8">
        {cartCount > 0
          ? `You have ${cartCount} item${cartCount === 1 ? '' : 's'} in your bag.`
          : 'Your cart is empty. Explore our handcrafted saree collections.'}
      </p>
      {cartCount > 0 && (
        <div className="flex justify-center gap-3 mb-8">
          <button
            type="button"
            onClick={() => setCartCount((c) => Math.max(0, c - 1))}
            className="px-4 py-2 rounded-full border border-stone-300 text-sm font-medium"
          >
            Remove one
          </button>
          <button
            type="button"
            onClick={() => setCartCount((c) => c + 1)}
            className="px-4 py-2 rounded-full bg-[#080616] text-white text-sm font-medium"
          >
            Add sample item
          </button>
        </div>
      )}
      <Link
        to="/sarees"
        className="inline-flex px-6 py-3 bg-[#080616] text-white text-sm font-semibold rounded-full"
      >
        Shop Sarees
      </Link>
    </div>
  );
}
