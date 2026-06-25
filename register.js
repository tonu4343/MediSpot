const registerForm = document.getElementById("registerForm");

const getValue = (id) => document.getElementById(id)?.value.trim() || "";

const collectExtraDetails = (role) => {
  if (role === "seeker") {
    return {
      category: getValue("category"),
      desiredWork: getValue("desiredWork"),
      location: getValue("location"),
      experience: getValue("experience"),
      profileNote: getValue("profileNote")
    };
  }

  return {
    organizationName: getValue("organizationName"),
    facility: getValue("facility"),
    address: getValue("address"),
    phone: getValue("phone"),
    hiringNeeds: getValue("hiringNeeds")
  };
};

if (registerForm) {
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const role =
      getValue("role") ||
      document.querySelector('input[name="role"]:checked')?.value ||
      registerForm.dataset.role;
    const name = getValue("name") || getValue("contactName");
    const email = getValue("email");
    const password = document.getElementById("password")?.value || "";

    if (!role || !name || !email || !password) {
      alert("必須項目を入力してください。");
      return;
    }

    const submitButton = registerForm.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "登録中...";
    }

    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password
    });

    if (error) {
      alert(error.message);
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "登録する";
      }
      return;
    }

    const userId = data.user && data.user.id;
    if (!userId) {
      alert("確認メールを送信しました。メールを確認して登録を完了してください。");
      return;
    }

    const { error: profileError } = await supabaseClient.from("profiles").insert({
      id: userId,
      role,
      name,
      email
    });

    if (profileError) {
      alert("プロフィール登録に失敗しました。");
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "登録する";
      }
      return;
    }

    localStorage.setItem(
      `medispot:${role}:${userId}`,
      JSON.stringify(collectExtraDetails(role))
    );

    alert("登録が完了しました。");
    location.href = role === "seeker" ? "seeker-home.html" : "employer-home.html";
  });
}
