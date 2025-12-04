inport { cafeMenuData } from "./data.js";



let cafeList = document.getElementById('cafe-list');

let generateProductMenu =()=>{
return (cafeList.innerHTML = cafeMenuData.map((x)=>{
  let {id, name, price, imgSrc} =x
return `
<div id=product-id-${id} class="item"> 
<img src="${imgSrc} ">
 <div class="details"> 
  <h3>${name}</h3> 
 <div class="price-quantity">
  <h2>$ ${price}</h2>
   <div class="buttons">
    <i onclick="decrement()" class="fa-sharp-duotone fa-regular fa-minus"></i> 
    <div id=${id} class="quantity">0</div> 
    <i onclick="increment()" class="fa-sharp-duotone fa-regular fa-plus"></i> 
    </div> 
    </div> 
    </div> 
    </div>
    `
}).join(''));
};

generateProductMenu(); 

let increment = () => {

};

let decrement = () => {
  
};

let update = () => {};
  