// app_server/controllers/admin.js
exports.dashboard = (req, res) => {
  res.render("admin/dashboard", {
    title: "Admin Dashboard"
  });
};
