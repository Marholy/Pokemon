import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'; 
import Dashboard from './components/layout/Dashboard'; 
import {HashRouter as Router,Route,Switch} from 'react-router-dom';
import './index.css'
import Pokemon from './components/Pokemon';

function App() {
  return (
    <Router>
    <div className="App">
      <div className="container">
        <Switch>   
        <Route exact path="/" component={Dashboard}/>     
        <Route exact path="/pokemon/:id" component={Pokemon} />       
        </Switch>
      </div>     
    </div>
    </Router>
  );
}
export default App;
