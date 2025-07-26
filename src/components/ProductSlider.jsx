import React, { useState, useEffect } from 'react';

const ProductCard = ({ product }) => {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleVariantChange = (e) => {
    const variant = product.variants.find(v => v.id === e.target.value);
    setSelectedVariant(variant);
  };

  const handleAddToCart = () => {
    console.log(`Added ${product.name} (${selectedVariant.name}) to cart`);
  };

  const isOutOfStock = selectedVariant.stock === 0;

  const cardStyle = {
    backgroundColor: '#27272a',
    borderRadius: '16px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    transition: 'all 0.3s ease',
    overflow: 'hidden',
    width: '100%',
    flexShrink: 0,
    border: '1px solid #3f3f46',
    cursor: 'pointer'
  };

  const imageContainerStyle = {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#3f3f46',
    height: '192px'
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease'
  };

  const badgeStyle = {
    position: 'absolute',
    top: '12px',
    left: '12px',
    backgroundColor: '#ef4444',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '9999px',
    fontSize: '12px',
    fontWeight: '600'
  };

  const heartButtonStyle = {
    position: 'absolute',
    top: '12px',
    right: '12px',
    padding: '8px',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: '9999px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };

  const contentStyle = {
    padding: '20px'
  };

  const titleStyle = {
    fontWeight: 'bold',
    fontSize: '18px',
    color: 'white',
    marginBottom: '8px',
    lineHeight: '1.2',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  };

  const priceStyle = {
    marginBottom: '16px'
  };

  const mainPriceStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'white'
  };

  const originalPriceStyle = {
    marginLeft: '8px',
    fontSize: '14px',
    color: '#a1a1aa',
    textDecoration: 'line-through'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#d4d4d8',
    marginBottom: '8px'
  };

  const selectStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#3f3f46',
    border: '1px solid #52525b',
    borderRadius: '8px',
    color: 'white',
    fontSize: '14px',
    marginBottom: '16px'
  };

  const stockWarningStyle = {
    color: '#fb923c',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '12px'
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    border: 'none',
    cursor: isOutOfStock ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: isOutOfStock ? '#52525b' : '#2563eb',
    color: isOutOfStock ? '#a1a1aa' : 'white'
  };

  return (
    <div style={cardStyle}>
      <div style={imageContainerStyle}>
        <img 
          src={product.image} 
          alt={product.name}
          style={imageStyle}
        />
        {product.badge && (
          <span style={badgeStyle}>
            {product.badge}
          </span>
        )}
        <button 
          onClick={() => setIsWishlisted(!isWishlisted)}
          style={heartButtonStyle}
        >
          <svg 
            width={16} 
            height={16} 
            fill={isWishlisted ? '#ef4444' : 'none'} 
            stroke={isWishlisted ? '#ef4444' : 'white'} 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      <div style={contentStyle}>
        <h3 style={titleStyle}>
          {product.name}
        </h3>

        <div style={priceStyle}>
          <span style={mainPriceStyle}>
            ${selectedVariant.price}
          </span>
          {selectedVariant.originalPrice && (
            <span style={originalPriceStyle}>
              ${selectedVariant.originalPrice}
            </span>
          )}
        </div>

        <div>
          <label style={labelStyle}>
            {product.variantType}:
          </label>
          <select 
            value={selectedVariant.id}
            onChange={handleVariantChange}
            style={selectStyle}
          >
            {product.variants.map(variant => (
              <option key={variant.id} value={variant.id}>
                {variant.name} {variant.stock === 0 ? '(Out of Stock)' : `(${variant.stock} left)`}
              </option>
            ))}
          </select>
        </div>

        {selectedVariant.stock <= 5 && selectedVariant.stock > 0 && (
          <p style={stockWarningStyle}>
            Only {selectedVariant.stock} left in stock!
          </p>
        )}

        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          style={buttonStyle}
        >
          {isOutOfStock ? (
            'Out of Stock'
          ) : (
            <>
              <svg width={16} height={16} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L6 6H3m4 7v8a2 2 0 002 2h8a2 2 0 002-2v-8m-6 4h.01" />
              </svg>
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};

const testProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    badge: "Best Seller",
    variantType: "Color",
    variants: [
      { id: "black", name: "Black", price: 199.99, originalPrice: 249.99, stock: 15 },
      { id: "white", name: "White", price: 199.99, originalPrice: 249.99, stock: 8 },
      { id: "blue", name: "Blue", price: 199.99, originalPrice: 249.99, stock: 0 },
    ]
  },
  {
    id: 2,
    name: "Organic Cotton T-Shirt - Sustainable Fashion",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
    variantType: "Size",
    variants: [
      { id: "xs", name: "XS", price: 29.99, stock: 12 },
      { id: "s", name: "S", price: 29.99, stock: 20 },
      { id: "m", name: "M", price: 29.99, stock: 3 },
      { id: "l", name: "L", price: 29.99, stock: 0 },
      { id: "xl", name: "XL", price: 29.99, stock: 7 },
    ]
  },
  {
    id: 3,
    name: "Smart Fitness Watch",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    badge: "New",
    variantType: "Band Color",
    variants: [
      { id: "sport-black", name: "Sport Black", price: 299.99, stock: 25 },
      { id: "sport-white", name: "Sport White", price: 299.99, stock: 18 },
      { id: "leather-brown", name: "Leather Brown", price: 349.99, stock: 5 },
    ]
  },
  {
    id: 4,
    name: "Mechanical Gaming Keyboard",
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop",
    variantType: "Switch Type",
    variants: [
      { id: "red", name: "Red Switches", price: 149.99, stock: 10 },
      { id: "blue", name: "Blue Switches", price: 149.99, stock: 6 },
      { id: "brown", name: "Brown Switches", price: 149.99, stock: 0 },
    ]
  },
  {
    id: 5,
    name: "Bluetooth Speaker Pro",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
    badge: "Hot",
    variantType: "Color",
    variants: [
      { id: "black-speaker", name: "Midnight Black", price: 89.99, stock: 22 },
      { id: "silver-speaker", name: "Silver", price: 89.99, stock: 4 },
      { id: "red-speaker", name: "Ruby Red", price: 89.99, stock: 13 },
    ]
  },
  {
    id: 6,
    name: "Wireless Mouse Pro",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
    variantType: "Color",
    variants: [
      { id: "mouse-black", name: "Black", price: 79.99, stock: 18 },
      { id: "mouse-white", name: "White", price: 79.99, stock: 12 },
    ]
  },
  {
    id: 7,
    name: "USB-C Hub Multi-Port",
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=300&fit=crop",
    variantType: "Port Count",
    variants: [
      { id: "hub-7", name: "7-in-1", price: 49.99, stock: 25 },
      { id: "hub-12", name: "12-in-1", price: 69.99, stock: 8 },
    ]
  },
  {
    id: 8,
    name: "Portable Power Bank",
    image: "https://images.unsplash.com/photo-1609592793725-85fc64fbb33a?w=400&h=300&fit=crop",
    badge: "Sale",
    variantType: "Capacity",
    variants: [
      { id: "10k", name: "10,000mAh", price: 29.99, originalPrice: 39.99, stock: 30 },
      { id: "20k", name: "20,000mAh", price: 49.99, originalPrice: 59.99, stock: 15 },
    ]
  }
];

const ProductSlider = ({ products = testProducts, title = "Featured Products", subtitle = "Discover our latest collection" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 768) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, products.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const containerStyle = {
    padding: '48px 16px',
    backgroundColor: '#121212'
  };

  const wrapperStyle = {
    maxWidth: '1280px',
    margin: '0 auto'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '48px'
  };

  const titleStyle = {
    fontSize: '36px',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '16px'
  };

  const subtitleStyle = {
    fontSize: '18px',
    color: '#a1a1aa'
  };

  const sliderWrapperStyle = {
    position: 'relative'
  };

  const buttonStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 10,
    backgroundColor: '#3f3f46',
    color: 'white',
    padding: '12px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
  };

  const prevButtonStyle = {
    ...buttonStyle,
    left: 0
  };

  const nextButtonStyle = {
    ...buttonStyle,
    right: 0
  };

  const overflowStyle = {
    overflow: 'hidden',
    margin: '0 48px'
  };

  const sliderStyle = {
    display: 'flex',
    transition: 'transform 0.3s ease-in-out',
    gap: '24px',
    transform: `translateX(-${(currentIndex * (100 + (24 / itemsPerView))) / itemsPerView}%)`,
    width: `${(products.length * 100) / itemsPerView}%`
  };

  const getItemWidth = () => {
    if (itemsPerView === 1) return '100%';
    if (itemsPerView === 2) return '50%';
    if (itemsPerView === 3) return '33.333%';
    return '25%';
  };

  const itemStyle = {
    width: getItemWidth(),
    flexShrink: 0
  };

  const dotsStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '32px',
    gap: '8px'
  };

  const dotStyle = (isActive) => ({
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: isActive ? '#3b82f6' : '#52525b'
  });

  return (
    <div style={containerStyle}>
      <div style={wrapperStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>{title}</h1>
          <p style={subtitleStyle}>{subtitle}</p>
        </div>
        
        <div style={sliderWrapperStyle}>
          <button 
            onClick={prevSlide}
            style={{
              ...prevButtonStyle,
              opacity: currentIndex === 0 ? 0.5 : 1,
              cursor: currentIndex === 0 ? 'not-allowed' : 'pointer'
            }}
            disabled={currentIndex === 0}
          >
            <svg width={20} height={20} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </button>

          <div style={overflowStyle}>
            <div style={sliderStyle}>
              {products.map(product => (
                <div key={product.id} style={itemStyle}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={nextSlide}
            style={{
              ...nextButtonStyle,
              opacity: currentIndex >= maxIndex ? 0.5 : 1,
              cursor: currentIndex >= maxIndex ? 'not-allowed' : 'pointer'
            }}
            disabled={currentIndex >= maxIndex}
          >
            <svg width={20} height={20} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>
        </div>

        <div style={dotsStyle}>
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              style={dotStyle(index === currentIndex)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;