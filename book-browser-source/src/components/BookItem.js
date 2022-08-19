import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import "./BookItem.css"

import { useDispatch, useSelector } from "react-redux"
import { counterActions } from "../store/index"

import { Link, Outlet } from "react-router-dom"

function BookItem(props) {

    const dispatch = useDispatch()

    const wishList = useSelector(state => state.wishList)

    function incrementHandler(event) {
        event.preventDefault()

        const wishlistAdd = document.getElementById("wishlist-add");

        const parentElement = event.target.parentElement.querySelector("h4").textContent
        const filterBook = props.bookData.filter((book) => {
            return(book.title === parentElement)
        })
        dispatch(counterActions.increment(filterBook[0]))
        
        wishlistAdd.classList.add("transition")
        setTimeout(() => {
            wishlistAdd.classList.remove("transition")
        }, 4000)

    }

    function decrementHandler(event) {
        event.preventDefault()

        const wishlistSub = document.getElementById("wishlist-sub");

        const parentElement = event.target.parentElement.querySelector("h4").textContent
        dispatch(counterActions.decrement(parentElement))

        wishlistSub.classList.add("transition")
        setTimeout(() => {
            wishlistSub.classList.remove("transition")
        }, 4000)

    }

    function checkIfWishlist(a) {

        const checking = wishList.filter((book) => {
            return (book.title === a)
        })

        if(checking.length === 0){
            return true
        }
        else{
            return false
        }
        
    }


    return(
        <>
            {props.bookData.map((book) => {
                return(
            <Col xl={4} lg={6} xs={12} className="book-item" key={book.key}>
                <div className="book-item-box">
                    <h4>{book.title}</h4>
                    <Link to={`/book-browser-project/genres/${book.genre}`}><p>{book.genre}</p></Link>
                    <h6>{book.author}</h6>
                    <p id="text-hidden"><u>Book Synopses</u><br/><br/>{book.synopsis}</p>
                    <img src={book.img} alt={`${book.title} cover`}></img>
                    <Link className="btn" to={`/book-browser-project/books/${book.title}`}>Book Info</Link>
                    {checkIfWishlist(book.title) && <Button className="active wishlistBtn" onClick={incrementHandler}>Add to wishlist</Button>}
                    {!checkIfWishlist(book.title) && <Button className="active wishlistBtn" onClick={decrementHandler}>Remove from wishlist</Button>}
                    <Outlet />
                </div>
                
            </Col>
            )})}
        </>
    )
}

export default BookItem;