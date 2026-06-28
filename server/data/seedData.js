const ownerId = "user_2unqyL4diJFP1E3pIBnasc7w8hP";
const hotelId = "67f76393197ac559e4089b72";

export const seedUsers = [
  {
    _id: ownerId,
    userName: "Great Stack",
    email: "user.greatstack@gmail.com",
    image:
      "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJ2N2c5YVpSSEFVYVUxbmVYZ2JkSVVuWnFzWSJ9",
    role: "hotelOwner",
    recentSearchedCities: ["New York"],
  },
  {
    _id: "user_1",
    userName: "John Doe",
    email: "john@example.com",
    image: "https://via.placeholder.com/150",
    role: "user",
    recentSearchedCities: ["New York", "Los Angeles"],
  },
  {
    _id: "user_2",
    userName: "Jane Smith",
    email: "jane@example.com",
    image: "https://via.placeholder.com/150",
    role: "hotelOwner",
    recentSearchedCities: ["Miami"],
  },
];

export const seedHotels = [
  {
    _id: hotelId,
    name: "Urbanza Suites",
    address: "Main Road 123 Street, 23 Colony",
    contact: "+0123456789",
    owner: ownerId,
    city: "New York",
  },
];

export const seedRooms = [
  {
    _id: "67f7647c197ac559e4089b96",
    hotel: hotelId,
    roomType: "Double Bed",
    pricePerNight: 399,
    amenities: ["Room Service", "Mountain View", "Pool Access"],
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a784e24d74?w=800",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
    ],
    isAvailable: true,
  },
  {
    _id: "67f76452197ac559e4089b8e",
    hotel: hotelId,
    roomType: "Double Bed",
    pricePerNight: 299,
    amenities: ["Room Service", "Mountain View", "Pool Access"],
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
      "https://images.unsplash.com/photo-1611892440504-42a784e24d74?w=800",
    ],
    isAvailable: true,
  },
  {
    _id: "67f76406197ac559e4089b82",
    hotel: hotelId,
    roomType: "Double Bed",
    pricePerNight: 249,
    amenities: ["Free WiFi", "Free Breakfast", "Room Service"],
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
      "https://images.unsplash.com/photo-1611892440504-42a784e24d74?w=800",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
    ],
    isAvailable: true,
  },
  {
    _id: "67f763d8197ac559e4089b7a",
    hotel: hotelId,
    roomType: "Single Bed",
    pricePerNight: 199,
    amenities: ["Free WiFi", "Room Service", "Pool Access"],
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
      "https://images.unsplash.com/photo-1611892440504-42a784e24d74?w=800",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
    ],
    isAvailable: true,
  },
];

export const seedBookings = [
  {
    _id: "67f76839994a731e97d3b8ce",
    user: ownerId,
    room: "67f76452197ac559e4089b8e",
    hotel: hotelId,
    checkInDate: new Date("2025-04-30"),
    checkOutDate: new Date("2025-05-01"),
    totalPrice: 299,
    guests: 1,
    status: "pending",
    paymentMethod: "Stripe",
    isPaid: true,
  },
  {
    _id: "67f76829994a731e97d3b8c3",
    user: ownerId,
    room: "67f7647c197ac559e4089b96",
    hotel: hotelId,
    checkInDate: new Date("2025-04-27"),
    checkOutDate: new Date("2025-04-28"),
    totalPrice: 399,
    guests: 1,
    status: "pending",
    paymentMethod: "Pay At Hotel",
    isPaid: false,
  },
  {
    _id: "67f76810994a731e97d3b8b4",
    user: ownerId,
    room: "67f763d8197ac559e4089b7a",
    hotel: hotelId,
    checkInDate: new Date("2025-04-11"),
    checkOutDate: new Date("2025-04-12"),
    totalPrice: 199,
    guests: 1,
    status: "pending",
    paymentMethod: "Pay At Hotel",
    isPaid: false,
  },
];
