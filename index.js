import { getProducts, getProduct } from "./firebase.js";

const cart = []

let total= 0

const chekout=document.querySelector(".chekout")
const empty=document.querySelector(".empty")

const emptyCart= ()=>{
    total=0
    document.querySelector(".visualTotal").textContent=total;
 cart.lenght=0
document.querySelector(".innerCart").innerHTML=``

}
chekout.addEventListener("click",emptyCart)
empty.addEventListener("click",emptyCart)

const renderCart= ()=>{
    
    const innerCart=document.querySelector(".innerCart")
    innerCart.innerHTML=``;
    cart.forEach (product=>{
        const card=document.createElement("div");
        card.className="card mb-3"
        card.innerHTML=`
        <div class="row g-0">
        <div class="col-md-4">
          <img src=${product.data().img} class="img-fluid rounded-start" alt=${product.data().name}>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${product.data().name}</h5>
            <p class="card-text">${product.data().price}</p>
            <input type="number">
          </div>
        </div>
      </div>    
        
        `
        innerCart.append(card)
    })
}

const chekCart= (id)=> cart.some(product=> product.id=== id);

const updateTotal=(price)=>{
const visualTotal= document.querySelector(".visualTotal")
    total += parseInt(price);
visualTotal.textContent=total;
}

const addTocCart=async(e)=>{
    const productID=e.target.id
if (chekCart(productID)){
    return false
}    
else{
    const productToCart= await getProduct(e.target.id);
    updateTotal(productToCart.data().price);
    cart.push(productToCart);
    renderCart()
        }
     }
const addEvent = ()=>{
    const buyBtns= document.querySelectorAll(".buyBtn")
    buyBtns.forEach(btn =>{
    btn.addEventListener("click", addTocCart)
    }
    )
    }


const renderCards= async (productsArr)=>{
    const products= await productsArr
    const cards=document.querySelector(".cards")
    products.forEach(product => {
        const card=document.createElement("div");
        card.classList.add("col-sm-6","col-md-4", "col-lg-3", "card")
        card.innerHTML= `
        <img src=${product.data().img} class="card-img-top productImg" alt=${product.data().name}>
        <div class="card-body">
        <h5 class="card-text">${product.data().name}</h5>
        <p class="card-text">price:${product.data().price}</p>
        <a href="#" class="btn btn-primary buyBtn" id=${product.id}>buy</a>
    
        </div>
        `;
        cards.append(card);
    
    }
    )
    addEvent()

}
renderCards(getProducts());
