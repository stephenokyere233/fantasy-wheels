import React from 'react'
import Logo from './Logo'
import Link from "next/link"

const Header = () => {
  return (
    <header>
      <Logo />
      <nav >
        <Link href="#home" >
          Home
        </Link>
        <Link href="#cars">
          Cars
        </Link>
        <Link href="#about">About</Link>
        <Link href="#parts">Parts</Link>
        <Link href="#blog">Blog</Link>
      </nav>
      <button>Login</button>
    </header>
  );
}

export default Header
