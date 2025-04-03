// import List from "./containers/List"
import ListMovie from "./containers/ListMovie"
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="container-fluid">
      <nav className="navbar sticky-top navbar-ligth bg-dark">
        <h1 className="navbar-brand text-ligth">Lists</h1>
      </nav>
      {/* <List /> */}
      <ListMovie />
    </div>

  )
}

export default App