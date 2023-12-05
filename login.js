document.addEventListener("DOMContentLoaded", async () => {
  let form = document.querySelector("form");
  let submitBtn = document.querySelector("#submit");

  axios.defaults.baseURL = `http://localhost:5050/api/v1/`;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let phoneNumber = form[0].value;
    let password = form[1].value;
    
    let {
      data: {token}
    } = await axios.post("/auth", { phoneNumber, password });
    localStorage.setItem("user-token", token );
    form.reset();
    console.log(token);
  });

  
  
});
