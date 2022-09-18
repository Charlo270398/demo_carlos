import * as Realm from "realm-web";
import {
    ApolloClient,
    HttpLink,
    InMemoryCache,
} from "@apollo/client";

async function getValidAccessToken() {
    const app = new Realm.App({ id: process.env.REACT_APP_MONGO_DB_APP_ID });
    if (!app.currentUser) {
        // Log In anonymous user
        await app.logIn(Realm.Credentials.anonymous());
    } else {
        // Refresh Bearer Token if current user
        await app.currentUser.refreshCustomData();
    }
    return app.currentUser.accessToken;
}

// Create Apollo Client (Connect app to GrapgQL endpont)
export const apollo_client = new ApolloClient({
    link: new HttpLink({
    uri: `${process.env.REACT_APP_MONGO_DB_ENDPOINT}`,
    fetch: async (uri, options) => {
        const accessToken = await getValidAccessToken();
        options.headers.Authorization = `Bearer ${accessToken}`;
        return fetch(uri, options);
    },
    }),
    cache: new InMemoryCache(),
});

