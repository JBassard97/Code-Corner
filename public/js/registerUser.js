const registerUser = async (event) => {
  event.preventDefault();

  const newEmail = document.querySelector("#registerEmail").value.trim();
  const newUsername = document.querySelector("#registerUsername").value.trim();
  const newPassword = document.querySelector("#registerPassword").value.trim();
  const confirmPassword = document
    .querySelector("#confirmPassword")
    .value.trim();

  if (newEmail && newUsername && newPassword && confirmPassword) {
  }
};
