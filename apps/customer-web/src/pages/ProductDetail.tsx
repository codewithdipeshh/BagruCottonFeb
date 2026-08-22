import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  Ruler,
  Scissors,
  ShieldCheck,
  ChevronRight,
  Loader2,
  Heart,
  CheckCircle2
} from 'lucide-react';
import { findProductById, findProducts } from '../State/Product/Action';
import { toggleWishlistItem, getWishlist } from '../State/Wishlist/Action';
import { addItemToCart, getCart } from '../State/Cart/Action';
import ReviewSection from '../components/ReviewSection';

function formatPrice(price: number) {
  return `₹${(price || 0).toLocaleString('en-IN')}`;
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'care'>('description');

  const [isBuying, setIsBuying] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const product = useSelector((state: any) => state.product?.product);
  const products = useSelector((state: any) => state.product?.products);
  const loading = useSelector((state: any) => state.product?.loading);
  
  const rawWishlistItems = useSelector((state: any) => state.wishlist?.wishlistItems);
  const wishlistItems = rawWishlistItems || [];
  
  const jwt = useSelector((state: any) => state.auth?.jwt);
  const user = useSelector((state: any) => state.auth?.user);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (id) {
      dispatch(findProductById({ productId: id }));
    }
    dispatch(findProducts({ pageSize: 200 }));
    if (jwt) {
      dispatch(getWishlist());
    }
  }, [id, dispatch, jwt]);

  useEffect(() => {
    setSelectedImage(0);
    setQuantity(1);
  }, [id, product]);

  const images = useMemo<string[]>(() => {
    if (!product) return [];
    const aggregatedList: any[] = [];
    if (product.imageUrls && Array.isArray(product.imageUrls)) aggregatedList.push(...product.imageUrls);
    if (product.images && Array.isArray(product.images)) aggregatedList.push(...product.images);
    if (product.imageUrl) aggregatedList.push(product.imageUrl);
    if (product.image) aggregatedList.push(product.image);

    const processedUrls = aggregatedList.map((item: any) => {
      if (!item) return '';
      if (typeof item === 'string') return item.trim();
      if (typeof item === 'object' && item.url) return String(item.url).trim();
      return String(item).trim();
    });

    const uniqueImages = Array.from(new Set(processedUrls.filter((url) => typeof url === 'string' && url !== '')));
    if (uniqueImages.length === 0) return ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop'];
    return uniqueImages;
  }, [product]);

  const productId = product?._id || product?.id;

  const relatedProducts = useMemo(() => {
    let listToFilter: any[] = [];
    if (Array.isArray(products)) {
      listToFilter = products;
    } else if (products && typeof products === 'object') {
      listToFilter = products.content || products.products || [];
    }

    if (!listToFilter.length || !product) return [];

    const currentCategory = (product?.fabric ||
      (typeof product?.category === 'object' ? product?.category?.name : product?.category) ||
      product?.category?.name ||
      '').toLowerCase().trim();

    if (!currentCategory) {
      return listToFilter.filter((item: any) => {
        const itemId = item._id || item.id;
        return itemId !== productId;
      }).slice(0, 8);
    }

    const filtered = listToFilter.filter((item: any) => {
      const itemId = item._id || item.id;
      if (itemId === productId) return false;

      const itemCategory = (item?.fabric ||
        (typeof item?.category === 'object' ? item?.category?.name : item?.category) ||
        item?.category?.name ||
        '').toLowerCase().trim();

      return itemCategory === currentCategory;
    });

    if (filtered.length === 0) {
      return listToFilter.filter((item: any) => {
        const itemId = item._id || item.id;
        return itemId !== productId;
      }).slice(0, 8);
    }

    return filtered.slice(0, 8);
  }, [products, product, productId]);

  const isSavedInWishlist = useMemo(() => {
    return wishlistItems.some((item: any) => {
      const idToCheck = item?._id || item?.id || item;
      return idToCheck === productId;
    });
  }, [wishlistItems, productId]);

  const displayTitle = product?.title || product?.name || 'Heritage Drape';
  const displayPrice = product?.discountedPrice || product?.price || 0;
  const originalPrice = product?.price || 0;

  const handleWishlistToggle = () => {
    if (productId) {
      dispatch(toggleWishlistItem(productId));
    }
  };

  const handleBuyNow = () => {
    const token = localStorage.getItem('jwt') || jwt;

    if (!token) {
      navigate('/login?redirectTo=/checkout');
      return;
    }

    setIsBuying(true);

    setTimeout(() => {
      setIsBuying(false);
      navigate('/checkout?type=direct', {
        state: {
          directItem: product,
          directQty: quantity
        }
      });
    }, 500);
  };

  const handleAddToCart = () => {
    const token = localStorage.getItem('jwt') || jwt;
    if (!token) {
      navigate('/login?redirectTo=/cart');
      return;
    }

    try {
      const reqData = { productId: productId, quantity: quantity };
      dispatch(addItemToCart(reqData));

      setTimeout(() => {
        dispatch(getCart());
      }, 500);

      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
      }, 3000);

    } catch (err) {
      console.error("Add to cart issue:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] pt-32 px-6 text-center flex flex-col items-center justify-center font-sans">
        <Loader2 className="w-8 h-8 animate-spin text-[#9A7B56] mb-4" />
        <p className="text-xs tracking-widest text-stone-400 uppercase animate-pulse">Decrypting Drape Microstructures...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] pt-32 px-6 text-center flex flex-col items-center justify-center select-none font-sans">
        <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-6">
          <Scissors className="w-7 h-7" />
        </div>
        <h1 className="font-serif text-3xl text-stone-900 font-light tracking-wide mb-3">Masterpiece Not Found</h1>
        <p className="text-sm text-stone-500 max-w-sm mb-8 leading-relaxed">
          The requested drape is currently unavailable or has been acquired by a private collector.
        </p>
        <Link to="/sarees" className="inline-flex rounded-xl bg-stone-950 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#9A7B56] hover:text-black transition-all duration-300 no-underline">
          Browse Heritage Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-8 pb-20 select-none font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-6">
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-stone-400 font-semibold mb-6">
          <Link to="/" className="hover:text-stone-900 transition-colors no-underline">Home</Link>
          <ChevronRight className="w-3 h-3 text-stone-300" />
          <Link to="/sarees" className="hover:text-stone-900 transition-colors no-underline">Vault</Link>
          <ChevronRight className="w-3 h-3 text-stone-300" />
          <span className="text-stone-600 truncate">{displayTitle}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4 items-start w-full">
            {images.length > 1 && (
              <div className="w-full sm:w-24 flex flex-row sm:flex-col gap-3 max-h-[600px] overflow-x-auto sm:overflow-y-auto scrollbar-none p-1 flex-shrink-0">
                {images.map((image: string, index: number) => (
                  <div
                    key={`${productId}-detail-thumb-${index}`}
                    onClick={(e) => { e.preventDefault(); setSelectedImage(index); }}
                    onMouseEnter={() => setSelectedImage(index)}
                    className={`aspect-[3/4] w-20 sm:w-full overflow-hidden border rounded-xl bg-white transition-all duration-200 cursor-pointer outline-none flex-shrink-0 ${index === selectedImage ? 'border-neutral-900 shadow-sm ring-2 ring-neutral-900/20 scale-102' : 'border-stone-200 opacity-70 hover:opacity-100'}`}
                  >
                    <img src={image} alt="" className="h-full w-full object-cover pointer-events-none" loading="lazy" />
                  </div>
                ))}
              </div>
            )}
            <div className="flex-1 w-full">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 shadow-xs group">
                <div className="absolute inset-3 border border-[#F7DA96]/15 rounded-xl pointer-events-none z-10" />
                <img src={images[selectedImage] || images[0]} alt={`${displayTitle} active preview`} className="h-full w-full object-cover transition-all duration-500 group-hover:scale-103" loading="eager" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute bottom-6 left-6 z-20 flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded border border-[#F7DA96]/20">
                  <Sparkles className="w-3.5 h-3.5 text-[#F7DA96]" />
                  <span className="text-[9px] uppercase tracking-widest text-[#F7DA96] font-semibold">Certified Handloom</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center text-left space-y-6 w-full">
            <div className="space-y-3">
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-2">
                  <span className="inline-flex rounded-md bg-stone-900 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[#F7DA96] border border-[#F7DA96]/10">
                    {product?.fabric || (typeof product?.category === 'object' ? product?.category?.name : product?.category) || 'Premium Handloom'}
                  </span>
                  <h1 className="font-serif text-3xl sm:text-4xl font-normal leading-tight tracking-wide text-stone-900 uppercase m-0">
                    {displayTitle}
                  </h1>
                </div>
                <button
                  type="button"
                  onClick={handleWishlistToggle}
                  className="p-3 rounded-full border border-stone-200 bg-white shadow-xs hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex-shrink-0 border-none outline-none"
                  title={isSavedInWishlist ? "Remove from Saved Collection" : "Save to Collection"}
                >
                  <Heart className={`w-5 h-5 transition-colors duration-300 ${isSavedInWishlist ? 'fill-red-500 stroke-red-500 text-red-500' : 'text-stone-400'}`} />
                </button>
              </div>

              <div className="flex flex-wrap items-baseline gap-3 pt-1">
                <span className="text-2xl font-medium text-stone-900">{formatPrice(displayPrice)}</span>
                {originalPrice > displayPrice && (
                  <span className="text-sm font-light text-stone-400 line-through">{formatPrice(originalPrice)}</span>
                )}
                {originalPrice > displayPrice && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 bg-red-50 px-2.5 py-0.5 rounded-md">
                    Save {Math.round(((originalPrice - displayPrice) / originalPrice) * 100)}%
                  </span>
                )}
              </div>
            </div>

            <div className="border-b border-stone-200 flex gap-6 text-xs uppercase tracking-wider font-semibold text-stone-400 pt-2 bg-transparent">
              <button type="button" onClick={() => setActiveTab('description')} className={`pb-2 transition-colors relative border-none bg-transparent cursor-pointer outline-none ${activeTab === 'description' ? 'text-stone-950 font-bold' : 'hover:text-stone-700'}`}>
                Philosophy{activeTab === 'description' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#9A7B56]" />}
              </button>
              <button type="button" onClick={() => setActiveTab('specifications')} className={`pb-2 transition-colors relative border-none bg-transparent cursor-pointer outline-none ${activeTab === 'specifications' ? 'text-stone-950 font-bold' : 'hover:text-stone-700'}`}>
                Specifications{activeTab === 'specifications' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#9A7B56]" />}
              </button>
              <button type="button" onClick={() => setActiveTab('care')} className={`pb-2 transition-colors relative border-none bg-transparent cursor-pointer outline-none ${activeTab === 'care' ? 'text-stone-950 font-bold' : 'hover:text-stone-700'}`}>
                Wash & Care{activeTab === 'care' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#9A7B56]" />}
              </button>
            </div>

            <div className="min-h-[100px] py-1">
              {activeTab === 'description' && (
                <p className="text-sm font-light leading-relaxed text-stone-600">
                  {product.philosophy || product.description || 'This beautiful drape represents centuries of ancestral heritage, using block prints and organic dyes sourced locally from our master weaving clusters.'}
                </p>
              )}
              {activeTab === 'specifications' && (
                <div className="grid grid-cols-2 gap-4 text-xs text-stone-600">
                  <div className="flex items-center gap-2"><Ruler className="w-4 h-4 text-[#9A7B56] flex-shrink-0" /><span>{product.specifications || <strong>Length: 6.5 Meters (incl blouse)</strong>}</span></div>
                  <div className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#9A7B56] flex-shrink-0" /><span><strong>Weave:</strong> Authentic Handloom</span></div>
                  <div className="flex items-center gap-2"><Scissors className="w-4 h-4 text-[#9A7B56] flex-shrink-0" /><span><strong>Width:</strong> Standard 44 Inches</span></div>
                  <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#9A7B56] flex-shrink-0" /><span><strong>Dyes:</strong> 100% Organic Herbal</span></div>
                </div>
              )}
              {activeTab === 'care' && (
                <p className="text-sm font-light leading-relaxed text-stone-600">
                  {product.washCare || 'Dry Clean recommended for the first wash to preserve original zari threads and herbal resist dyes. Subsequently, hand wash separately in cold water with mild liquid detergents.'}
                </p>
              )}
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Select Quantity</p>
                <div className="inline-flex items-center rounded-xl border border-stone-200 bg-stone-50">
                  <button type="button" onClick={() => setQuantity((value: number) => Math.max(1, value - 1))} className="flex h-10 w-10 items-center justify-center text-stone-600 hover:bg-stone-200 rounded-l-xl transition-colors active:scale-95 border-none bg-transparent cursor-pointer outline-none"><Minus className="h-3.5" /></button>
                  <span className="min-w-[2.5rem] text-center text-xs font-bold text-stone-900">{quantity}</span>
                  <button type="button" onClick={() => setQuantity((value: number) => value + 1)} className="flex h-10 w-10 items-center justify-center text-stone-600 hover:bg-stone-200 rounded-r-xl transition-colors active:scale-95 border-none bg-transparent cursor-pointer outline-none"><Plus className="h-3.5" /></button>
                </div>
              </div>
              <div className="text-right flex flex-col items-end">
                <span className="text-[9px] uppercase tracking-widest text-[#9A7B56] font-bold">Atelier Direct</span>
                <span className="text-xs text-stone-500 font-light mt-0.5">{product.brand || 'Jaipur Print Trails'}</span>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-neutral-950 px-5 py-4 text-xs font-bold uppercase tracking-wider text-white hover:text-black hover:bg-[#9A7B56] transition-all duration-300 shadow-md active:scale-98 border-none cursor-pointer outline-none"
              >
                <ShoppingBag className="h-4 w-4" /> Add to Cart
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                disabled={isBuying}
                className="w-full rounded-xl border border-stone-900 bg-white px-5 py-4 text-xs font-bold uppercase tracking-wider text-stone-900 hover:bg-stone-900 hover:text-white transition-all duration-300 active:scale-98 cursor-pointer outline-none flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isBuying ? <><Loader2 className="w-4 h-4 animate-spin" /> Fetching Ledger...</> : 'Buy Now'}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="inline-flex text-[10px] font-bold uppercase tracking-widest text-[#9A7B56] hover:text-black transition-colors border-none bg-transparent cursor-pointer outline-none"
                >
                  &larr; Back to Masterpieces
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <ReviewSection productId={id || ''} user={user} />
      </div>

      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-12 border-t border-stone-200">
          <div className="flex flex-col items-center text-center mb-10">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#9A7B56] font-bold mb-2">Curated Pairing</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal uppercase tracking-wide">
              More From {product?.fabric || (typeof product?.category === 'object' ? product?.category?.name : product?.category) || 'This Collection'}
            </h2>
            <div className="w-12 h-[2px] bg-[#9A7B56] mt-3" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((item: any) => {
              const itemImg = item.imageUrls?.[0] || item.images?.[0] || item.imageUrl || item.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop';
              const itemName = item.title || item.name || 'Heritage Drape';
              const itemPrice = item.discountedPrice || item.price || 0;
              const itemId = item._id || item.id;

              return (
                <div
                  key={itemId}
                  onClick={() => navigate(`/products/${itemId}`)}
                  className="group bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                    <img
                      src={itemImg}
                      alt={itemName}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-4 flex flex-col flex-grow justify-between text-left">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-[#9A7B56] font-bold block mb-1">
                        {item.fabric || 'Handloom'}
                      </span>
                      <h3 className="font-serif text-sm font-normal text-stone-900 line-clamp-1 group-hover:text-[#9A7B56] transition-colors">
                        {itemName}
                      </h3>
                    </div>
                    <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-sm font-medium text-stone-900">{formatPrice(itemPrice)}</span>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-stone-900 underline group-hover:text-[#9A7B56]">
                        View Drape →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <button
              type="button"
              onClick={() => {
                // FIX: Force scroll to top before navigating so the next page isn't blank
                window.scrollTo(0, 0);
                
                //  FIX: Intelligently try to navigate to the exact category collection
                const categorySlug = product?.category?.slug || (typeof product?.category === 'string' ? product.category : '');
                
                if (categorySlug) {
                  navigate(`/sarees/${categorySlug.toLowerCase()}`);
                } else {
                  navigate('/sarees');
                }
              }}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-stone-900 px-8 py-3 text-xs font-bold uppercase tracking-wider text-stone-900 hover:bg-stone-900 hover:text-white transition-all duration-300 cursor-pointer outline-none"
            >
              View All From This Collection
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 transform ${showNotification ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'
          }`}
      >
        <div className="bg-stone-900 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-stone-800">
          <div className="bg-[#9A7B56] rounded-full p-1">
            <CheckCircle2 className="w-4 h-4 text-white" />
          </div>
          <span className="text-xs font-semibold tracking-wide">
            added to cart successfully.
          </span>
        </div>
      </div>

    </div>
  );
}