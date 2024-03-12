// External libraries
import * as React from "react";

// Styled
import "./styles.scss";

function Header({ titleHeader, children }) {
  return (
    <div className="HeaderContainer">
      <p className="TitleHeaderContainer">
        {titleHeader}
      </p>
      <>
        {children}
      </>
    </div>
  );
}

export default Header;