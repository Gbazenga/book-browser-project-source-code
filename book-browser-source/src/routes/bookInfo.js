import Header from "../components/Header"
import Footer from "../components/Footer"
import "./bookInfo.css"

import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

import { useParams, Link } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { counterActions } from "../store/index"

import { useEffect } from "react"

function BookInfo() {
    const params = useParams()

    const dispatch = useDispatch()
    const highlightedBook = useSelector(state => state.highlightedBook)
    const books = useSelector(state => state.books)
    const wishList = useSelector(state => state.wishList)

    useEffect(() => {
        const fetchBooks = async() => {
          const response =  await fetch("https://book-browser-eaacc-default-rtdb.firebaseio.com/books.json")
          const respondeData = await response.json()
    
          let bookArray = []
    
          for(const key in respondeData) {
            bookArray.push({
              key: respondeData[key].key,
              title: respondeData[key].title,
              genre: respondeData[key].genre,
              synopsis: respondeData[key].synopsis,
              img: respondeData[key].cover,
              author: respondeData[key].author
            })
          }
          dispatch(counterActions.populateBookList(bookArray))
          dispatch(counterActions.getBookInfo(params.bookName))
        }
    
        fetchBooks()
      })

    function incrementHandler(event) {
        event.preventDefault()
        const filterBook = books.filter((book) => {
            return(book.title === params.bookName)
        })
        dispatch(counterActions.increment(filterBook[0]))

        const wishlistAdd = document.getElementById("wishlist-add");
        
        wishlistAdd.classList.add("transition")
        setTimeout(() => {
            wishlistAdd.classList.remove("transition")
        }, 4000)
    }

    function decrementHandler(event) {
        event.preventDefault()     
        dispatch(counterActions.decrement(highlightedBook.title))

        const wishlistSub = document.getElementById("wishlist-sub");

        wishlistSub.classList.add("transition")
        setTimeout(() => {
            wishlistSub.classList.remove("transition")
        }, 4000)
    }

    function checkIfWishlist(a) {

        const checking = wishList.filter((thing) => {
            return (thing.title === a)
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
            <Header headerMini={true}/>

                <Col xl={{span: 10, offset: 1}} className="book-info">
                    <h2>{params.bookName} Info</h2>
                    <img src={highlightedBook.img} alt={`${highlightedBook.title} cover`}></img>
                    <hr/>
                    <h4>Full title : {highlightedBook.title}</h4>
                    <h6>Author : {highlightedBook.author}</h6>
                    <p>Book Genre : <Link to={`/book-browser-project/genres/${highlightedBook.genre}`}>{highlightedBook.genre}</Link></p><br/><br/>
                    <p><b>Book Synopsis</b><br/><br/>{highlightedBook.synopsis}</p>
                    <br/>
                    <br/>
                    <Link className="btn" to="/book-browser-project/books">Back to book list</Link>
                    {checkIfWishlist(highlightedBook.title) && <Button onClick={incrementHandler}>Add to wishlist</Button>}
                    {!checkIfWishlist(highlightedBook.title) && <Button onClick={decrementHandler}>Remove from wishlist</Button>}
                </Col>
            <Footer />
        </>
    )
}

export default BookInfo