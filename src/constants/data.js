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
      isFavorite: true,
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
      isFavorite: true,
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
      "_id": "65316968f94c6496dc84f3c1",
      "title": "Tiramisu",
      "foodType": ["Dessert"],
      "code": "41007428",
      "isAvailable": true,
      "restaurant": "1",
      "rating": 4.9,
      "ratingCount": "420",
      "description": "A classic Italian dessert made of layers of coffee-soaked ladyfingers and creamy mascarpone, topped with cocoa.",
      "price": 7.99,
      "imageUrl": ["https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=600"],
      "__v": 0,
      "category": "1"
    },
    {
      "_id": "65316968f94c6496dc84f3c2",
      "title": "Margarita Pizza",
      "foodType": ["Main Course"],
      "code": "41007429",
      "isAvailable": true,
      "restaurant": "2",
      "rating": 4.8,
      "ratingCount": "320",
      "description": "Traditional Italian pizza with fresh tomatoes, mozzarella cheese, basil, and olive oil.",
      "price": 12.99,
      "imageUrl": ["https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600g"],
      "__v": 0,
      "category": "1"
    },
    {
      "_id": "65316968f94c6496dc84f3c3",
      "title": "Cappuccino",
      "foodType": ["Drink"],
      "code": "41007430",
      "isAvailable": true,
      "restaurant": "2",
      "rating": 4.7,
      "ratingCount": "150",
      "description": "Creamy coffee drink made with espresso and steamed milk, topped with milk foam.",
      "price": 3.99,
      "imageUrl": ["https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600g"],
      "__v": 0,
      "category": "2"
    },
    {
      "_id": "65316968f94c6496dc84f3c4",
      "title": "Avocado Toast",
      "foodType": ["Breakfast", "Vegan"],
      "code": "41007431",
      "isAvailable": true,
      "restaurant": "2",
      "rating": 4.6,
      "ratingCount": "210",
      "description": "Toasted bread topped with mashed avocado, olive oil, salt, and pepper.",
      "price": 6.99,
      "imageUrl": ["https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600g"],
      "__v": 0,
      "category": "3"
    },
    {
      "_id": "65316968f94c6496dc84f3c5",
      "title": "Nachos",
      "foodType": ["Snack"],
      "code": "41007432",
      "isAvailable": true,
      "restaurant": "1",
      "rating": 4.5,
      "ratingCount": "180",
      "description": "Crispy tortilla chips topped with melted cheese, jalapenos, and salsa.",
      "price": 5.99,
      "imageUrl": ["https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600g"],
      "__v": 0,
      "category": "4"
    },
    {
      "_id": "65316968f94c6496dc84f3c6",
      "title": "Vegan Burger",
      "foodType": ["Main Course", "Vegan"],
      "code": "41007433",
      "isAvailable": true,
      "restaurant": "1",
      "rating": 4.8,
      "ratingCount": "250",
      "description": "Delicious plant-based burger patty served with lettuce, tomato, and vegan mayo.",
      "price": 10.99,
      "imageUrl": ["https://example.com/vegan_burger.jpg"],
      "__v": 0,
      "category": "5"
    }
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
      fullName: "Foodie123",
      email: "foodie123@example.com",
      uid: "UID001",
      address: ["123 Main Street, NY"],
      userType: "Admin",
      profile_img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      updatedAt: "2025-01-20",
    },
    {
      user_id: 1002,
      fullName: "Traveler42",
      email: "traveler42@example.com",
      uid: "UID002",
      address: ["456 Elm Street, LA"],
      userType: "Vendor",
      profile_img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      updatedAt: "2025-01-19",
    },
    // Add more user profiles here...
  ];


  const data = { categories, choicesList, restaurants, menu, reviews, reservations, profiles }; 
  export { data };
  