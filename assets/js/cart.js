(function(){
  'use strict';

  const CART_KEY='sourcelab.cart.v1';
  const WISHLIST_KEY='sourcelab.wishlist.v1';

  /* REAL CHECKOUT BACKEND */
  const API_URL='https://departure-corners-petersburg-trustee.trycloudflare.com';
  const ORDER_URL=`${API_URL}/api/order`;

  const read=(key,fallback)=>{
    try{
      return JSON.parse(localStorage.getItem(key))||fallback;
    }catch{
      return fallback;
    }
  };

  const save=(key,value)=>
    localStorage.setItem(
      key,
      JSON.stringify(value)
    );

  function productById(id){
    return (
      window.SourceLabData?.products||[]
    ).find(
      product=>product.id===id
    );
  }

  function cart(){
    const state=read(CART_KEY,[]);

    if(!window.SourceLabData){
      return state;
    }

    const cleaned=state.filter(item=>{

      if(item.type!=='product'){
        return true;
      }

      const product=productById(item.id);

      if(!product){
        return false;
      }

      const validSize=
        !product.sizes?.length ||
        product.sizes
          .map(String)
          .includes(
            String(item.size||'')
          );

      const validVariant=
        !product.variants?.length ||
        product.variants.some(
          variant=>
            variant.id===item.variant
        );

      return validSize&&validVariant;
    });

    if(cleaned.length!==state.length){
      save(
        CART_KEY,
        cleaned
      );
    }

    return cleaned;
  }

  function wishlist(){
    const state=
      read(WISHLIST_KEY,[]);

    if(!window.SourceLabData){
      return state;
    }

    const valid=new Set(
      (
        window.SourceLabData.products||[]
      ).map(
        product=>product.id
      )
    );

    const cleaned=
      state.filter(
        id=>valid.has(id)
      );

    if(cleaned.length!==state.length){
      save(
        WISHLIST_KEY,
        cleaned
      );
    }

    return cleaned;
  }

  const catalogItem=(type,id)=>{

    const data=
      window.SourceLabData||{};

    const map={
      product:data.products||[],
      supplier:data.suppliers||[],
      course:data.courses||[],
      bundle:data.bundles||[]
    };

    const item=
      (map[type]||[])
        .find(
          entry=>entry.id===id
        );

    return item
      ? {
          id:item.id,
          type,
          title:item.title,
          price:item.price,
          image:item.image||'',
          category:
            item.category||type,
          sizes:item.sizes||[],
          variants:
            item.variants||[]
        }
      : null;
  };

  const sameLine=(
    entry,
    type,
    id,
    size='',
    variant=''
  )=>
    entry.id===id &&
    entry.type===type &&
    String(entry.size||'')===
      String(size||'') &&
    String(entry.variant||'')===
      String(variant||'');

  const lineToken=item=>
    `${item.type}:${item.id}:${item.size||''}:${item.variant||''}`;

  function add(
    type,
    id,
    quantity=1,
    options={}
  ){

    const item=
      catalogItem(type,id);

    if(!item){
      return false;
    }

    const size=
      options.size
        ? String(options.size)
        : '';

    const variantId=
      options.variant
        ? String(options.variant)
        : '';

    if(
      type==='product' &&
      item.sizes.length &&
      !item.sizes
        .map(String)
        .includes(size)
    ){
      return false;
    }

    const variant=
      item.variants.find(
        entry=>
          entry.id===variantId
      );

    if(
      type==='product' &&
      item.variants.length &&
      !variant
    ){
      return false;
    }

    const resolved=
      variant
        ? {
            ...item,
            title:variant.title,
            price:variant.price,
            image:variant.image,
            variant:variant.id,
            variantLabel:
              variant.label
          }
        : item;

    if(
      type==='product' &&
      !Number.isFinite(
        resolved.price
      )
    ){
      return false;
    }

    const state=cart();

    const existing=
      state.find(
        entry=>
          sameLine(
            entry,
            type,
            id,
            size,
            variantId
          )
      );

    if(existing){
      existing.quantity+=quantity;
    }else{
      state.push({
        ...resolved,
        size:size||undefined,
        variant:
          variantId||undefined,
        quantity
      });
    }

    save(
      CART_KEY,
      state
    );

    update();

    window.SourceLabUI?.toast(
      `${resolved.title}${
        size
          ? ` · UK ${size}`
          : ''
      } added to cart`
    );

    window.SourceLabUI?.openCart();

    return true;
  }

  function remove(
    type,
    id,
    size='',
    variant=''
  ){

    save(
      CART_KEY,
      cart().filter(
        item=>
          !sameLine(
            item,
            type,
            id,
            size,
            variant
          )
      )
    );

    update();
  }

  function setQuantity(
    type,
    id,
    quantity,
    size='',
    variant=''
  ){

    const state=cart();

    const target=
      state.find(
        item=>
          sameLine(
            item,
            type,
            id,
            size,
            variant
          )
      );

    if(!target){
      return;
    }

    if(quantity<=0){
      return remove(
        type,
        id,
        size,
        variant
      );
    }

    target.quantity=
      Math.min(
        20,
        Math.max(
          1,
          quantity
        )
      );

    save(
      CART_KEY,
      state
    );

    update();
  }

  function count(){
    return cart().reduce(
      (sum,item)=>
        sum+item.quantity,
      0
    );
  }

  function subtotal(){
    return cart().reduce(
      (sum,item)=>
        sum+
        (
          item.price*
          item.quantity
        ),
      0
    );
  }

  function cartMarkup(full=false){

    const state=cart();

    if(!state.length){
      return `
        <div class="empty-cart">
          <span>0</span>

          <h3>
            Your cart is empty
          </h3>

          <p>
            Add a product or supplier
            when you are ready.
          </p>

          <a
            class="button button-primary"
            href="products.html"
          >
            Browse products
          </a>
        </div>
      `;
    }

    return `
      <div class="cart-items">

        ${
          state.map(item=>{

            const token=
              lineToken(item);

            return `
              <article class="cart-item">

                <div class="cart-thumb">

                  ${
                    item.image
                      ? `
                        <img
                          src="${item.image}"
                          alt=""
                        >
                      `
                      : `
                        <span>
                          ${
                            item.type
                              .slice(0,1)
                              .toUpperCase()
                          }
                        </span>
                      `
                  }

                </div>

                <div class="cart-item-copy">

                  <small>
                    ${item.category||item.type}

                    ${
                      item.variantLabel
                        ? ` · ${item.variantLabel}`
                        : ''
                    }

                    ${
                      item.size
                        ? ` · UK ${item.size}`
                        : ''
                    }
                  </small>

                  <h3>
                    ${item.title}
                  </h3>

                  <button
                    type="button"
                    data-cart-remove="${token}"
                  >
                    Remove
                  </button>

                </div>

                <div class="cart-item-side">

                  <strong>
                    ${
                      window.SourceLabData
                        .formatMoney(
                          item.price*
                          item.quantity
                        )
                    }
                  </strong>

                  <div class="quantity-control small">

                    <button
                      type="button"
                      data-cart-dec="${token}"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>

                    <span>
                      ${item.quantity}
                    </span>

                    <button
                      type="button"
                      data-cart-inc="${token}"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>

                  </div>

                </div>

              </article>
            `;

          }).join('')
        }

      </div>

      ${
        full
          ? ''
          : `
            <div class="drawer-total">

              <span>
                Subtotal
              </span>

              <strong>
                ${
                  window.SourceLabData
                    .formatMoney(
                      subtotal()
                    )
                }
              </strong>

              <small>
                Delivery is calculated
                at checkout.
              </small>

              <a
                class="button button-primary"
                href="cart.html"
              >
                View cart
              </a>

            </div>
          `
      }
    `;
  }


  /* ================================
     REAL CHECKOUT
     ================================ */

  async function checkout(){

    const state=cart();

    if(!state.length){

      window.SourceLabUI?.toast(
        'Your cart is empty'
      );

      return;
    }

    /*
     * Backend expects:
     *
     * {
     *   products: [
     *     { id: "...", qty: 1 }
     *   ]
     * }
     */

    const products=
      state.map(item=>({
        id:item.id,
        qty:
          Number(item.quantity)||1
      }));

    const button=
      document.querySelector(
        '[data-demo-checkout]'
      );

    if(button){

      button.disabled=true;

      button.setAttribute(
        'aria-busy',
        'true'
      );

      button.textContent=
        'Opening checkout...';
    }

    try{

      const response=
        await fetch(
          ORDER_URL,
          {
            method:'POST',

            headers:{
              'Content-Type':
                'application/json',
              'Accept':
                'application/json'
            },

            body:JSON.stringify({
              products
            })
          }
        );

      if(!response.ok){

        const errorText=
          await response
            .text()
            .catch(()=>'');

        throw new Error(
          `Order request failed: ${
            response.status
          } ${errorText}`
        );
      }

      const order=
        await response.json();

      console.log(
        'Order created:',
        order
      );

      const orderId=
        order.order_id ||
        order.orderId ||
        order.id;

      if(!orderId){

        console.error(
          'Invalid order response:',
          order
        );

        throw new Error(
          'Server did not return an order_id'
        );
      }

      const checkoutUrl=
        `${API_URL}/checkout/${
          encodeURIComponent(
            orderId
          )
        }`;

      window.location.href=
        checkoutUrl;

    }catch(error){

      console.error(
        'Checkout failed:',
        error
      );

      window.SourceLabUI?.toast(
        'Checkout failed. Please try again.'
      );

      if(button){

        button.disabled=false;

        button.removeAttribute(
          'aria-busy'
        );

        button.textContent=
          'Continue to checkout';
      }
    }
  }


  function update(){

    document
      .querySelectorAll(
        '[data-cart-count]'
      )
      .forEach(
        node=>
          node.textContent=count()
      );

    const drawer=
      document.querySelector(
        '[data-cart-drawer-content]'
      );

    if(drawer){
      drawer.innerHTML=
        cartMarkup(false);
    }

    const page=
      document.querySelector(
        '[data-cart-page]'
      );

    if(page){

      page.innerHTML=
        cartMarkup(true);

      const summary=
        document.querySelector(
          '[data-cart-summary]'
        );

      if(summary){

        summary.innerHTML=`
          <div>

            <span>
              Items (${count()})
            </span>

            <strong>
              ${
                window.SourceLabData
                  .formatMoney(
                    subtotal()
                  )
              }
            </strong>

          </div>

          <div>

            <span>
              Delivery
            </span>

            <strong>
              Calculated at checkout
            </strong>

          </div>

          <div class="summary-total">

            <span>
              Subtotal
            </span>

            <strong>
              ${
                window.SourceLabData
                  .formatMoney(
                    subtotal()
                  )
              }
            </strong>

          </div>

          <button
            class="button button-primary"
            type="button"
            data-demo-checkout
          >
            Continue to checkout
          </button>

          <p>
            Secure checkout.
          </p>
        `;
      }
    }

    refreshWishlist();
  }


  function selectedProductSize(id){

    const product=
      productById(id);

    if(
      !product?.sizes?.length
    ){
      return '';
    }

    const checked=
      document.querySelector(
        `[data-product-size="${id}"]:checked`
      );

    if(checked){
      return checked.value;
    }

    const selector=
      document.querySelector(
        '[data-size-selector]'
      );

    const error=
      document.querySelector(
        '[data-size-error]'
      );

    selector?.classList.add(
      'has-error'
    );

    if(error){
      error.hidden=false;
    }

    selector
      ?.querySelector('input')
      ?.focus();

    window.SourceLabUI?.toast(
      'Choose a UK size first'
    );

    return null;
  }


  function selectedProductVariant(id){

    const product=
      productById(id);

    if(
      !product?.variants?.length
    ){
      return '';
    }

    const checked=
      document.querySelector(
        `[data-product-variant="${id}"]:checked`
      );

    if(checked){
      return checked.value;
    }

    window.SourceLabUI?.toast(
      `Choose ${
        product.optionLabel
          ?.replace(
            /^Choose /i,
            ''
          ) ||
        'an option'
      } first`
    );

    document
      .querySelector(
        `[data-product-variant="${id}"]`
      )
      ?.focus();

    return null;
  }


  function toggleWishlist(id){

    const state=wishlist();

    const index=
      state.indexOf(id);

    if(index>=0){

      state.splice(
        index,
        1
      );

      window.SourceLabUI?.toast(
        'Removed from wishlist'
      );

    }else{

      state.push(id);

      window.SourceLabUI?.toast(
        'Saved to wishlist'
      );
    }

    save(
      WISHLIST_KEY,
      state
    );

    refreshWishlist();
  }


  function refreshWishlist(){

    const state=wishlist();

    document
      .querySelectorAll(
        '[data-wishlist-id]'
      )
      .forEach(button=>{

        const active=
          state.includes(
            button.dataset.wishlistId
          );

        button.classList.toggle(
          'active',
          active
        );

        button.setAttribute(
          'aria-pressed',
          active
            ? 'true'
            : 'false'
        );

        button.innerHTML=
          button.classList.contains(
            'text-wishlist'
          )
            ? (
                active
                  ? '♥ Saved to wishlist'
                  : '♡ Save to wishlist'
              )
            : (
                active
                  ? '♥'
                  : '♡'
              );
      });

    document
      .querySelectorAll(
        '[data-wishlist-count]'
      )
      .forEach(
        node=>
          node.textContent=
            state.length
      );
  }


  document.addEventListener(
    'click',
    event=>{

      const addProduct=
        event.target.closest(
          '[data-add-product]'
        );

      if(addProduct){

        const size=
          selectedProductSize(
            addProduct.dataset
              .addProduct
          );

        if(size===null){
          return;
        }

        const variant=
          selectedProductVariant(
            addProduct.dataset
              .addProduct
          );

        if(variant===null){
          return;
        }

        const qty=
          addProduct.dataset
            .quantityInput==='detail'
            ? Number(
                document.querySelector(
                  '[data-detail-qty]'
                )?.value||1
              )
            : 1;

        add(
          'product',
          addProduct.dataset
            .addProduct,
          qty,
          {
            size,
            variant
          }
        );

        return;
      }


      const buy=
        event.target.closest(
          '[data-buy-now]'
        );

      if(buy){

        const size=
          selectedProductSize(
            buy.dataset.buyNow
          );

        if(size===null){
          return;
        }

        const variant=
          selectedProductVariant(
            buy.dataset.buyNow
          );

        if(variant===null){
          return;
        }

        if(
          add(
            'product',
            buy.dataset.buyNow,
            Number(
              document.querySelector(
                '[data-detail-qty]'
              )?.value||1
            ),
            {
              size,
              variant
            }
          )
        ){
          location.href=
            'cart.html';
        }

        return;
      }


      const addSupplier=
        event.target.closest(
          '[data-add-supplier]'
        );

      if(addSupplier){

        add(
          'supplier',
          addSupplier.dataset
            .addSupplier
        );

        return;
      }


      const enrol=
        event.target.closest(
          '[data-enrol-course]'
        );

      if(enrol){

        add(
          'course',
          enrol.dataset
            .enrolCourse
        );

        return;
      }


      const bundle=
        event.target.closest(
          '[data-add-bundle]'
        );

      if(bundle){

        add(
          'bundle',
          bundle.dataset
            .addBundle
        );

        return;
      }


      const wish=
        event.target.closest(
          '[data-wishlist-id]'
        );

      if(wish){

        event.preventDefault();
        event.stopPropagation();

        toggleWishlist(
          wish.dataset
            .wishlistId
        );

        return;
      }


      const action=[
        'cartRemove',
        'cartDec',
        'cartInc'
      ].find(
        key=>
          event.target.closest(
            `[data-${
              key.replace(
                /[A-Z]/g,
                m=>
                  '-'+
                  m.toLowerCase()
              )
            }]`
          )
      );

      if(action){

        const attr=
          action.replace(
            /[A-Z]/g,
            m=>
              '-'+
              m.toLowerCase()
          );

        const button=
          event.target.closest(
            `[data-${attr}]`
          );

        const [
          type,
          id,
          size='',
          variant=''
        ]=
          button.dataset[action]
            .split(':');

        const item=
          cart().find(
            entry=>
              sameLine(
                entry,
                type,
                id,
                size,
                variant
              )
          );

        if(!item){
          return;
        }

        if(
          action==='cartRemove'
        ){
          remove(
            type,
            id,
            size,
            variant
          );
        }

        if(
          action==='cartDec'
        ){
          setQuantity(
            type,
            id,
            item.quantity-1,
            size,
            variant
          );
        }

        if(
          action==='cartInc'
        ){
          setQuantity(
            type,
            id,
            item.quantity+1,
            size,
            variant
          );
        }

        return;
      }


      /*
       * REAL CHECKOUT
       *
       * Replaces:
       * "Checkout is disabled in this demo"
       */

      const checkoutButton=
        event.target.closest(
          '[data-demo-checkout]'
        );

      if(checkoutButton){

        checkout();

        return;
      }

    }
  );


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
    document.readyState===
    'loading'
  ){

    document.addEventListener(
      'DOMContentLoaded',
      update
    );

  }else{

    update();

  }

})();
