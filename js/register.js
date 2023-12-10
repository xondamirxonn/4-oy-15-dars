document.addEventListener("DOMContentLoaded" , async () => {
  let form = document.querySelector("form")

  form.addEventListener("submit" , async (e) => {
    e.preventDefault()
    let name = form[0].value;
    let phoneNumber = form[1].value;
    let password = form[2].value;
    
    let  data  = await axios.post(
      "http://localhost:5050/api/v1/auth/register",
      {
        name,
        phoneNumber,
        password,
      }
      
      );
      
      console.log(data);
      form.reset()
      window.location.replace("/pages/client-login.html")
    })
})