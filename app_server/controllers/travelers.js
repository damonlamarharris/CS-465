// app_server/controllers/travelers.js
exports.home = (req, res) => {
  res.render('index', { title: 'Travlr Getaways' });
};

exports.travelList = (req, res) => {
  // sample data just to prove rendering works
  const packages = [
    { code: 'HNL', name: 'Honolulu Escape', price: 1299 },
    { code: 'CDG', name: 'Paris Getaway',   price: 1499 },
    { code: 'NRT', name: 'Tokyo Adventure', price: 1799 },
  ];
  res.render('travel', { title: 'Travel Packages', packages });
};
