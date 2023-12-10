document.addEventListener("DOMContentLoaded", async () => {
  let form = document.querySelector("form");
  let tbody = document.querySelector("tbody");
  let select = document.querySelector("select");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    nameUz = form[0].value;
    nameRu = form[1].value;
    price = form[2].value;
    colorUz = form[3].value;
    colorRu = form[4].value;
    descriptionUz = form[5].value;
    descriptionRu = form[6].value;
    image = form[7].value;
    category = form[8].value;

    let newProduct = {
      name: {
        uz: nameUz,
        ru: nameRu,
      },
      color: {
        uz: colorUz,
        ru: colorRu,
      },
      price,
      description: {
        uz: descriptionUz,
        ru: descriptionRu,
      },
      image,
      category,
    };

    form.reset();
    window.location.reload();

    let { data: products } = await axios.post(
      "http://localhost:5050/api/v1/products",
      newProduct,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      }
    );
    console.log(products);
  });

  let { data: categories } = await axios.get(
    "http://localhost:5050/api/v1/categories",
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    }
  );

  categories.forEach((catagory) => {
    let option = document.createElement("option");

    option.innerText = catagory.uz;
    option.setAttribute("value", catagory._id);
    select.append(option);
  });

  let { data: products } = await axios.get(
    "http://localhost:5050/api/v1/products",
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    }
  );
  products.forEach((product) => {
    let tr = document.createElement("tr");
    let nameu = document.createElement("td");
    let nameR = document.createElement("td");
    let colorU = document.createElement("td");
    let colorR = document.createElement("td");
    let pricee = document.createElement("td");
    let descriptionU = document.createElement("td");
    let descriptionR = document.createElement("td");
    let img = document.createElement("td");
    let imagee = document.createElement("img");
    let catagories = document.createElement("td")
    imagee.setAttribute("src", product.image);
    nameu.textContent = product.name?.uz;
    console.log(product.name?.uz);
    nameR.textContent = product.name?.ru;
    pricee.textContent = product.price;
    colorU.textContent = product.color?.uz;
    colorR.textContent = product.color?.ru;
    descriptionU.textContent = product.description?.uz;
    descriptionR.textContent = product.description?.ru;
    imagee.innerHTML = product.image;
    catagories.textContent = product.category?.uz;
   

    imagee.style.width = "200px";
    imagee.style.height = "auto";

    // img.append(imagee);
    tr.append(
      nameu,
      nameR,
      pricee,
      colorU,
      colorR,
      descriptionU,
      descriptionR,
      imagee,
       catagories
    );
    tbody.append(tr);
  });

   logout.addEventListener("click", (e) => {
     e.preventDefault();

     localStorage.removeItem("user-token");
     window.location.replace("/pages/login.html");
   });

  console.log(products);
});
