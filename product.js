const products = [
 {
   imageUrl: "img/products/f1.jpg",
   brand: "H&M",
   price: 78,
   incart: 0
 },
 {
  imageUrl: "img/products/f2.jpg",
  brand: "Louis Phillipe",
  price: 84,
  incart: 0
},
{
 imageUrl: "img/products/f3.jpg",
 brand: "Van Heusan",
 price: 65,
 incart: 0
},
{
 imageUrl: "img/products/f4.jpg",
 brand: "Neun",
 price: 57,
 incart: 0
},
{
 imageUrl: "img/products/f5.jpg",
 brand: "UCB",
 price: 78,
 incart: 0
},
{
 imageUrl: "img/products/f6.jpg",
 brand: "Zara",
 price: 102,
 incart: 0
},
{
 imageUrl: "img/products/f7.jpg",
 brand: "USPA",
 price: 75,
 incart: 0
},
{
 imageUrl: "img/products/f8.jpg",
 brand: "Roadster",
 price: 58,
 incart: 0
},
{
 imageUrl: "img/products/n1.jpg",
 brand: "H&M",
 price: 78,
 incart: 0
},
{
 imageUrl: "img/products/n2.jpg",
 brand: "Louis Phillipe",
 price: 84,
 incart: 0
},
{
 imageUrl: "img/products/n3.jpg",
 brand: "Van Heusan",
 price: 65,
 incart: 0
},
{
 imageUrl: "img/products/n4.jpg",
 brand: "Neun",
 price: 57,
 incart: 0
},
{
 imageUrl: "img/products/n5.jpg",
 brand: "UCB",
 price: 78,
 incart: 0
},
{
 imageUrl: "img/products/n6.jpg",
 brand: "Zara",
 price: 102,
 incart: 0
},
{
 imageUrl: "img/products/n7.jpg",
 brand: "USPA",
 price: 75,
 incart: 0
},
{
 imageUrl: "img/products/n8.jpg",
 brand: "Roadster",
 price: 58,
 incart: 0
}
];
// console.log(products);

Products.forEach((product) => {
 product.addEventListener('click', (e)=> {
  console.log(e.target);
  const index = parseInt(e.target.id);
  // console.log(index);
  
  const renderSection = document.getElementById('product');
  const overlay = document.getElementById('overlay');

  renderSection.classList.add('active');
  overlay.classList.add('active');

  renderEl = document.createElement('section');
  renderEl.className = "proDetails";
  renderEl.innerHTML = `
  <button id="closeBtn" class="close-btn">&times;</button>
  <div class="single-pro-image">
   <img src="${products[index].imageUrl}" width="100%" id="MainImg" alt="">
  </div>
  <div class="single-pro-details">
    <h6>Home/ t-Shrt</h6>
    <h4>Men's Fashion T-shirt</h4>
    <h2>${products[index].price}</h2>
    <div class="random">
     <select>
      <option>Select Size</option>
      <option>Small</option>
      <option>Medium</option>
      <option>Large</option>
      <option>XL</option>
      <option>XXL</option>
    </select>
    <input type="number" value="1">
   </div>
    <button class="addToCart" id="${index}">Add To Cart</button>
  </div>
  `;
  renderSection.append(renderEl);
  
  const closeBtn = document.getElementById('closeBtn');
  closeBtn.addEventListener('click', ()=> {
   renderSection.classList.remove('active');
   overlay.classList.remove('active');
   renderEl.innerHTML = ``;
  });
 })
})

//////////////////////////////Cart/////////////////////////////////////////
 
const cartBtn = Array.from(document.getElementsByClassName('cartBtn'));

console.log(cartBtn);

cartBtn.forEach((el)=>{
  el.addEventListener('click', (e)=>{
    const indx = parseInt(e.target.id);
    console.log(indx);
    cartNumbers(products[indx]);
    totalCost(products[indx]);
  });
});


// function onLoadCartNumbers(){
//   let ProductNumbers = localStorage.getItem('cartNumbers');

// }

function cartNumbers(prod){
  // console.log("The product cliked is", prod);
  let ProductNumbers = localStorage.getItem('cartNumbers');
  ProductNumbers = parseInt(ProductNumbers);

  if(ProductNumbers){
    localStorage.setItem('cartNumbers', ProductNumbers+1);
  }
  else{
    localStorage.setItem('cartNumbers', 1);
  }

  setItems(prod);
}

function setItems(prod){
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  if(cartItems!=null){
    if(cartItems[prod.brand] == undefined){
      cartItems = {
        ...cartItems,
        [prod.brand]: prod
      }
    }
    cartItems[prod.brand].incart += 1;
  }
  else{
    products.incart = 1;
    cartItems = {
      [prod.brand]: prod
    }
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems))
}

function totalCost(prod){
  console.log(prod.price);
  let cartCost = localStorage.getItem("totalCost");
  if(cartCost!=null){
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + (prod.price));
  }
  else{
    localStorage.setItem("totalCost", (prod.price));
  }
  
}

function displayCart(){
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let cartRenderSection = document.getElementById('tbody');
  let cartCost = localStorage.getItem("totalCost");

  if(cartItems && cartRenderSection){
    cartRenderSection.innerHTML = "";
    Object.values(cartItems).map(item =>{
      cartRenderSection.innerHTML += `
       <tr class="trow">
        <td><a href="#" class="delete"><i class="far fa-times-circle"></i></a></td>
        <td><img src="${item.imageUrl}" alt=""></td>
        <td>Printed Shirts</td>
        <td>$${item.price}</td>
        <td><input type="text" value="${item.incart}"></td>
        <td>$${item.incart*item.price}</td>
       </tr>
      `
      const cut = Array.from(document.getElementsByClassName('delete'));
      cut.forEach((ct)=>{
        ct.addEventListener('click', ()=>{
          const tdata = ct.parentElement;
          const trow = tdata.parentElement;
          console.log(trow);
          trow.innerHTML = "";
        })
      })
    });

  }
}

displayCart();



