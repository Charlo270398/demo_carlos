import './App.css';
import { Route, Switch } from "wouter";
import Header from './components/Header';

//Import pages
import NewsListPage from './views/NewsList';
import ArchivedNewsListPage from './views/ArchivedNewsList';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route component={NewsListPage} path="/" />
        <Route component={ArchivedNewsListPage} path="/archived" />
      </Switch>
    </div>
  );
}

export default App;
