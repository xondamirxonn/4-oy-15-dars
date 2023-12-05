document.addEventListener("DOMContentLoaded", async () => {
  let form = document.querySelector("#form");
  let table = document.querySelector("table");
  let tbody = document.querySelector("tbody");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let name = form[0].value;
    let phoneNumber = form[1].value;
    let password = form[2].value;

    let data = await axios.post(
      "http://localhost:5050/api/v1/users",
      {
        name,
        phoneNumber,
        password,
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      }
    );

    
 
    form.reset();
    window.location.reload()

    
  });

 

  let data = await axios.get("http://localhost:5050/api/v1/users", {
    headers: { authorization: `Bearer ${localStorage.getItem("user-token")}` },
  });

  let datas = data.data


  datas.forEach((element) => {
    let tr = document.createElement("tr");
    let user = document.createElement("td");
    let phone = document.createElement("td")
    let password = document.createElement("td")
    let role = document.createElement("td")
    let clock = document.createElement("td")
    user.textContent = element.name;
    phone.textContent = element.phoneNumber;
    password.textContent = element.password
    role.textContent = element.role
  


    tr.append(user, phone, password, role);

    tbody.append(tr);
  });

  console.log(datas);

  
});


