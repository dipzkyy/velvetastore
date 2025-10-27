// Data produk yang konsisten dengan HTML
const productsData = [
  {
    name: "Hampers Lavender",
    price: "Rp 299.000",
    desc: "Hadiah cantik dengan nuansa lavender yang elegan dan menenangkan.",
    img: "https://dekayu.id/wp-content/uploads/2023/10/Shine-Hampers-Emerald-2-SQ-scaled.jpg"
  },
  {
    name: "Giftbox Royal",
    price: "Rp 450.000", 
    desc: "Kotak hadiah mewah yang sempurna untuk acara spesial dan berkelas.",
    img: "https://img.lazcdn.com/g/ff/kf/Sf80cd2329cbc4749ba6904e794835352k.jpg_720x720q80.jpg"
  },
  {
    name: "Ungu Manis",
    price: "Rp 189.000",
    desc: "Sentuhan manis warna ungu yang memberikan kehangatan dan kesan elegan.",
    img: "https://blog.aromamedan.com/wp-content/uploads/2024/03/Referensi-Hampers-Lebaran-Isi-Hampers-Premium.jpg"
  },
  {
    name: "Velvet Treat",
    price: "Rp 375.000",
    desc: "Paket hadiah mewah dengan sentuhan velvet yang lembut dan elegan.",
    img: "https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/78/2025/03/21/Ide-Hampers-2971598288.jpg"
  },
  {
    name: "Luxury Box",
    price: "Rp 525.000",
    desc: "Kotak hadiah eksklusif yang memberikan kesan mewah dan istimewa.",
    img: "https://down-id.img.susercontent.com/file/id-11134207-7r98u-ln3x7j9i5lrq3e"
  },
  {
    name: "Purple Bliss",
    price: "Rp 275.000",
    desc: "Kombinasi warna ungu yang mempesona, cocok untuk setiap momen spesial.",
    img: "https://cf.shopee.co.id/file/a540e539f816ee7f0898f711344eaf36"
  }
];

// Running text typing effect
const gimmickTexts = [
  "💜 Setiap hadiah adalah cerita tak terlupakan...",
  "✨ Buktikan cinta dengan keanggunan...",
  "🌟 Momen spesial layak mendapatkan kemewahan...",
  "🎁 Ungu bukan sekadar warna, melainkan janji keanggunan...",
  "💫 Setiap pembelian adalah investasi dalam kenangan indah..."
];

function typeEffect(element, text, speed = 50, callback) {
  let i = 0;
  element.textContent = '';
  const interval = setInterval(() => {
    element.textContent += text[i];
    i++;
    if(i >= text.length) {
      clearInterval(interval);
      if(callback) callback();
    }
  }, speed);
}

function startGimmick() {
  const gimmick = document.querySelector('.gimmick');
  let index = 0;
  
  function next() {
    typeEffect(gimmick, gimmickTexts[index], 30, () => {
      setTimeout(() => {
        index = (index + 1) % gimmickTexts.length;
        next();
      }, 2000);
    });
  }
  next();
}

// Modal functionality
const modal = document.getElementById('productModal');
const modalImg = document.getElementById('modalImg');
const modalName = document.getElementById('modalName');
const modalPrice = document.getElementById('modalPrice');
const modalDesc = document.getElementById('modalDesc');
const modalOrder = document.getElementById('modalOrder');
const modalClose = document.getElementById('modalClose');

// Loading functionality
const loading = document.getElementById('loading');

function showLoading() {
  loading.classList.remove('hidden');
}

function hideLoading() {
  loading.classList.add('hidden');
}

// Simulate loading dengan efek yang lebih smooth
function simulateLoading() {
  showLoading();
  
  // Preload images terlebih dahulu
  preloadImages().then(() => {
    // Setelah semua gambar selesai dimuat, tunggu sedikit untuk efek visual
    setTimeout(() => {
      hideLoading();
      // Trigger animasi produk setelah loading selesai
      animateProductsAfterLoad();
    }, 1500);
  }).catch(() => {
    // Fallback jika preload gagal
    setTimeout(() => {
      hideLoading();
      animateProductsAfterLoad();
    }, 2000);
  });
}

// Setup product interactions
function setupProducts() {
  const productElements = document.querySelectorAll('.product');
  
  productElements.forEach((el, idx) => {
    const data = productsData[idx];
    
    // Click on product card
    el.addEventListener('click', (e) => {
      // Jangan trigger jika klik tombol quick order
      if (!e.target.classList.contains('quick-order')) {
        openModal(data);
      }
    });
    
    // Quick order button
    const quickOrderBtn = el.querySelector('.quick-order');
    quickOrderBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent triggering product click
      quickOrder(data);
    });
  });
}

function openModal(productData) {
  modalImg.src = productData.img;
  modalName.textContent = productData.name;
  modalPrice.textContent = productData.price;
  modalDesc.textContent = productData.desc;
  
  // Setup WhatsApp link
  const message = `Halo Velveta! Saya ingin memesan ${productData.name} (${productData.price}). Bisa info lebih lanjut?`;
  modalOrder.href = `https://wa.me/6285731607844?text=${encodeURIComponent(message)}`;
  
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function quickOrder(productData) {
  const message = `Halo Velveta! Saya ingin segera memesan ${productData.name} (${productData.price}). Mohon proses ordernya!`;
  window.open(`https://wa.me/6285731607844?text=${encodeURIComponent(message)}`, '_blank');
}

// Close modal
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Add keyboard support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'flex') {
    closeModal();
  }
});

// Image loading with error handling (Promise-based)
function preloadImages() {
  return new Promise((resolve, reject) => {
    const imageUrls = productsData.map(product => product.img);
    let loadedCount = 0;
    const totalImages = imageUrls.length;
    
    if (totalImages === 0) {
      resolve();
      return;
    }
    
    imageUrls.forEach(url => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          resolve();
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          resolve(); // Tetap resolve meski ada error
        }
      };
      img.src = url;
    });
    
    // Timeout fallback
    setTimeout(() => {
      if (loadedCount < totalImages) {
        resolve(); // Tetap resolve meski timeout
      }
    }, 5000);
  });
}

// Animate products after loading
function animateProductsAfterLoad() {
  const products = document.querySelectorAll('.product');
  
  // Reset state untuk memastikan animasi berjalan
  products.forEach(product => {
    product.style.opacity = '0';
    product.style.transform = 'scale(0.8) translateY(50px)';
  });
  
  // Trigger reflow untuk memastikan animasi berjalan
  setTimeout(() => {
    products.forEach(product => {
      // CSS animation sudah dihandle oleh kelas, kita hanya perlu memastikan
      // elemen visible dan siap dianimasikan
      product.style.visibility = 'visible';
    });
  }, 100);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  simulateLoading(); // Show loading screen
  startGimmick();
  setupProducts();
  
  // Add some interactive effects
  const products = document.querySelectorAll('.product');
  products.forEach(product => {
    product.addEventListener('mouseenter', () => {
      product.style.zIndex = '10';
    });
    
    product.addEventListener('mouseleave', () => {
      product.style.zIndex = '1';
    });
  });
});

// Add scroll animation for products (fallback jika CSS animation tidak bekerja)
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe products when they enter viewport (fallback)
window.addEventListener('load', () => {
  const products = document.querySelectorAll('.product');
  products.forEach(product => {
    // Backup animation jika CSS animation tidak bekerja
    if (getComputedStyle(product).animationName === 'none') {
      product.style.opacity = '0';
      product.style.transform = 'translateY(30px)';
      product.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(product);
    }
  });
});