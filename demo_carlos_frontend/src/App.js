import './App.css';
import { Route, Switch, Redirect } from "wouter";
import Header from './components/Header';
import { UserContextProvider } from './context/UserContext';
import { 
  ApolloProvider,
} from '@apollo/client' 
import { apollo_client } from "./services/getApolloClient";

//Import pages
import NewsListPage from './views/NewsList';
import ArchivedNewsListPage from './views/ArchivedNewsList';
import RegisterPage from './views/Register';
import LoginPage from './views/Login';
import useUser from './hooks/useUser';
import AddNewPage from './views/AddNew';

function App() {
  return (
    <UserContextProvider>
      <div className="App">
        <Header />
        <Switch>
          <Route component={RegisterPage} path="/register" />
          <Route component={LoginPage} path="/login" />
          <ProtectedRoute>
            <ApolloProvider client={apollo_client}>
              <Route component={NewsListPage} path="/" />
              <Route component={ArchivedNewsListPage} path="/archived" />
              <Route component={AddNewPage} path="/add" />
            </ApolloProvider>
          </ProtectedRoute>
        </Switch>
      </div>
    </UserContextProvider>
  );
}

const ProtectedRoute = ({
  redirectPath ='/login',
  children
}) => {
  const {isLogged} = useUser()
  if(!isLogged) {
    return <Redirect to={redirectPath} replace />
  }
  return children
}

export default App;
