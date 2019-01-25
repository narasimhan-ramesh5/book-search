import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        Search for Books
      </a>
      <a className="navbar-brand" href="/saved">
        View saved searches
      </a>
    </nav>
  );
}

export default Nav;
