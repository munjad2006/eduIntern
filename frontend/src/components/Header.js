import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import colors from '../Color';

function Header({ user }) {
  const { darkMode } = useContext(ThemeContext);
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
        background: darkMode ? colors.dark : colors.light,
        color: darkMode ? colors.light  : colors.dark,
        marginBottom: "1rem",
      }}
    >
      <h2 style={{ color: darkMode ? "#fff" : "#000" }}>
        Welcome, {user.name}
      </h2>
    </header>
  );
}

export default Header;
