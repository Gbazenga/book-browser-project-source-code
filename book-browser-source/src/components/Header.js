import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import "./Header.css"

import { useSelector } from "react-redux"

import { Link } from "react-router-dom"

import Headerbg from "../imgs/header-bg.jpg"

function Header (props) {

    const counter = useSelector(state => state.counter)
    const hasWishlist = useSelector(state => state.hasWishlist)
    const wishList = useSelector(state => state.wishList)

    const navClasses = hasWishlist ? "no-underline nav-link" : "nav-link";

    return(
        <>
        
        {!props.headerMini && <header style={{backgroundImage: `url(${Headerbg})`}}>
            <div id="wishlist-add" className="wishlist-popup">
                <p>Item added to withlist!</p>
            </div>
            <div id="wishlist-sub" className="wishlist-popup">
                <p>Item removed from withlist!</p>
            </div>
            <Navbar collapseOnSelect expand="lg">
                <Container>
                <Link to="/book-browser-project/"><span className="navbar-brand">Book Browser</span></Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link" to="/book-browser-project/books">Books</Link>
                        <Link  className="nav-link" to="/book-browser-project/genres">Genres</Link>
                        <Link  className="nav-link" to="/book-browser-project/authors">Authors</Link>
                        <Link to="/book-browser-project/wishlist" id="wishlist" className={navClasses}>Wishlist
                        { hasWishlist && <><span className="book-quantity">{counter}</span>
                             <div className="dropdown-menu">
                                {wishList.map((bookName) => {
                                    return (<p key={bookName.key}>{bookName.title}</p>)
                                })}
                            </div></>}
                        </Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div id="header-text">
                <h2>See the latest in literature, read<br/>our synopses, and add books to<br/>your wishlist for future reading</h2>
                <Link className="btn" to="/book-browser-project/wishlist">Manage Your wishlist</Link>
            </div>

            <div id="mobile-text">
                <h2>See the latest in literature, read our synopses, and add books to your wishlist for future reading</h2>
                <Link className="btn" to="/book-browser-project/wishlist">Manage Your wishlist</Link>
            </div>
        </header>}

        {props.headerMini && <header id="header-mini" style={{backgroundImage: `url(${Headerbg})`}}>
        <div id="wishlist-add" className="wishlist-popup">
            <p>Item added to withlist!</p>
        </div>
        <div id="wishlist-sub" className="wishlist-popup">
            <p>Item removed from withlist!</p>
        </div>
        <Navbar collapseOnSelect expand="lg">
                <Container>
                <Link to="/book-browser-project/"><span className="navbar-brand">Book Browser</span></Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link" to="/book-browser-project/books">Books</Link>
                        <Link  className="nav-link" to="/book-browser-project/genres">Genres</Link>
                        <Link  className="nav-link" to="/book-browser-project/authors">Authors</Link>
                        <Link to="/book-browser-project/wishlist" id="wishlist" className={navClasses}>Wishlist
                        { hasWishlist && <><span className="book-quantity">{counter}</span>
                             <div className="dropdown-menu">
                                {wishList.map((bookName) => {
                                    return (<p key={bookName.key}>{bookName.title}</p>)
                                })}
                            </div></>}
                        </Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>}

        </>
    )
}

export default Header;