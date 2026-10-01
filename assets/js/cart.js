(function(){
  const CART_KEY='sourcelab.cart.v1';
  const WISHLIST_KEY='sourcelab.wishlist.v1';

  const ORDER_URL='https://encountered-computational-proposed-additions.trycloudflare.com/api/order';
  const API_URL='https://encountered-computational-proposed-additions.trycloudflare.com/';

  function read(key,fallback){
    try{
      const value=localStorage.getItem(key);
      return value?JSON.parse(value):fallback;
    }catch{
      return fallback;
    }
  }

  function write(key,value){
    try{
      localStorage.setItem(key,JSON.stringify(value));
    }catch{}
  }

  function cart(){
    return read(CART_KEY,[]);
  }

  function wishlist(){
    return read(WISHLIST_KEY,[]);
  }

  function saveCart(items){
    write(CART_KEY,items);
  }

  function saveWishlist(items){
    write(WISHLIST_KEY,items);
  }

  function money(value){
    return new Intl.NumberFormat('en-GB',{
      style:'currency',
      currency:'GBP'
    }).format(Number(value)||0);
  }

  function resolveProduct(id){
    const products=window.SourceLabProducts?.products||[];
    return products.find(product=>String(product.id)===String(id));
  }

  function add(id,size='',variant='',quantity=1){
    const product=resolveProduct(id);

    if(!product)return;

    const items=cart();

    const existing=items.find(item=>
      String(item.id)===String(id)&&
      String(item.size||'')===String(size||'')&&
      String(item.variant||'')===String(variant||'')
    );

    if(existing){
      existing.quantity=(Number(existing.quantity)||0)+(Number(quantity)||1);
    }else{
      items.push({
        ...product,
        size,
        variant,
        quantity:Number(quantity)||1
      });
    }

    saveCart(items);
    update();

    window.SourceLabUI?.toast('Added to cart');
  }

  function remove(id,size='',variant=''){
    const items=cart().filter(item=>
      !(
        String(item.id)===String(id)&&
        String(item.size||'')===String(size||'')&&
        String(item.variant||'')===String(variant||'')
      )
    );

    saveCart(items);
    update();
  }

  function setQuantity(id,quantity,size='',variant=''){
    const items=cart();

    const target=items.find(item=>
      String(item.id)===String(id)&&
      String(item.size||'')===String(size||'')&&
      String(item.variant||'')===String(variant||'')
    );

    if(!target)return;

    const next=Math.max(1,Number(quantity)||1);
    target.quantity=next;

    saveCart(items);
    update();
  }

  function count(){
    return cart().reduce(
      (total,item)=>total+(Number(item.quantity)||0),
      0
    );
  }

  function subtotal(){
    return cart().reduce(
      (total,item)=>
        total+
        (Number(item.price)||0)*
        (Number(item.quantity)||0),
      0
    );
  }

  function escapeHtml(value){
    return String(value??'')
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;')
      .replace(/'/g,'&#039;');
  }

  function cartMarkup(item){
    const quantity=Number(item.quantity)||1;
    const price=Number(item.price)||0;

    return `
      <article class="cart-item">
        <div class="cart-item-media">
          ${
            item.image
              ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name||'')}">`
              : ''
          }
        </div>

        <div class="cart-item-info">
          <h3>${escapeHtml(item.name||'Untitled product')}</h3>

          ${
            item.description
              ? `<p>${escapeHtml(item.description)}</p>`
              : ''
          }

          ${
            item.size
              ? `<span>Size: ${escapeHtml(item.size)}</span>`
              : ''
          }

          ${
            item.variant
              ? `<span>Variant: ${escapeHtml(item.variant)}</span>`
              : ''
          }

          <strong>${money(price)}</strong>
        </div>

        <div class="cart-item-actions">
          <button
            type="button"
            data-cart-minus
            data-id="${escapeHtml(item.id)}"
            data-size="${escapeHtml(item.size||'')}"
            data-variant="${escapeHtml(item.variant||'')}"
          >−</button>

          <span>${quantity}</span>

          <button
            type="button"
            data-cart-plus
            data-id="${escapeHtml(item.id)}"
            data-size="${escapeHtml(item.size||'')}"
            data-variant="${escapeHtml(item.variant||'')}"
          >+</button>

          <button
            type="button"
            data-cart-remove
            data-id="${escapeHtml(item.id)}"
            data-size="${escapeHtml(item.size||'')}"
            data-variant="${escapeHtml(item.variant||'')}"
          >Remove</button>
        </div>
      </article>
    `;
  }

  async function checkout(){
    const state=cart();

    if(!state.length){
      window.SourceLabUI?.toast('Your cart is empty');
      return;
    }

    const products=state.map(item=>({
      id:item.id,
      qty:Number(item.quantity)||1
    }));

    const button=document.querySelector('[data-demo-checkout]');

    if(button){
      button.disabled=true;
      button.setAttribute('aria-busy','true');
    }

    try{
      const response=await fetch(ORDER_URL,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          products
        })
      });

      if(!response.ok){
        throw new Error(`Order request failed: ${response.status}`);
      }

      const order=await response.json();

      if(!order.order_id){
        throw new Error('Server did not return an order_id');
      }

      /*
       * ORDER_URL is:
       * https://...trycloudflare.com/api/order
       *
       * This redirects to:
       * https://...trycloudflare.com/checkout/{order_id}
       */
      const checkoutUrl=
        `${new URL(API_URL).origin}/checkout/${encodeURIComponent(order.order_id)}`;

      window.location.href=checkoutUrl;

    }catch(error){
      console.error('Checkout failed:',error);

      window.SourceLabUI?.toast(
        'Checkout failed. Please try again.'
      );

      if(button){
        button.disabled=false;
        button.removeAttribute('aria-busy');
      }
    }
  }

  function update(){
    const page=document.querySelector('[data-cart-page]');
    const summary=document.querySelector('[data-cart-summary]');

    const items=cart();

    if(page){
      if(!items.length){
        page.innerHTML=`
          <div class="empty-state">
            <h2>Your cart is empty.</h2>
            <p>Add some products to continue.</p>
            <a class="button button-primary" href="products.html">
              Browse products
            </a>
          </div>
        `;
      }else{
        page.innerHTML=items.map(cartMarkup).join('');
      }
    }

    if(summary){
      const total=subtotal();

      summary.innerHTML=`
        <div class="cart-summary-inner">
          <p class="eyebrow">
            <span></span>
            Order summary
          </p>

          <div class="cart-summary-row">
            <span>Items</span>
            <strong>${count()}</strong>
          </div>

          <div class="cart-summary-row">
            <span>Subtotal</span>
            <strong>${money(total)}</strong>
          </div>

          <div class="cart-summary-total">
            <span>Total</span>
            <strong>${money(total)}</strong>
          </div>

          <button
            class="button button-primary"
            type="button"
            data-demo-checkout
            ${items.length?'':'disabled'}
          >
            Continue to checkout
          </button>

          <p>Secure checkout.</p>
        </div>
      `;
    }

    refreshWishlist();
  }

  function refreshWishlist(){
    const items=wishlist();

    document.querySelectorAll('[data-wishlist]').forEach(button=>{
      const id=button.getAttribute('data-wishlist');

      const active=items.some(
        item=>String(item)===String(id)
      );

      button.classList.toggle('is-active',active);
      button.setAttribute(
        'aria-pressed',
        active?'true':'false'
      );
    });
  }

  function toggleWishlist(id){
    const items=wishlist();

    const index=items.findIndex(
      item=>String(item)===String(id)
    );

    if(index===-1){
      items.push(id);
    }else{
      items.splice(index,1);
    }

    saveWishlist(items);
    refreshWishlist();
  }

  document.addEventListener('click',event=>{
    const removeButton=event.target.closest('[data-cart-remove]');

    if(removeButton){
      remove(
        removeButton.dataset.id,
        removeButton.dataset.size||'',
        removeButton.dataset.variant||''
      );
      return;
    }

    const minusButton=event.target.closest('[data-cart-minus]');

    if(minusButton){
      const item=cart().find(item=>
        String(item.id)===String(minusButton.dataset.id)&&
        String(item.size||'')===String(minusButton.dataset.size||'')&&
        String(item.variant||'')===String(minusButton.dataset.variant||'')
      );

      if(item){
        setQuantity(
          item.id,
          Math.max(1,(Number(item.quantity)||1)-1),
          item.size||'',
          item.variant||''
        );
      }

      return;
    }

    const plusButton=event.target.closest('[data-cart-plus]');

    if(plusButton){
      const item=cart().find(item=>
        String(item.id)===String(plusButton.dataset.id)&&
        String(item.size||'')===String(plusButton.dataset.size||'')&&
        String(item.variant||'')===String(plusButton.dataset.variant||'')
      );

      if(item){
        setQuantity(
          item.id,
          (Number(item.quantity)||1)+1,
          item.size||'',
          item.variant||''
        );
      }

      return;
    }

    const checkoutButton=event.target.closest('[data-demo-checkout]');

    if(checkoutButton){
      checkout();
      return;
    }

    const wishlistButton=event.target.closest('[data-wishlist]');

    if(wishlistButton){
      toggleWishlist(wishlistButton.dataset.wishlist);
    }
  });

  window.SourceLabCart={
    cart,
    add,
    remove,
    setQuantity,
    count,
    subtotal,
    update,
    wishlist,
    refreshWishlist,
    checkout
  };

  if(
    document.readyState==='loading'
  ){
    document.addEventListener(
      'DOMContentLoaded',
      update
    );
  }else{
    update();
  }
})();
