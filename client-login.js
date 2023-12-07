document.addEventListener("DOMContentLoaded", async () => {
let form = document.querySelector("form")

form.addEventListener("submit", async (e) => {
  e.preventDefault()

  let phoneNumber = form[0].value;
  let password = form[1].value;

  let {data} = await axios.post(
    "http://localhost:5050/api/v1/auth/client-login",
    {
      phoneNumber,
      password,
    },

  );
console.log(data.token);

localStorage.setItem("client-token" , data.token)

form.reset()

if(localStorage.getItem("client-token" , data.token))  window.location.replace("index.html")

})

})