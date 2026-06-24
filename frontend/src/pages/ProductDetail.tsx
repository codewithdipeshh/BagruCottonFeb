import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import { getProductById } from '../data/products';
import { useApp } from '../context/AppContext';

function formatPrice(price: number) {
  return `Rs. ${price.toLocaleString('en-IN')}`;
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useApp();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = getProductById(id ?? '');

  if (!product) {
    return (
      <div className="min-h-screen bg-luxury-ivory pt-32 px-6 text-center">
        <h1 className="font-serif text-3xl text-luxury-black mb-4">Product Not Found</h1>
        <p className="text-sm text-luxury-charcoal mb-8">
          This masterpiece may have moved to a private collection.
        </p>
        <Link
          to="/sarees"
          className="inline-flex rounded bg-luxury-black px-6 py-3 text-xs uppercase tracking-luxury text-luxury-ivory"
        >
          Browse Sarees
        </Link>
      </div>
    );
  }

  const images = product.images.length > 0 ? product.images : [''];
  const thumbnails = images
    .map((image, index) => ({ image, index }))
    .filter((item) => item.index !== selectedImage)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-luxury-ivory pt-8 pb-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-luxury-cream">
              <img
                key={`${product.id}-${selectedImage}`}
                src={images[selectedImage]}
                alt={product.name}
                className="quick-view-image h-full w-full object-cover"
              />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {thumbnails.map((thumb) => (
                <button
                  key={`${product.id}-detail-thumb-${thumb.index}`}
                  type="button"
                  onClick={() => setSelectedImage(thumb.index)}
                  className="aspect-[3/4] overflow-hidden rounded border border-luxury-gold/25 bg-white transition-all duration-300 hover:border-luxury-black"
                  aria-label={`Show image ${thumb.index + 1}`}
                >
                  <img
                    src={thumb.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <span className="inline-flex w-fit rounded bg-luxury-gold/15 px-3 py-1 text-[10px] font-bold uppercase tracking-luxury text-luxury-clay">
              {product.fabric}
            </span>
            <h1 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-wide text-luxury-black">
              {product.name}
            </h1>
            <div className="mt-4 flex flex-wrap items-baseline gap-3">
              <span className="text-2xl font-semibold text-luxury-black">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm font-light text-luxury-charcoal/45 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <p className="mt-6 text-sm font-light leading-7 text-luxury-charcoal">
              {product.description}
            </p>

            <div className="mt-8">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-epic text-luxury-gold">
                Quantity
              </p>
              <div className="inline-flex items-center rounded border border-luxury-gold/30 bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  className="flex h-11 w-11 items-center justify-center text-luxury-black hover:bg-luxury-cream"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-[3rem] text-center text-sm font-semibold">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((value) => value + 1)}
                  className="flex h-11 w-11 items-center justify-center text-luxury-black hover:bg-luxury-cream"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <button
                type="button"
                onClick={() => addToCart(product, quantity)}
                className="flex w-full items-center justify-center gap-2 rounded bg-luxury-black px-5 py-3.5 text-xs font-bold uppercase tracking-luxury text-luxury-ivory hover:bg-luxury-clay"
              >
                <ShoppingBag className="h-4 w-4" />
                Add to Cart
              </button>
              <button
                type="button"
                onClick={() => {
                  addToCart(product, quantity);
                  navigate('/cart');
                }}
                className="w-full rounded border border-luxury-black px-5 py-3.5 text-xs font-bold uppercase tracking-luxury text-luxury-black hover:bg-luxury-black hover:text-luxury-ivory"
              >
                Buy Now
              </button>
              <Link
                to="/sarees"
                className="inline-flex text-xs font-semibold uppercase tracking-luxury text-luxury-clay hover:text-luxury-black"
              >
                ← Back to Collection
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
