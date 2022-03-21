const postContender = async (e) => {
  e.preventDefault();

  const formData = new FormData(document.querySelector("form"));

  const password = formData.get("password");
  const password2 = formData.get("password2");

  if (password == password2) {
    axios.post("/contenders", formData).then(
      (value) => {
        return (window.location.href = "/");
      },
      (reason) => {
        console.log(reason);
      }
    );
  } else {
    alert("Passwords deben coincidir.");
  }
};

const login = async (e) => {
  e.preventDefault();

  const formData = new FormData(document.querySelector("form"));

  // console.log(formData);
  // console.log(formData.get('email'));
  // console.log(formData.get('password'));

  console.log(formData);

  axios.post("/login", formData).then(
    (value) => {
      console.log(value);
      return (window.location.href = "/edit");
    },
    (reason) => {
      console.log(reason);
    }
  );
};

const putContender = (e) => {
  e.preventDefault();

  const formData = new FormData(document.querySelector("form"));

  const password = formData.get("password");
  const password2 = formData.get("password2");

  console.log(password);

  if (password == password2) {
    axios.put("/edit", formData).then(
      (value) => {
        console.log(value);
        window.location.href = "/";
      },
      (reason) => {
        console.log(reason);
      }
    );
  } else {
    alert("Passwords deben coincidir.");
  }
};

const deleteContender = (e) => {
  e.preventDefault();

  const formData = new FormData(document.querySelector("form"));

  const password = formData.get("password");
  const password2 = formData.get("password2");

  const email = formData.get("email");

  console.log(email);

  if (password == password2) {
    axios
      .delete("/edit/delete", {
        data: {
          email,
        },
      })
      .then(
        (value) => {
          console.log(value);
          window.location.href = "/";
        },
        (reason) => {
          console.log(reason);
        }
      );
  } else {
    alert("Passwords deben coincidir.");
  }
};

// const statusChange = (this) => {
//   console.log(this.checked);
// }
