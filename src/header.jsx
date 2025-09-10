import React from 'react'


import styles from "./header.module.css"
const Header = () => {

  return (
    <div className={styles.app}>
    {/* Navbar */}
    <header className={styles.navbar}>
      <div className={styles.logo}>Texto</div>
      <nav>
        <a href="#">About Us</a>
        <a href="#">Contact Us</a>
       
      </nav>

        </header>
</div>
  )
}

export default Header