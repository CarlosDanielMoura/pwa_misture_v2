import { Header } from "./components/Heander";
import { NavBarBottom } from "./components/NavBar";

function App() {
  return (
    <>
      <Header />
      <NavBarBottom className="md:hidden" />
    </>
  );
}

export default App;
