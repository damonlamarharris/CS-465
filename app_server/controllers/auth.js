// app_server/controllers/auth.js
exports.loginForm = (req, res) => {
  res.render("login", { title: "Login" });
};

exports.doLogin = (req, res) => {
  
  res.redirect("/");
};

exports.signupForm = (req, res) => {
  res.render("signup", { title: "Create Account" });
};

exports.doSignup = (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) {
    return res.status(400).render("signup", {
      title: "Create Account",
      error: "All fields are required.",
      name, email
    });
  }
  res.redirect("/login");
};

exports.logout = (req, res) => {
  res.redirect("/");
};
