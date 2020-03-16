// getting variables
const cartBtn = document.getElementById("shoppingCart");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDom = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartGoodies = document.querySelector(".cart-goodies");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productDom = document.querySelector(".products-center");
import items[] from "./../reactions/products.json";


// creating a cart that contains all the information, this is in form of an array.
let cart = [];
// buttons
let buttonsDom = [];
// creating a class for getting the products
class Products{
    async getProducts(){
      try {
        let result = items[]; await fetch("../reactions/products.json");
        let data = await result.json();

        let products = data.items;
        products = products.map(item =>{
          const {title, price} = item.field;
          const {id} = item.sys;
          const image = item.field.image.fields.file.url;
          return{title, price, id, image};
        })
        return products;
      } catch (error) {
          console.log(error);
      }
  }
}
// creating a class of UI that takes care of what is being displayed when the cart is clicked
 class UI{
    displayProducts(products){
      let result = "";
      products.forEach(products =>{
        result += `
        <!-- single product -->
          <div class="p1 col-2 col-lg-2 col-md-2 col-sm-2">
            <div class= "product-top">
              <img src= ${products.image}>
              <div class="overlay">
                <button type="button" class="btn btn-secondary" title="Add to wishlist"><i class="fa fa-eye"></i></button>
                <button type="button" class="btn btn-secondary" title="Quick shop"><i class="fa fa-heart-o"></i></button>
                <button type="button" class="btn btn-secondary" title="Add to Cart" data-id = ${products.id}><i class="fa fa-shopping-cart"></i></button>
              </div>
            </div>
            <div class="words">
              <span id="ratings">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star-half-o"></i>
                <i class="fa fa-star-o"></i>
              </span>
              <h4>${products.title}</h4>
              <h6>#${products.price}</h6>
            </div>
          </div>`;
      });
      productsDom.innerHTML = result;
    }
      getCartButtons(){
        const buttons = [...document.querySelectorAll("cart-btn")];
        buttonsDom = buttons;
        buttons.forEach(button =>{
          let id= button.dataset.id;
          let inCart = cart.find (item =>item.id === id);
          if(inCart){
            button.title = "In Cart";
            button.disabled = true;
          }
            button.addEventListener(click, event=>{
                event.button.title = "In Cart"; //changing button title on click
                event.button.disbled = true;
                //get the product of the particular button clicked from products
                let cartItem = {...Storage.getProduct(id), amount: 1}; //using spread operator to get product by id and setting it equal to an object cartItem.
                //add product to cart
                cart = [...cart, cartItem]; //adding the content of cartItem to the cart array
                //save cart in local Storage
                Storage.saveCart(cart);
                //set cart values
                this.setCartValues(cart);
                //display cart item
                this.addCartItem(cartItem);
                //show the cart.
                this.showCart();
            });
        })
        }
        //creating an object the set the values in the cart.
        setCartValues(cartDom){
          let itemTotal = 0;
          let checkOutTotal = 0;
          cart.map(item =>{
            checkOutTotal += item.price * item.amount;
            itemTotal += item.amount;
          })
          cartTotal.innerText = parseFloat(checkOutTotal.toFixed(2));
          cartGoodies.innerText = itemTotal;
        }
        //adding cart item
        addCartItem(item){
            const div = document.createElement("div");
            div.classList.add("cart-item");
            div.innerHTML = `
                <div class="cart-item">
                  <img src=${item.image} id="pro">
                </div>
                <div class="cart-details">
                  <h4>${item.title}</h4>
                  <h5>#${item.price}</h5>
                  <span class="remove-item" data-id =${item.id}>remove</span>
                </div>
                <div class="cart-count">
                  <i class="fa fa-chevron-up" data-id =${item.id}></i>
                  <p class="item-amount">${item.amount}</p>
                  <i class="fa fa-chevron-down" data-id =${item.id}></i>
                </div>`
            cartContent.appendChild(div);
        }
      //showing the cart
      showCart(){
        cartOverlay.classList.add("transparentBcg");
        cartDom.classList.add("showCart");
      }
    //setting the cart
      setUpApp(){

      }

}
// local storage where different data is drawn from.
class Storage{
  static saveProducts(products){
    localStorage.setItem("products", JSON.stringify(products)); // saving data in local storage in JSON format.
  }
  static getProduct(id){
    let products = JSON.parse(localStorage.getItem(products)); //getting the strings of data in JSON format from local storage and returning a javascript object to the variable "products".
    return products.find(product => product.id === id);
  }
  static saveCart(cart){
    localStorage.setItem("cart", JSON.stringify(cart)); // saving cart content in local storage in JSON format.
  }
}
// adding an event listener
document.addEventListener("DOMContentLoaded", ()=>{
  const Ui = new UI();
  const products = new Products();
// get all Products
  products.getProducts().then(products =>{
    Ui.displayProducts(products);
    Storage.saveProducts(products);
  }).then(()=>{
    Ui.getCartButtons()
  });
});
