import React, { Component } from 'react'
import Link from 'gatsby-link'
import './header.css'
import logo from './logo.png';

class Header extends Component {
    navToggle() {
        let bars = document.querySelector('.bars');
        let nav = document.querySelector('.mobile-links');
        bars.classList.toggle('toggled');
        nav.classList.toggle('toggled');
    }

    render() {
        return(
            <nav className="nav-primary">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="Logo"/>
                    </Link>
                </div>

                <div className="nav-lg">
                    <div className="links-right">
                        <Link to="/about">About</Link>
                        <Link to="/what-we-do">What We Do</Link>
                        <Link to="/portfolio">Case Studies</Link>
                        <Link to="/blog/">Blog</Link>
                        <Link to="/contact">Contact</Link>
                    </div>
                </div>

                <div className="nav-sm"
                    style={{
                        height: '40px',
                    }}
                >
                    <button
                        type="button" 
                        className="bars" 
                        onClick={this.navToggle}
                    >
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>

                    <ul className="mobile-links">
                        <li><Link to="/about" onClick={this.navToggle}>About</Link></li>
                        <li><Link to="/what-we-do" onClick={this.navToggle}>What We Do</Link></li>
                        <li><Link to="/case-studies" onClick={this.navToggle}>Case Studies</Link></li>
                        <li><Link to="/blog" onClick={this.navToggle}>Blog</Link></li>
                        <li><Link to="/contact" onClick={this.navToggle}>Contact</Link></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Header