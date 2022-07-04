import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { userInfo } from "./queries/queries";

export const client = new ApolloClient({
  uri: "https://Assignment.imukulsaini.repl.co/graphql",

  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          userInfo: {
            read() {
              return userInfo();
            },
          },
        },
      },
    },
  }),
});

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Router>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
