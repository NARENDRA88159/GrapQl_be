 export const schema=`#graphql
type User {
  id: ID!
  name: String
  email: String
  password: String
  phone: String
  address: String
  role: String
  createdAt: String
}

type OpeningHours {
  open: String
  close: String
}

type Reastaurant {
  id: ID!
  name: String
  address: String
  phone: String
  description: String
  image: String
  openingHours: OpeningHours
}

type Menu {
  id: ID!
  name: String
  description: String
  price: String
  category: String
  image: String
  available: Boolean
  restaurant: Reastaurant
}

type Query {
  userName: [User]
  Restaurant: [Reastaurant]
  MenuItems: [Menu]
}


`




