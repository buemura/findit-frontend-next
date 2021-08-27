import { Container, Header } from "../styles/components/HeaderUser";
import Switch from "./Switch";

import Link from "next/link";
import { useState } from "react";
import { Authentication } from "../api/authentication";

export function HeaderUser() {
  const [hasNotification, setHasNotification] = useState<number>(0);

  return (
    <Container>
      <Header>
        <div className="divLogo">
          <Link href="/home" passHref>
            <a>
              <img src="/icons/logo.png" alt="Logo" />
              Find It
            </a>
          </Link>
        </div>

        <div className="containerLinks">
          <div className="search">
            <img src="/icons/search.png" alt="Search" />
            <input type="text" placeholder="Type here..." />
            <button>Search</button>
          </div>

          <div className="menuItems">
            <div className="pageLinks">
              <Link href="/home" passHref>
                <a>Home</a>
              </Link>
              <Link href="/about" passHref>
                <a>About</a>
              </Link>
              <Link href="/contact" passHref>
                <a>Contact</a>
              </Link>
            </div>
            <div className="profileLinks">
              <Link href="/messages" passHref>
                <a className="notification">
                  <span>Messages</span>
                  <div>
                    <img
                      className="chatImage"
                      src="/icons/chat.png"
                      alt="Chat"
                    />
                    {hasNotification === 1 ? (
                      <img
                        className="warning"
                        src="/icons/warning.png"
                        alt="Warning"
                      />
                    ) : (
                      <span className="warningSpan"></span>
                    )}
                  </div>
                </a>
              </Link>
              <a
                className="profile"
                onClick={() => Authentication.checkUserSession("profile")}
              >
                Profile
              </a>
              <a className="user-logout" onClick={Authentication.logOut}>
                Logout
              </a>
            </div>
          </div>

          <Switch className="menu" id="switchButton"></Switch>
        </div>
      </Header>
    </Container>
  );
}
