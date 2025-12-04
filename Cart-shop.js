let cafeList = document.getElementById('cafe-list');

let cafeMenuData = [
  {
    id:"promotionOne",
    name: "Kanell Bulle and Americano",
    price: 65, 
    imgSrc: "A_small_cup_of_coffee.jpeg"
  }, 
  {
    id:"promotionTwo",
     name: "Croissant With each coffee latte",
    price: 65, 
    imgSrc: "A_small_cup_of_coffee.jpeg"
  },
   {
    id:"promotionThree",
     name: "Family Expresso *2",
    price: 45, 
    imgSrc: "A_small_cup_of_coffee.jpeg"
   },
   {
    id:"promotionFour",
      name: "Cappuccino * 2",
    price: 70,
    imgSrc: "./images/A_small_cup_of_coffee.jpeg"
   }
]



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
    <i class="fa-sharp-duotone fa-regular fa-minus"></i> 
    <div class="quantity">0</div> 
    <i class="fa-sharp-duotone fa-regular fa-plus"></i> 
    </div> 
    </div> 
    </div> 
    </div>
    `
}).join(''));
};

generateProductMenu(); 
  