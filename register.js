document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const role = document.querySelector('input[name="role"]:checked').value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  const userId = data.user.id;

  await supabaseClient.from("profiles").insert({
    id: userId,
    role,
    name,
    email
  });

  alert("登録が完了しました");

  if (role === "seeker") {
    location.href = "seeker-home.html";
  } else {
    location.href = "employer-home.html";
  }
});