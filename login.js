document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert("ログインに失敗しました");
    return;
  }

  const userId = data.user.id;

  const { data: profile } = await supabaseClient
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (profile.role === "seeker") {
    location.href = "seeker-home.html";
  } else {
    location.href = "employer-home.html";
  }
});