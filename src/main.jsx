
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, gql } from '@apollo/client'



const getAuth = () => {

  const token = localStorage.getItem('phonenumbers-user-token')
  return token ? `bearer ${token}` : null

}


const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: new HttpLink({
    headers: {
      authorization: getAuth()
    },
    uri: 'http://localhost:4000/'
  })
}) 




// client.query({ query })
// .then(res => {
//   console.log(res.data);
// })



ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
)
