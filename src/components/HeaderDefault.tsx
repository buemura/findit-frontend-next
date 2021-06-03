import { Container, Header } from "../styles/components/HeaderDefault";
import Switch from "./Switch";

import Link from "next/link";

export function HeaderDefault() {
  return (
    <Container>
      <Header>
        <div className="divLogo">
          <Link href="/home">
            <a>
              <img src="icons/logo.png" alt="Logo" />
              Find It
            </a>
          </Link>
        </div>

        <div className="containerLinks">
          <div className="search">
            <img src="icons/search.png" alt="Search" />
            <input type="text" placeholder="Type here..." />
            <button>Search</button>
          </div>

          <div className="menuItems">
            <div className="pageLinks">
              <Link href="/home">
                <a>Home</a>
              </Link>
              <Link href="/about">
                <a>About</a>
              </Link>
              <Link href="/contact">
                <a>Contact</a>
              </Link>
            </div>

            <div className="loginLinks">
              <Link href="/login">
                <a className="login">Login</a>
              </Link>
              <Link href="/register">
                <a className="register">Register</a>
              </Link>
            </div>
          </div>

          <Switch className="menu" id="switchButton"></Switch>
        </div>
      </Header>
    </Container>
  );
}
