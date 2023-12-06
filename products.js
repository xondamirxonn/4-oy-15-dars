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

    let { data } = await axios.post(
      "http://localhost:5050/api/v1/products",
      {
        nameUz,
        nameRu,
        colorUz,
        colorRu,
        price,
        descriptionUz,
        descriptionRu,
        image,
        category,
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      }
    );
    console.log(data);
  });


  let { datas } = await axios.get("http://localhost:5050/api/v1/products", {
    headers: {
      authorization: `Bearer ${localStorage.getItem("user-token")}`,
    },
  });
  datas.forEach(products => {
    let tr = document.createElement("tr")
    let nameu = document.createElement("td")
    let nameR = document.createElement("td")
    let colorU = document.createElement("td")
    let colorR = document.createElement("td");
    let pricee = document.createElement("td")
    let descriptionU = document.createElement("td")
    let descriptionR = document.createElement("td")
    let imagee = document.createElement("td")
    imagee.setAttribute("src", products.image)

    tr.append(nameu, nameR, colorU, colorR, pricee, descriptionU, descriptionR, imagee)
    tbody.append(tr)

  });

  let { data } = await axios.get("http://localhost:5050/api/v1/categories", {
    headers: {
      authorization: `Bearer ${localStorage.getItem("user-token")}`,
    },
  });

  data.forEach((catagory) => {
    let option = document.createElement("option");

    option.innerText = catagory.uz;
    option.setAttribute("value", catagory._id);
    select.append(option);
  });

  console.log(data);
});
