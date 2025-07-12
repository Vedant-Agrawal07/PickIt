document.querySelector(".login_button").addEventListener("click", () => {
  let html = `
        <p>Email</p>
        <input class="L_email" type="email" name="email">
        <br>
        <p>Password</p>
        <input class="L_password" type="password">
        <br>
        <br>
        <button class="login_submit_button">Submit</button>
      `;

  document.querySelector(".main").innerHTML = html;
  login();
});
document.querySelector(".signup_button").addEventListener("click", () => {
  let html = ` 
   <p>Name</p>
        <input class="S_name" type="text" name="name">
        <br>
   <p>Email</p>
        <input class="S_email" type="email" name="email">
        <br>
        <p>Password</p>
        <input class="S_password" type="password">
        <br>
        <p>Confirm Password</p>
        <input class="S_Cpassword" type="password">
        <br>
        <br>
        <button class="signup_submit_button">Submit</button>`;

  document.querySelector(".main").innerHTML = html;
  signUp();
});


function signUp() {
  document
    .querySelector(".signup_submit_button")
    .addEventListener("click", async () => {
      let name = document.querySelector(".S_name").value;
      let email = document.querySelector(".S_email").value;
      let password = document.querySelector(".S_password").value;
      let confirmPassword = document.querySelector(".S_Cpassword").value;

      if (password !== confirmPassword) {
        alert("password and confirm password don't match");
      } else {
        if (!name || !email || !password || !confirmPassword) {
          alert("PLEASE FILL ALL FIELDS");
        } else {
          let { data } = await axios.post("http://localhost:5000/api/user", {
            name: name,
            email: email,
            password: password,
          });

          console.log(data);
          localStorage.setItem("user", JSON.stringify(data));
          window.location.href = "pickIt.html";
        }
      }
    });
}


function login() {
  document
    .querySelector(".login_submit_button")
    .addEventListener("click", async () => {
      let email = document.querySelector(".L_email").value;
      let password = document.querySelector(".L_password").value;

      if (!email || !password) {
        alert("PLEASE FILL ALL FIELDS");
      } else {
        let { data } = await axios.post(
          "http://localhost:5000/api/user/login",
          {
            email: email,
            password: password,
          }
        );

        console.log(data);
        localStorage.setItem("user", JSON.stringify(data));
        window.location.href = "pickIt.html";
      }
    });
}

if (JSON.parse(localStorage.getItem("user"))) {
  window.location.href = "pickIt.html";
}
