import { Container, Header } from '../styles/components/HeaderDefault.module';
import Switch from './Switch';

export function HeaderDefault() {  
  return (
    <Container>
      <Header>
        <div className="divLogo">
          <a href="http://localhost:3000/">
            <img src="icons/logo.png" alt="Logo"/>
            Find It
          </a>
        </div>

        <div className="containerLinks">
          <div className="search">
            <img src="icons/search.png" alt="Search" />
            <input type="text" placeholder="Type here..." />
            <button>Search</button>
          </div>

          <div className="menuItems">
            <div className="pageLinks">
              <a href={"/home"}>Home</a>
              <a href={"/about"}>About</a>
              <a href={"/contact"}>Contact</a>
            </div>

            <div className="loginLinks">
              <a className="login" href={"/users/login"}>Login</a>
              <a className="register" href={"/users/register"}>Register</a>
            </div>            
          </div>

          <Switch className="menu" id="switchButton"></Switch>
        </div>
      </Header>
    </Container>
  );
}