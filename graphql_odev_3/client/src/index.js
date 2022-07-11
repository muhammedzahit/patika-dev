import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import PostsPage from './views/PostsPage'
import Deneme from './views/Deneme'
import PostDetailPage from './views/PostDetailPage'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";


const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/posts" element={<PostsPage />}/>
        <Route path="/deneme" element={<Deneme />}/>
        <Route path="/post/:id" element={<PostDetailPage/>}/>
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
);
