(function () {
  'use strict';

  const products = [
    { id:'air-force-one', title:'Air Force One', category:'Footwear', price:29.99, badge:'New', image:'assets/images/air-force-one-cutout.png', sizes:[6,7,8,9,10,11], optionLabel:'Choose colour', variantSummary:'White or Black · UK 6–11', defaultVariant:'white', summary:'Low-top trainers available in white or black.', description:'A low-top trainer with a panelled upper, cushioned collar and durable rubber sole.', specs:['White or black colour option','Panelled upper','Cushioned collar','UK sizes 6–11'], shipping:'Estimated dispatch: 2–4 working days.', returns:'Demo return window: 14 days from delivery.', variants:[
      { id:'white', label:'White', title:'Air Force One White', price:29.99, image:'assets/images/air-force-one-cutout.png', summary:'All-white low-top trainers for everyday wear.' },
      { id:'black', label:'Black', title:'Air Force One Black', price:29.99, image:'assets/images/air-force-one-black-cutout.png', summary:'All-black low-top trainers for everyday wear.' }
    ]},
    { id:'airpods-pro', title:'AirPods Pro', category:'Electronics', price:24.99, pricePrefix:'From ', badge:'New', image:'assets/images/airpods-pro-2.png', optionLabel:'Choose model', variantSummary:'Pro 2 or Pro 3', defaultVariant:'pro-2', summary:'Wireless in-ear headphones available as Pro 2 or Pro 3.', description:'Wireless in-ear headphones with a charging case. Check the serial number, product authenticity and condition independently before listing or reselling. Resale prices vary by condition and market demand.', specs:['Pro 2 or Pro 3 model option','Wireless in-ear design','Charging case included','Serial number supplied for verification'], shipping:'Estimated dispatch: 2–4 working days.', returns:'Demo return window: 14 days from delivery.', variants:[
      { id:'pro-2', label:'AirPods Pro 2', title:'AirPods Pro 2', price:24.99, image:'assets/images/airpods-pro-2.png', summary:'AirPods Pro 2 with a charging case and serial number for buyer verification.' },
      { id:'pro-3', label:'AirPods Pro 3', title:'AirPods Pro 3', price:39.99, image:'assets/images/airpods-pro-cutout.png', summary:'AirPods Pro 3 with a charging case and serial number for buyer verification.' }
    ]},
    { id:'air-max-95', title:'Air Max 95', category:'Footwear', price:44.99, badge:'New', image:'assets/images/air-max-95-neon-green.png', optionLabel:'Choose colour', variantSummary:'4 colourways', defaultVariant:'neon-green', summary:'Air Max 95 trainers available in four colourways.', description:'Air Max 95 trainers with a layered upper and visible Air cushioning. Select a colourway to view its matching product image.', specs:['Four colourways available','Layered upper','Visible Air cushioning'], shipping:'Availability and dispatch timing are confirmed before ordering.', returns:'Return terms are confirmed with your order.', variants:[
      { id:'neon-green', label:'Neon Green', title:'Air Max 95 Neon Green', price:44.99, image:'assets/images/air-max-95-neon-green.png', summary:'Air Max 95 in the Neon Green colourway.' },
      { id:'pink-foam', label:'Pink Foam', title:'Air Max 95 Pink Foam', price:44.99, image:'assets/images/air-max-95-pink-foam.png', summary:'Air Max 95 in the Pink Foam colourway.' },
      { id:'black', label:'Black', title:'Air Max 95 Black', price:44.99, image:'assets/images/air-max-95-black.png', summary:'Air Max 95 in the Black colourway.' },
      { id:'anthracite-granite', label:'Black / Anthracite / Granite / White', title:'Air Max 95 Black / Anthracite / Granite / White', price:44.99, image:'assets/images/air-max-95-anthracite-granite.png', summary:'Air Max 95 in Black, Anthracite, Granite and White.' }
    ]},
    { id:'nike-p6000', title:'Nike P-6000', category:'Footwear', price:34.99, badge:'New', image:'assets/images/nike-p6000-cool-grey.png', optionLabel:'Choose colour', variantSummary:'4 colourways', defaultVariant:'cool-grey', summary:'Nike P-6000 trainers available in four colourways.', description:'Nike P-6000 trainers with a layered running-inspired upper. Select a colourway to view its matching product image.', specs:['Four colourways available','Layered upper','Running-inspired profile'], shipping:'Availability and dispatch timing are confirmed before ordering.', returns:'Return terms are confirmed with your order.', variants:[
      { id:'cool-grey', label:'Cool Grey', title:'Nike P-6000 Cool Grey', price:34.99, image:'assets/images/nike-p6000-cool-grey.png', summary:'Nike P-6000 in the Cool Grey colourway.' },
      { id:'racer-blue', label:'Racer Blue / Anthracite', title:'Nike P-6000 Racer Blue / Anthracite', price:34.99, image:'assets/images/nike-p6000-racer-blue.png', summary:'Nike P-6000 in Racer Blue and Anthracite.' },
      { id:'black', label:'Black', title:'Nike P-6000 Black', price:34.99, image:'assets/images/nike-p6000-black.png', summary:'Nike P-6000 in Black.' },
      { id:'white', label:'White', title:'Nike P-6000 White', price:34.99, image:'assets/images/nike-p6000-white.png', summary:'Nike P-6000 in White.' }
    ]},
    { id:'polo-ralph-lauren-quarter-zip-fleece', title:'Polo Ralph Lauren 1/4 Zip Fleece', category:'Clothing', price:29.99, badge:'New', image:'assets/images/ralph-lauren-fleece-grey.png', optionLabel:'Choose colour', variantSummary:'2 colours', defaultVariant:'light-sport-heather', summary:'Polo Ralph Lauren quarter-zip fleece available in two colours.', description:'A Polo Ralph Lauren quarter-zip fleece. Select a colour to view its matching product image.', specs:['Quarter-zip design','Two colours available','Fleece construction'], shipping:'Availability and dispatch timing are confirmed before ordering.', returns:'Return terms are confirmed with your order.', variants:[
      { id:'light-sport-heather', label:'Light Sport Heather', title:'Polo Ralph Lauren 1/4 Zip Fleece — Light Sport Heather', price:29.99, image:'assets/images/ralph-lauren-fleece-grey.png', summary:'Polo Ralph Lauren quarter-zip fleece in Light Sport Heather.' },
      { id:'polo-black', label:'Polo Black', title:'Polo Ralph Lauren 1/4 Zip Fleece — Polo Black', price:29.99, image:'assets/images/ralph-lauren-fleece-black.png', summary:'Polo Ralph Lauren quarter-zip fleece in Polo Black.' }
    ]},
    { id:'ralph-lauren-puffer', title:'Ralph Lauren Puffer', category:'Clothing', price:49.99, badge:'New', image:'assets/images/ralph-lauren-puffer-black.png', optionLabel:'Choose colour', variantSummary:'3 colours', defaultVariant:'black', summary:'Ralph Lauren puffer jacket available in three finishes.', description:'A Ralph Lauren puffer jacket. Select a colour or finish to view its matching product image.', specs:['Three colour and finish options','Puffer construction','Full-length zip'], shipping:'Availability and dispatch timing are confirmed before ordering.', returns:'Return terms are confirmed with your order.', variants:[
      { id:'black', label:'Black', title:'Ralph Lauren Puffer — Black', price:49.99, image:'assets/images/ralph-lauren-puffer-black.png', summary:'Ralph Lauren puffer jacket in Black.' },
      { id:'blue', label:'Blue', title:'Ralph Lauren Puffer — Blue', price:49.99, image:'assets/images/ralph-lauren-puffer-blue.png', summary:'Ralph Lauren puffer jacket in Blue.' },
      { id:'gloss-black', label:'Gloss Black', title:'Ralph Lauren Puffer — Gloss Black', price:49.99, image:'assets/images/ralph-lauren-puffer-gloss-black.png', summary:'Ralph Lauren puffer jacket in Gloss Black.' }
    ]},
    { id:'jbl-flip', title:'JBL Flip', category:'Electronics', price:24.99, badge:'New', image:'assets/images/jbl-flip.png', summary:'Portable JBL Flip wireless speaker.', description:'A portable JBL Flip wireless speaker for music on the move.', specs:['Portable speaker','Wireless audio','Compact design'], shipping:'Availability and dispatch timing are confirmed before ordering.', returns:'Return terms are confirmed with your order.' },
    { id:'jean-paul-gaultier-le-male', title:'Jean Paul Gaultier Le Male', category:'Fragrance', price:39.99, badge:'New', image:'assets/images/jpg-le-male.png', summary:'Jean Paul Gaultier Le Male fragrance.', description:'Jean Paul Gaultier Le Male fragrance. Bottle size and availability are confirmed before ordering.', specs:['Men’s fragrance','Jean Paul Gaultier Le Male','Bottle size confirmed before ordering'], shipping:'Availability and dispatch timing are confirmed before ordering.', returns:'Return terms are confirmed with your order.' },
    { id:'dior-sauvage-extrait', title:'DIOR Sauvage Extrait', category:'Fragrance', price:54.99, badge:'New', image:'assets/images/dior-sauvage-extrait.png', summary:'DIOR Sauvage Extrait in a 100 ml bottle.', description:'DIOR Sauvage Extrait fragrance in a 100 ml bottle.', specs:['100 ml','DIOR Sauvage Extrait','Men’s fragrance'], shipping:'Availability and dispatch timing are confirmed before ordering.', returns:'Return terms are confirmed with your order.' }
  ];

  const suppliers = [
    { id:'airforce-supplier', category:'Footwear', title:'Air Force Supplier', price:19.99, oldPrice:39.99, badge:'Supplier access', image:'assets/images/airforce-supplier.png', description:'Supplier access for Air Force footwear sourcing, including contact details and practical checks to complete before ordering.', includes:['Supplier contact details','Ordering guidance','Footwear sourcing notes','Update notes'] },
    { id:'airpods-supplier', category:'Electronics', title:'AirPods Supplier', price:19.99, oldPrice:39.99, badge:'Supplier access', image:'assets/images/airpods-supplier.png', description:'Supplier access for AirPods sourcing, including contact details and practical checks to complete before ordering.', includes:['Supplier contact details','Ordering guidance','Product sourcing notes','Update notes'] },
    { id:'speaker-supplier', category:'Electronics', title:'Speaker Supplier', price:19.99, oldPrice:39.99, badge:'Supplier access', image:'assets/images/speaker-supplier.png', description:'Supplier access for portable speakers, including model, pricing and order-term checks.', includes:['Supplier contact details','Speaker sourcing notes','Ordering guidance','Update notes'] },
    { id:'ralph-lauren-supplier', category:'Clothing', title:'Ralph Lauren Supplier', price:19.99, oldPrice:39.99, badge:'Supplier access', image:'assets/images/ralph-lauren-supplier.png', description:'Supplier access for Ralph Lauren clothing, including quarter-zips, puffers and ordering checks.', includes:['Supplier contact details','Clothing sourcing notes','Ordering guidance','Update notes'] },
    { id:'fragrance-supplier', category:'Fragrance', title:'Fragrance Supplier', price:19.99, oldPrice:39.99, badge:'Supplier access', image:'assets/images/fragrance-supplier.png', description:'Supplier access for popular fragrances, including authenticity and order-term checks.', includes:['Supplier contact details','Authenticity checks','Fragrance sourcing notes','Update notes'] }
  ];

  const courses = [
    { id:'reselling-fundamentals', title:'Reselling Fundamentals', difficulty:'Beginner', lessons:14, duration:'2h 40m', price:39, description:'Build a clear, compliant foundation—from product selection to your first repeatable workflow.', tone:'blue', modules:[['Set your operating model','Choosing a focused category','The research-to-listing loop'],['Know your numbers','True landed cost','Setting a minimum margin'],['Build the habit','Weekly sourcing system','Reviewing what sells']] },
    { id:'profitable-products', title:'Finding Profitable Products', difficulty:'Intermediate', lessons:18, duration:'3h 15m', price:49, description:'Use demand signals, competition checks and cost discipline to assess product ideas.', tone:'cyan', modules:[['Read the market','Demand signals','Competition checks'],['Validate an idea','Comparable listings','Small-batch testing'],['Make the call','Risk scoring','Buy or pass']] },
    { id:'vinted-store', title:'Building Your Vinted Store', difficulty:'Beginner', lessons:12, duration:'2h 10m', price:35, description:'Create a consistent storefront, listing rhythm and customer experience.', tone:'violet', modules:[['Store foundations','Profile and policies','Visual consistency'],['Listing system','Titles that scan','Description template'],['Operations','Messages and offers','Dispatch routine']] },
    { id:'product-photography', title:'Product Photography & Listings', difficulty:'Beginner', lessons:16, duration:'2h 55m', price:45, description:'Shoot clearer product images and write listings that help buyers decide.', tone:'orange', modules:[['Simple studio','Light and backdrop','Essential angles'],['Edit with restraint','Crop and colour','Image order'],['Build the listing','Useful detail','Condition language']] },
    { id:'pricing-profit', title:'Pricing for Profit', difficulty:'Intermediate', lessons:11, duration:'1h 50m', price:39, description:'Set prices with fees, costs, positioning and sensible markdowns in view.', tone:'green', modules:[['Landed cost','Fees and packaging','Time cost'],['Price architecture','Floor and target','Offer strategy'],['Review','Markdown rules','Portfolio margin']] },
    { id:'scaling-business', title:'Scaling Your Reselling Business', difficulty:'Advanced', lessons:22, duration:'4h 20m', price:69, description:'Turn a working resale process into a measured, documented operation.', tone:'pink', modules:[['Find the constraint','Capacity map','What to automate'],['Document the system','Sourcing SOP','Listing SOP'],['Scale responsibly','Cash planning','Review cadence']] }
  ];

  const bundles = [
    { id:'starter-stack', title:'Starter Stack', price:79, oldPrice:103, label:'Build the foundation', items:['Reselling Fundamentals','Air Force Supplier','Pricing worksheet'] },
    { id:'growth-system', title:'SourceLab All Access', price:129, oldPrice:null, label:'Supplier access', featured:true, items:['Every supplier','Future directory updates','Category research','Ordering checklists'] },
    { id:'academy-pass', title:'Academy Pass', price:169, oldPrice:246, label:'Learn end to end', items:['All six demo courses','Future demo lesson updates','Course progress dashboard'] }
  ];

  const formatMoney = value => `£${Number(value).toFixed(2)}`;
  const displayPrice = item => Number.isFinite(item?.price) ? `${item.pricePrefix||''}${formatMoney(item.price)}` : item?.priceLabel||'Price on request';

  function productCard(product) {
    return `<article class="product-card reveal" data-card-id="${product.id}" data-product-tone="${product.id.includes('black')?'dark':'light'}">
      <div class="product-media">
        <a class="product-image-link" href="product.html?id=${product.id}" aria-label="View ${product.title}"><img src="${product.image}" alt="${product.title}" loading="lazy"></a>
        <button class="wishlist-button" type="button" data-wishlist-id="${product.id}" aria-label="Save ${product.title} to wishlist">♡</button>
        ${product.variants?.length?`<a class="quick-add" href="product.html?id=${product.id}">Choose options</a>`:product.sizes?.length?`<a class="quick-add" href="product.html?id=${product.id}">Choose size</a>`:Number.isFinite(product.price)?`<button class="quick-add" type="button" data-add-product="${product.id}">Add to cart</button>`:`<a class="quick-add" href="product.html?id=${product.id}">View product</a>`}
      </div>
      <div class="product-info"><div><p>${product.category}${product.variantSummary?` · ${product.variantSummary}`:product.sizes?.length?' · UK 6–11':''}</p><h3><a href="product.html?id=${product.id}">${product.title}</a></h3></div><strong>${displayPrice(product)}</strong></div>
    </article>`;
  }

  function supplierCard(supplier) {
    return `<article class="supplier-card ${supplier.image?'supplier-card-visual':''} reveal">
      ${supplier.image?`<a class="supplier-card-image" href="supplier.html?id=${supplier.id}" aria-label="View ${supplier.title}"><img src="${supplier.image}" alt="${supplier.title}" loading="lazy"></a>`:''}
      <div class="supplier-top"><span class="supplier-code">${supplier.category}</span><span class="digital-badge">${supplier.badge}</span></div>
      <div class="supplier-main"><h3>${supplier.title}</h3><p>${supplier.description}</p></div>
      <div class="supplier-bottom"><div class="supplier-price"><strong>${formatMoney(supplier.price)}</strong>${supplier.oldPrice?`<s>${formatMoney(supplier.oldPrice)}</s>`:''}</div><a href="supplier.html?id=${supplier.id}" aria-label="Buy access to ${supplier.title}">Buy</a></div>
    </article>`;
  }

  function courseCard(course) {
    return `<article class="course-card reveal">
      <a class="course-cover tone-${course.tone}" href="course.html?id=${course.id}">
        <span class="course-mark">SL<span>Academy</span></span><b>${String(course.lessons).padStart(2,'0')}</b><small>LESSONS</small>
      </a>
      <div class="course-body"><div class="course-meta"><span>${course.difficulty}</span><span>${course.duration}</span></div><h3>${course.title}</h3><p>${course.description}</p><div class="course-foot"><strong>${formatMoney(course.price)}</strong><a href="course.html?id=${course.id}">View course</a></div></div>
    </article>`;
  }

  function bundleCard(bundle) {
    return `<article class="bundle-card ${bundle.featured?'featured':''} reveal"><span class="bundle-label">${bundle.label}</span><h3>${bundle.title}</h3><div class="bundle-price"><strong>${formatMoney(bundle.price)}</strong><s>${formatMoney(bundle.oldPrice)}</s></div><ul>${bundle.items.map(item=>`<li>✓ ${item}</li>`).join('')}</ul><button class="button ${bundle.featured?'button-primary':'button-secondary'}" data-add-bundle="${bundle.id}">Add bundle</button></article>`;
  }

  function renderHome() {
    const featured = document.querySelector('[data-featured-products]');
    const filterTabs = document.querySelectorAll('[data-featured-filter]');
    if (featured) {
      const render = (category = 'All') => {
        const list = (category === 'All' ? products : products.filter(p => p.category === category)).slice(0,4);
        featured.innerHTML = list.map(productCard).join('');
        window.SourceLabUI?.refreshWishlist();
        window.SourceLabUI?.observeReveals();
      };
      render('All');
      filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          filterTabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          render(tab.dataset.featuredFilter);
        });
      });
    }
    const supplierPreview=document.querySelector('[data-supplier-preview]');
    if(supplierPreview){
      const categoryMap=suppliers.reduce((map,supplier)=>{if(!map.has(supplier.category))map.set(supplier.category,[]);map.get(supplier.category).push(supplier);return map;},new Map());
      const categories=[...categoryMap.entries()].map(([name,items],index)=>({name,items,index,image:items.find(item=>item.image)?.image||'',imageAlt:items.find(item=>item.image)?.title||''}));
      supplierPreview.innerHTML=categories.map((category,index)=>`<a class="supplier-category-row${index===0?' active':''}" href="suppliers.html?category=${encodeURIComponent(category.name)}" data-supplier-category="${category.name}" data-category-index="${index}" aria-label="Browse ${category.name} suppliers">
        <span class="supplier-category-number">${String(index+1).padStart(2,'0')}</span>
        <strong>${category.name}</strong>
        <span class="supplier-category-meta">${category.items.length} supplier${category.items.length===1?'':'s'}</span>
        <i aria-hidden="true">→</i>
      </a>`).join('');
      const visual=document.querySelector('[data-supplier-category-visual]');
      const renderVisual=category=>{if(!visual)return;visual.classList.toggle('has-image',Boolean(category.image));visual.innerHTML=`${category.image?`<img src="${category.image}" alt="${category.imageAlt}">`:''}<div><span>${String(category.index+1).padStart(2,'0')} / ${String(categories.length).padStart(2,'0')}</span><strong>${category.name}</strong><small>${category.items.length} supplier${category.items.length===1?'':'s'}</small></div>`;};
      const activate=row=>{supplierPreview.querySelectorAll('.supplier-category-row').forEach(item=>item.classList.toggle('active',item===row));renderVisual(categories[Number(row.dataset.categoryIndex)]);};
      supplierPreview.querySelectorAll('.supplier-category-row').forEach(row=>{row.addEventListener('mouseenter',()=>activate(row));row.addEventListener('focus',()=>activate(row));});
      renderVisual(categories[0]);
      const count=document.querySelector('[data-all-access-count]');if(count)count.textContent=`All ${suppliers.length} suppliers across ${categories.length} categories`;
    }
    const coursePreview=document.querySelector('[data-course-preview]'); if(coursePreview) coursePreview.innerHTML=courses.slice(0,3).map(courseCard).join('');
    const bundlePreview=document.querySelector('[data-bundle-preview]'); if(bundlePreview) bundlePreview.innerHTML=bundles.filter(bundle=>bundle.featured).map(bundleCard).join('');
  }

  function renderProductsPage() {
    const grid=document.querySelector('[data-products-grid]'); if(!grid) return;
    const heroCopy=document.querySelector('.page-hero>div>p');if(heroCopy)heroCopy.textContent='Browse the current footwear, clothing, electronics and fragrance range. Open a product to check its available options.';
    const search=document.querySelector('[data-product-search]'); const sort=document.querySelector('[data-product-sort]'); const filterRow=document.querySelector('.filter-row');
    const categories=['All',...new Set(products.map(product=>product.category))];
    if(filterRow)filterRow.innerHTML=categories.map((name,index)=>`<button class="${index===0?'active':''}" data-product-filter="${name}">${name}</button>`).join('');
    const resultMeta=document.querySelector('.result-line span:last-child');if(resultMeta)resultMeta.textContent='Footwear, clothing, electronics and fragrance';
    const filters=[...document.querySelectorAll('[data-product-filter]')];
    let category='All';
    const update=()=>{ let list=products.filter(p=>(category==='All'||p.category===category)&&(!search.value||`${p.title} ${p.category} ${p.summary} ${(p.variants||[]).map(v=>v.label).join(' ')}`.toLowerCase().includes(search.value.toLowerCase()))); if(sort.value==='price-low')list.sort((a,b)=>(Number.isFinite(a.price)?a.price:Infinity)-(Number.isFinite(b.price)?b.price:Infinity)); if(sort.value==='price-high')list.sort((a,b)=>(Number.isFinite(b.price)?b.price:-Infinity)-(Number.isFinite(a.price)?a.price:-Infinity)); if(sort.value==='name')list.sort((a,b)=>a.title.localeCompare(b.title)); grid.innerHTML=list.length?list.map(productCard).join(''):'<div class="empty-state"><h3>No products found</h3><p>Try another search or category.</p></div>'; document.querySelector('[data-result-count]').textContent=`${list.length} product${list.length===1?'':'s'}`; window.SourceLabUI?.refreshWishlist(); window.SourceLabUI?.observeReveals(); };
    search.addEventListener('input',update); sort.addEventListener('change',update); filters.forEach(button=>button.addEventListener('click',()=>{filters.forEach(b=>b.classList.remove('active'));button.classList.add('active');category=button.dataset.productFilter;update();})); update();
  }

  function renderProductDetail() {
    const root=document.querySelector('[data-product-detail]'); if(!root) return;
    const params=new URLSearchParams(location.search);
    const legacy={
      'air-force-one-white':{id:'air-force-one',variant:'white'},
      'air-force-one-black':{id:'air-force-one',variant:'black'},
      'airpods-pro-2':{id:'airpods-pro',variant:'pro-2'},
      'airpods-pro-3':{id:'airpods-pro',variant:'pro-3'}
    };
    const requestedId=params.get('id')||products[0].id;
    const mapped=legacy[requestedId];
    const product=products.find(item=>item.id===(mapped?.id||requestedId))||products[0];
    const variants=product.variants||[];
    const requestedVariant=params.get('variant')||mapped?.variant||product.defaultVariant;
    const initialVariant=variants.find(item=>item.id===requestedVariant)||variants[0];
    document.title=`${product.title} — SourceLab`;
    const gallery=variants.length?variants:[{id:'default',title:product.title,image:product.image,price:product.price,priceLabel:product.priceLabel,summary:product.summary}];
    const variantSelector=variants.length?`<fieldset class="variant-selector"><legend>${product.optionLabel||'Choose an option'}</legend><div class="variant-options">${variants.map(variant=>`<label><input type="radio" name="product-variant" value="${variant.id}" data-product-variant="${product.id}" ${variant.id===initialVariant.id?'checked':''}><span>${variant.label}</span></label>`).join('')}</div></fieldset>`:'';
    const sizeSelector=product.sizes?.length?`<fieldset class="size-selector" data-size-selector><legend>Choose your UK size</legend><div class="size-options">${product.sizes.map(size=>`<label><input type="radio" name="product-size" value="${size}" data-product-size="${product.id}"><span>UK ${size}</span></label>`).join('')}</div><p class="size-error" data-size-error hidden>Please select a UK size before adding to cart.</p></fieldset>`:'';
    const canBuy=Number.isFinite(initialVariant?.price??product.price);
    const purchaseControls=canBuy?`<div class="quantity-row"><span>Quantity</span><div class="quantity-control"><button type="button" data-qty-minus aria-label="Decrease quantity">−</button><input data-detail-qty type="number" value="1" min="1" max="20" aria-label="Quantity"><button type="button" data-qty-plus aria-label="Increase quantity">+</button></div></div><div class="detail-actions"><button class="button button-primary" type="button" data-add-product="${product.id}" data-detail-add>Add to cart</button><button class="button button-secondary" type="button" data-buy-now="${product.id}">Buy now</button></div>`:`<div class="detail-actions"><a class="button button-primary" href="contact.html">Contact for price</a></div>`;
    root.innerHTML=`<div class="breadcrumbs"><a href="products.html">Products</a><span>/</span><span>${product.title}</span></div><div class="product-detail-grid"><div class="gallery"><div class="gallery-main" data-product-id="${product.id}"><img src="${initialVariant?.image||product.image}" alt="${initialVariant?.title||product.title}" data-gallery-main></div><div class="gallery-thumbs">${gallery.map((item,i)=>`<button type="button" class="${item.id===(initialVariant?.id||'default')?'active':''}" data-variant-thumb="${item.id}" aria-label="Show ${item.title}"><img src="${item.image}" alt=""></button>`).join('')}</div></div><div class="product-copy"><p class="eyebrow"><span></span>${product.category}</p><h1 class="detail-title">${product.title}</h1><div class="detail-price" data-detail-price>${displayPrice(initialVariant?{...product,...initialVariant}:product)}</div><p class="detail-lede" data-detail-lede>${initialVariant?.summary||product.summary}</p>${variantSelector}${sizeSelector}${purchaseControls}<button class="text-wishlist" type="button" data-wishlist-id="${product.id}">♡ Save to wishlist</button><div class="trust-strip"><span>Availability and delivery are confirmed before ordering.</span><span>Checkout is disabled in this demo.</span></div></div></div><div class="detail-tabs" data-tabs><div class="tab-list" role="tablist"><button class="active" data-tab-target="description" role="tab">Description</button><button data-tab-target="specifications" role="tab">Specifications</button><button data-tab-target="shipping" role="tab">Shipping</button><button data-tab-target="returns" role="tab">Returns</button></div><div class="tab-panel active" data-tab-panel="description"><p>${product.description}</p></div><div class="tab-panel" data-tab-panel="specifications"><ul>${product.specs.map(item=>`<li>${item}</li>`).join('')}</ul></div><div class="tab-panel" data-tab-panel="shipping"><p>${product.shipping}</p></div><div class="tab-panel" data-tab-panel="returns"><p>${product.returns}</p></div></div>`;
    const updateVariant=variantId=>{
      const variant=variants.find(item=>item.id===variantId)||initialVariant;
      if(!variant)return;
      const main=root.querySelector('[data-gallery-main]');main.src=variant.image;main.alt=variant.title;
      root.querySelector('[data-detail-price]').textContent=displayPrice({...product,...variant});
      root.querySelector('[data-detail-lede]').textContent=variant.summary||product.summary;
      root.querySelectorAll('[data-variant-thumb]').forEach(button=>button.classList.toggle('active',button.dataset.variantThumb===variant.id));
      const url=new URL(location.href);url.searchParams.set('id',product.id);url.searchParams.set('variant',variant.id);history.replaceState(null,'',url);
    };
    root.querySelectorAll('[data-product-variant]').forEach(input=>input.addEventListener('change',()=>updateVariant(input.value)));
    root.querySelectorAll('[data-variant-thumb]').forEach(button=>button.addEventListener('click',()=>{const input=root.querySelector(`[data-product-variant="${product.id}"][value="${button.dataset.variantThumb}"]`);if(input)input.checked=true;updateVariant(button.dataset.variantThumb);}));
    if(initialVariant)updateVariant(initialVariant.id);
    root.querySelectorAll('[data-product-size]').forEach(input=>input.addEventListener('change',()=>{root.querySelector('[data-size-selector]')?.classList.remove('has-error');const error=root.querySelector('[data-size-error]');if(error)error.hidden=true;}));
    const qty=root.querySelector('[data-detail-qty]'); if(qty){root.querySelector('[data-qty-minus]').addEventListener('click',()=>qty.value=Math.max(1,Number(qty.value)-1));root.querySelector('[data-qty-plus]').addEventListener('click',()=>qty.value=Math.min(20,Number(qty.value)+1));root.querySelector('[data-detail-add]').dataset.quantityInput='detail';} window.SourceLabUI?.refreshWishlist();
  }

  function renderSuppliersPage() {
    const grid=document.querySelector('[data-suppliers-grid]'); if(!grid) return; const buttons=[...document.querySelectorAll('[data-supplier-filter]')]; const available=new Set(suppliers.map(s=>s.category)); const requested=new URLSearchParams(location.search).get('category'); const initial=requested&&available.has(requested)?requested:'All'; const draw=category=>{const list=category==='All'?suppliers:suppliers.filter(s=>s.category===category);grid.innerHTML=list.map(supplierCard).join('');window.SourceLabUI?.observeReveals();}; buttons.forEach(button=>button.addEventListener('click',()=>{buttons.forEach(b=>b.classList.remove('active'));button.classList.add('active');draw(button.dataset.supplierFilter);})); buttons.forEach(button=>button.classList.toggle('active',button.dataset.supplierFilter===initial)); draw(initial);
  }

  function renderSupplierDetail() {
    const root=document.querySelector('[data-supplier-detail]'); if(!root)return;const id=new URLSearchParams(location.search).get('id')||suppliers[0].id;const supplier=suppliers.find(item=>item.id===id)||suppliers[0];document.title=`${supplier.title} — SourceLab Supplier Hub`;const price=`<div class="detail-price supplier-detail-price"><strong>${formatMoney(supplier.price)}</strong>${supplier.oldPrice?`<s>${formatMoney(supplier.oldPrice)}</s>`:''}</div>`;const cover=supplier.image?`<aside class="resource-card resource-card-visual"><img src="${supplier.image}" alt="${supplier.title}"></aside>`:`<aside class="resource-card"><span class="resource-number">${supplier.category}</span><h3>Supplier access</h3><p>Contact information, practical checks and notes to use before you order.</p><span>${supplier.badge}</span></aside>`;root.innerHTML=`<div class="breadcrumbs"><a href="suppliers.html">Supplier Hub</a><span>/</span><span>${supplier.category}</span></div><div class="supplier-detail-hero"><div><p class="eyebrow"><span></span>${supplier.category} supplier</p><h1 class="detail-title">${supplier.title}</h1><p class="detail-lede">${supplier.description}</p>${price}<button class="button button-primary" type="button" data-add-supplier="${supplier.id}">Buy access</button><p class="microcopy">Purchases are disabled in this demo.</p></div>${cover}</div><div class="supplier-detail-grid"><div><section class="content-block"><p class="section-index">Included</p><h2>What's included</h2><ul class="check-list">${supplier.includes.map(item=>`<li>✓ ${item}</li>`).join('')}<li>✓ Supplier review notes</li><li>✓ Responsible sourcing reminders</li></ul></section><section class="content-block"><p class="section-index">Who it helps</p><h2>Who it's for</h2><p>Resellers who want a starting point before running their own product, commercial and compliance checks.</p></section><section class="content-block"><p class="section-index">Account access</p><h2>How access works</h2><ol class="number-list"><li><b>01</b><span>Buy access through a secure checkout.</span></li><li><b>02</b><span>SourceLab adds the supplier to your account.</span></li><li><b>03</b><span>View the details inside My Suppliers.</span></li></ol><p class="updated">Demo content · September 2026</p></section></div><aside class="locked-card"><div class="lock-icon">⌁</div><p class="section-index">Private supplier details</p><h2>Supplier access required</h2><p>Buy access to view this supplier's information in your SourceLab account.</p><div class="locked-lines"><span></span><span></span><span></span></div><button class="button button-primary" type="button" data-add-supplier="${supplier.id}">Buy access</button></aside></div>`;
  }

  function renderAcademyPage(){const grid=document.querySelector('[data-course-grid]');if(grid)grid.innerHTML=courses.map(courseCard).join('');}

  function renderCourseDetail(){const root=document.querySelector('[data-course-detail]');if(!root)return;const id=new URLSearchParams(location.search).get('id')||courses[0].id;const course=courses.find(item=>item.id===id)||courses[0];document.title=`${course.title} — SourceLab Academy`;root.innerHTML=`<div class="breadcrumbs"><a href="academy.html">Academy</a><span>/</span><span>${course.title}</span></div><section class="course-detail-hero"><div><p class="eyebrow"><span></span>SourceLab Academy</p><h1 class="detail-title">${course.title}</h1><p class="detail-lede">${course.description}</p><div class="course-stats"><span><small>Level</small>${course.difficulty}</span><span><small>Duration</small>${course.duration}</span><span><small>Lessons</small>${course.lessons}</span></div><div class="detail-actions"><button class="button button-primary" type="button" data-enrol-course="${course.id}">Enrol for ${formatMoney(course.price)}</button><a class="button button-secondary" href="course.html?id=${course.id}&mode=learn">Preview course</a></div></div><div class="course-cover course-cover-large tone-${course.tone}"><span class="course-mark">SL<span>Academy</span></span><b>${String(course.lessons).padStart(2,'0')}</b><small>LESSONS</small></div></section><section class="course-layout"><div><div class="content-block"><p class="section-index">Course outcomes</p><h2>What you'll learn</h2><ul class="check-list"><li>✓ Build a workflow you can use each week</li><li>✓ Compare costs, demand and competition</li><li>✓ Keep clear notes on your process</li><li>✓ Follow responsible sourcing and marketplace rules</li></ul></div><div class="content-block"><p class="section-index">Course content</p><h2>Modules</h2><div class="module-list">${course.modules.map((module,i)=>`<details ${i===0?'open':''}><summary><span>0${i+1}</span><b>${module[0]}</b><small>${module.length-1} lessons</small></summary>${module.slice(1).map((lesson,j)=>`<p><i>${i+1}.${j+1}</i>${lesson}<span>Preview</span></p>`).join('')}</details>`).join('')}</div></div></div><aside class="enrol-card"><p>Course access</p><strong>${formatMoney(course.price)}</strong><ul><li>✓ ${course.lessons} lessons</li><li>✓ Progress saved on this device</li><li>✓ View progress in your workspace</li></ul><button class="button button-primary" type="button" data-enrol-course="${course.id}">Enrol now</button></aside></section>`;}

  function renderBundles(){const grid=document.querySelector('[data-bundles-grid]');if(grid)grid.innerHTML=bundles.map(bundleCard).join('');}

  function init(){const page=document.body.dataset.page;renderHome();if(page==='products')renderProductsPage();if(page==='product')renderProductDetail();if(page==='suppliers')renderSuppliersPage();if(page==='supplier')renderSupplierDetail();if(page==='academy')renderAcademyPage();if(page==='course')renderCourseDetail();if(page==='bundles')renderBundles();}

  window.SourceLabData={products,suppliers,courses,bundles,formatMoney,displayPrice,productCard,supplierCard,courseCard,bundleCard};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
