import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import PostsPage from './views/PostsPage'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";


const client = new ApolloClient({
    uri: 'https://localhost:4000/graphql',
    cache: new InMemoryCache(),
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/posts" element={<PostsPage />}/>
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
);
