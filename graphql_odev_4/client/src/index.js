import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import PostsPage from './views/PostsPage'
import Deneme from './views/Deneme'
import PostDetailPage from './views/PostDetailPage'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:4000/graphql',
}));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
    link : splitLink,
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
