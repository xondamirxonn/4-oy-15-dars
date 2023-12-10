document.addEventListener("DOMContentLoaded", async () => {
  let userName = document.querySelector("#userName");
  let userNamee = document.querySelector("#userName2");
  let asosiyDiv = document.querySelector("#div");
  let search = document.querySelector("#search");
  let formText = document.querySelector("#form");
  let bio = document.querySelector("#bio")
  let bioText = document.querySelector("#bioText")
  let cart = document.querySelector("#cart");
  let logoutBtn = document.querySelector("#logout")
  let { data } = await axios.get("http://localhost:5050/api/v1/products", {
    headers: {
      authorization: `Bearer ${localStorage.getItem("client-token")}`,
    },

    
  });



  data.forEach((product) => {
    let div = document.createElement("div");
    let image = document.createElement("img");
    image.setAttribute("src", product.image);
    let name = document.createElement("h2");
    let color = document.createElement("p");
    let price = document.createElement("p");
    let description = document.createElement("p");
    let addCart = document.createElement("button");
    // let icon = document.createElement("i")
    // icon.classList.add("fa-solid" , "fa-cart-plus")
    addCart.textContent = "Add to Cart";
    addCart.classList.add("btn", "btn-primary", "mb-2", "w-75");
    // addCart.append(icon)
    image.textContent = product.image;
    name.textContent = product.name?.uz;
    color.textContent = product.color?.uz;
    price.textContent = "Price " + " $" + product.price;
    description.textContent = product.description?.uz;

    div.append(image, name, color, description, price, addCart);

    image.style.width = "180px";
    image.style.height = "180px";
    image.style.margin = "auto";
    image.style.padding = "10px";
    image.style.borderRadius = "20px";
    image.style.objectFit = "cover";
    div.style.border = "1px solid  black ";
    div.style.borderRadius = "10px";
    div.style.textAlign = "center";
    asosiyDiv.style.display = "grid";
    asosiyDiv.style.gap = "2rem";
    asosiyDiv.style.padding = "1rem";
    asosiyDiv.style.gridTemplateColumns = "repeat(5, 1fr)";

    asosiyDiv.append(div);

    if (!localStorage.getItem("client-token")) {
      userName.textContent = "Your account";
    }
    userName.addEventListener("click", async (e) => {
      if (!localStorage.getItem("client-token")) {
        window.location.replace("/pages/client-login.html");
      }
    });

    addCart.addEventListener("click", async (e) => {
      if (!localStorage.getItem("client-token")) {
        window.location.replace("/pages/client-login.html");
        return;
      }

      
    });

    

    addCart.addEventListener("click", () => addtoCart(product));
  });



  async function addtoCart(product) {
    let { data } = await axios.post(
      "http://localhost:5050/api/v1/clients/cart",
      {
        product: product._id,
        quantity: 1,
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("client-token")}`,
        },
      }
    );

    

    console.log(product._id);
    // addtoCart()
  }

  addtoCart();

  cart.addEventListener("click", async (e) => {
    if (!localStorage.getItem("client-token")) {
      return window.location.replace("/pages/client-login.html");
    }
  });

  async function UserGet() {
    let { data } = await axios.get("http://localhost:5050/api/v1/clients/me", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("client-token")}`,
      },
    });
    let h2 = document.createElement("h2");
    let offh2 = document.createElement("h2")
    let phone = document.createElement("h4")
    let user = document.textContent = "Your Username" 
    let phoneName = document.textContent = "Phone:"   
    h2.textContent = data.name;
    offh2.textContent =  data.name
    phone.textContent =   data.phoneNumber
    // console.log(data);
    userName.style.cursor = "pointer";
    userNamee.style.padding = "2rem"
    userName.append(h2);
    userNamee.append(user, offh2 ,phoneName, phone)
    console.log(data);


    formText.addEventListener("submit", (e) => {
      e.preventDefault();

        headers: {
        authorization: `Bearer ${localStorage.getItem("client-token")}`
      }
      
      bio.textContent = bioText.value;
      
      console.log(bio, bioText);
      
      formText.reset();
    });
    

   
   
  }

  UserGet();


  logoutBtn.addEventListener("click" , (e) => {
  e.preventDefault()

  localStorage.removeItem("client-token");
  window.location.replace("/pages/client-login.html")
  })

//  async function UserGet2() {
//    let { data } = await axios.get("http://localhost:5050/api/v1/clients/me", {
//      headers: {
//        authorization: `Bearer ${localStorage.getItem("client-token")}`,
//      },
//    });
//    let h2 = document.createElement("h2");
//    h2.textContent = data.name;
//    // console.log(data);
//    userNamee.style.cursor = "pointer";
//    userNamee.append(h2);
//  }

//  UserGet2();
 
  
  // console.log(data);
});

 