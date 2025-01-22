// Categories
const categories = [
    { _id: 1, name: "Italian", value: "fine_dining"},
    { _id: 2, name: "Buffet", value: "buffet" },
    { _id: 3, name: "Cafe", value: "cafe"},
    { _id: 4, name: "Fast Food", value: "fast_food" },
    { _id: 5, name: "Live Music", value: "casual_dining" },
  ];

  // ChoicesList

  const choicesList = [
    { id:1, name: "Recommended", value: "recommended"},
    { id:2, name: "Near By", value: "near_by"},
    { id:3, name: "5 Star", value: "5star"},
    { id:4, name: "4 Star", value: "4star"},
    { id:5, name: "3 Star", value: "3star"},
    
   
  ];
  
  // Restaurants
  const restaurants = [
    {
      id: 1,
      title: "Ocean's Delight",
      category_id: 1,
      average_price: 50,
      hours_of_operation: "10:00 AM - 11:00 PM",
      imageUrl: "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=600",
      owner_id: 101,
      features: ["Kids Room", "Live Music"],
      ratings: 3,
      coords: {
        coords_id: 1,
        latitude: 40.7128,
        longitude: -74.0060,
        address: "123 Ocean Avenue, NY",
        title: "Ocean's Delight Location",
        longitudeDelta: 0.005,
        latitudeDelta: 0.005,
      },
    },
    {
      id: 2,
      title: "The Burger House",
      category_id: 3,
      average_price: 15,
      hours_of_operation: "11:00 AM - 10:00 PM",
      imageUrl: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600g",
      owner_id: 102,
      features: ["Kids Room"],
      ratings: 4.3,
      coords: {
        coords_id: 2,
        latitude: 34.0522,
        longitude: -118.2437,
        address: "456 Burger Street, LA",
        title: "The Burger House Location",
        longitudeDelta: 0.005,
        latitudeDelta: 0.005,
      },
    },
    // Add 3 more restaurants here...
  ];
  
  // Menu
  const menu = [
    {
      food_id: 1,
      restaurant_id: 1,
      title: "Grilled Salmon",
      food_type: ["Main Course"],
      price: 25.0,
      ratings: 4.5,
    },
    {
      food_id: 2,
      restaurant_id: 1,
      title: "Seafood Platter",
      food_type: ["Lunch", "Main Course"],
      price: 40.0,
      ratings: 4.8,
    },
    {
      food_id: 3,
      restaurant_id: 1,
      title: "Chocolate Cake",
      food_type: ["Dessert"],
      price: 10.0,
      ratings: 4.9,
    },
    // Add 3 items for each restaurant here...
  ];
  
  // Reviews
  const reviews = [
    {
      rating_id: 1,
      restaurant_id: 1,
      food_id: 1,
      userId: 1001,
      username: "Foodie123",
      comments: "Amazing seafood! Highly recommend.",
      ratings: 5.0,
      ratingCount: 120,
    },
    {
      rating_id: 2,
      restaurant_id: 1,
      food_id: 2,
      userId: 1002,
      username: "Traveler42",
      comments: "The seafood platter was delicious.",
      ratings: 4.7,
      ratingCount: 85,
    },
    {
      rating_id: 3,
      restaurant_id: 1,
      food_id: 3,
      userId: 1003,
      username: "SweetTooth",
      comments: "Chocolate cake is to die for!",
      ratings: 4.9,
      ratingCount: 50,
    },
    // Add 3 reviews for each restaurant here...
  ];
  
  // Reservations
  const reservations = [
    {
      reservation_id: 1,
      restaurant_id: 1,
      date: "2025-01-22",
      time: "Lunch",
      guests: { adult_no: 2, kids_no: 1 },
      table_id: 10,
      table_no: "B5",
    },
    {
      reservation_id: 2,
      restaurant_id: 2,
      date: "2025-01-23",
      time: "Dinner",
      guests: { adult_no: 4, kids_no: 2 },
      table_id: 15,
      table_no: "A1",
    },
    // Add more reservations here...
  ];
  
  // User Profiles
  const profiles = [
    {
      user_id: 1001,
      username: "Foodie123",
      email: "foodie123@example.com",
      uid: "UID001",
      address: ["123 Main Street, NY"],
      userType: "Admin",
      profile_img: "/images/foodie123.jpg",
      updatedAt: "2025-01-20",
    },
    {
      user_id: 1002,
      username: "Traveler42",
      email: "traveler42@example.com",
      uid: "UID002",
      address: ["456 Elm Street, LA"],
      userType: "Vendor",
      profile_img: "/images/traveler42.jpg",
      updatedAt: "2025-01-19",
    },
    // Add more user profiles here...
  ];


  const data = { categories, choicesList, restaurants }; 
  export { data };
  