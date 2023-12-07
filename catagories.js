document.addEventListener("DOMContentLoaded", async () => {
  let form = document.querySelector("form");
  let tbody = document.querySelector("tbody");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let uz = form[0].value;
    let ru = form[1].value;
    let image = form[2].value;

    let { data } = await axios.post(
      "http://localhost:5050/api/v1/categories",
      {
        uz,
        ru,
        image,
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      }
    );

    form.reset();
    window.location.reload();
  });

  let { data } = await axios.get("http://localhost:5050/api/v1/categories", {
    headers: { authorization: `Bearer ${localStorage.getItem("user-token")}` },
  });

  data.forEach((catagory) => {
    let tr = document.createElement("tr");
    let ru = document.createElement("td");
    let uz = document.createElement("td");
    
    let image = document.createElement("img");
    image.setAttribute("src", catagory.image);

    ru.textContent = catagory.ru;
    uz.textContent = catagory.uz;
    
    image.style.width = "100px";
    image.style.height = "100px";

    tr.append(uz, ru, image);

    tbody.append(tr);
  });

  console.log(data);
});
