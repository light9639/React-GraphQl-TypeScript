import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com",
  cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
)
