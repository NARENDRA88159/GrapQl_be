 export const schema=`#graphql
type User{
  name:String,
  email:String,
  password:String
}

 type Query {
      userName: [User]
    }

`

