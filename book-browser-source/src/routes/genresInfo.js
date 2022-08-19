import { useSelector, useDispatch } from "react-redux"
import Header from "../components/Header"
import Footer from "../components/Footer"

import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

import { Link, useParams} from "react-router-dom"

import { useEffect } from "react"

import { counterActions } from "../store/index"

import "./books.css"

function GenresInfo() {

    const dispatch = useDispatch()
    const params = useParams();

  useEffect(() => {
    const fetchBooks = async() => {
      const response =  await fetch("https://book-browser-eaacc-default-rtdb.firebaseio.com/books.json")
      const respondeData = await response.json()

      let bookArray = []

      for(const key in respondeData) {
        if(respondeData[key].genre === params.genreInfo){
            bookArray.push({
                key: respondeData[key].key,
                title: respondeData[key].title,
                genre: respondeData[key].genre,
                synopsis: respondeData[key].synopsis,
                img: respondeData[key].cover,
                author: respondeData[key].author
            })
        }     
      }
      
      dispatch(counterActions.populateBookList(bookArray))
    }

    fetchBooks()
  })

    const bookList = useSelector(state => state.books)

    return(
            <>
            <Header headerMini={true} />
            <h2 id="internal-title">List of {params.genreInfo} Books Available</h2>
                {bookList.map((book) => {
                    return(
                        
                        <Col xl={{span: 10, offset: 1}} className="book-item-large" key={book.key}>
                            <div className="book-item-box">
                            <Row>
                                <Col xl={4} lg={6} xs={12} className="book-image">
                                    <img src={book.img} alt={`${book.title} cover`}></img>
                                </Col>
                                <Col xl={8} lg={6} xs={12} className="book-text">
                                    <h4>{book.title}</h4>
                                    <h6>{book.author}</h6><br />
                                    <p><Link to={`/book-browser-project/genres/${book.genre}`}>{book.genre}</Link></p>
                                    <p id="text-hidden">Book Synopses<br/><br/>{book.synopsis}</p>
                                    
                                    <Link className="btn" to={`/book-browser-project/books/${book.title}`}>Book Info</Link>
                                </Col>
                            </Row>
                            </div>
                            <hr />
                        </Col>
                        
                )})}
                <br/>
                <br/>
            <Footer />
            </>
    )
}

export default GenresInfo