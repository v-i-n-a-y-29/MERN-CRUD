import { useEffect, useState } from "react"
import { bookbaseurl } from "../axiosinstance";
import Navbar from "./Navbar";
function Home() {

    const [bookForm, setbookForm] = useState({
        "BookName": "",
        "BookTitle": "",
        "Author": "",
        "SellingPrice": "",
        "PublishDate": ""
    });

    const [bookList, setbookList] = useState([])
    const [editingBookId, setEditingBookId] = useState(null)

    const handleFormChange = (e) => {
        setbookForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    // console.log(bookForm)
    const resetForm = () => {
        setbookForm({
            "BookName": "",
            "BookTitle": "",
            "Author": "",
            "SellingPrice": "",
            "PublishDate": ""
        })
        setEditingBookId(null)
    }

    const handleSubmit = async () => {
        try {
            if (
                !bookForm?.BookName ||
                !bookForm.BookTitle ||
                !bookForm.Author ||
                !bookForm.SellingPrice
            ) {
                alert("All field's are required")
                return;
            }

            const response = editingBookId
                ? await bookbaseurl.put('/updateBook', {
                    Id: editingBookId,
                    ...bookForm
                })
                : await bookbaseurl.post('/addBook', bookForm)
            console.log(response.data)
            const { data } = response
            if (data.Success) {
                alert(editingBookId ? 'data updated successfully' : 'data created successfully')
                resetForm()
                await getallBooks();
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getallBooks = async () => {
        try {
            const { data } = await bookbaseurl.get('/viewBook')
            console.log('bookslist', data.BookList)
            setbookList(data.BookList)
            // console.log('books',bookList)
        } catch (error) {
            console.log(error)
        }
    }

    const handleBookDelete = async (Id) => {
        try {
            const { data } = await bookbaseurl.delete('/deleteBook', {
                data: { Id }
            })
            console.log(data)
            if (data.Success) {
                await getallBooks();
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleBookEdit = (book) => {
        setbookForm({
            BookName: book.BookName || "",
            BookTitle: book.BookTitle || "",
            Author: book.Author || "",
            SellingPrice: book.SellingPrice || "",
            PublishDate: book.PublishDate || ""
        })
        setEditingBookId(book._id)
    }

    useEffect(() => {
        getallBooks();
    }, [])


    return (
        <>
            <Navbar/>
            <div className="w-full px-5 min-h-[calc(100vh-60px)]">
                <div className="w-full grid grid-cols-5 gap-3 my-3">
                    <div className="w-full flex flex-col gap-2">
                        <label htmlFor="">Book Name:</label>
                        <input type="text" placeholder='Book Name' className='w-full border-gray-300 rounded-sm outline-none outline-gray- h-8 px-2 border-2 text-gray-800'
                            name="BookName"
                            value={bookForm.BookName}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <label htmlFor="">Title:</label>
                        <input type="text" placeholder='Book title' className='w-full border-gray-300 rounded-sm outline-none outline-gray- h-8 px-2 border-2 text-gray-800'
                            name="BookTitle"
                            value={bookForm.BookTitle}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <label htmlFor="">Author:</label>
                        <input type="text" placeholder='author' className='w-full border-gray-300 rounded-sm outline-none outline-gray- h-8 px-2 border-2 text-gray-800'
                            name="Author"
                            value={bookForm.Author}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <label htmlFor="">SellingPrice:</label>
                        <input type="text" placeholder='SellingPrice' className='w-full border-gray-300 rounded-sm outline-none outline-gray- h-8 px-2 border-2 text-gray-800'
                            name="SellingPrice"
                            value={bookForm.SellingPrice}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <label htmlFor="">published Date:</label>
                        <input type="date" placeholder='published date' className='w-full border-gray-300 rounded-sm outline-none outline-gray- h-8 px-2 border-2 text-gray-800'
                            name="PublishDate"
                            value={bookForm.PublishDate}
                            onChange={handleFormChange}
                        />
                    </div>

                </div>
                <div className="w-full flex justify-end">
                    <button
                        className="bg-gray-700 text-white h-9 w-22 rounded-md cursor-pointer"
                        onClick={handleSubmit}
                    >
                        {editingBookId ? 'UPDATE' : 'SUBMIT'}
                    </button>
                    {editingBookId && (
                        <button
                            className="ml-3 bg-gray-500 text-white h-9 w-22 rounded-md cursor-pointer"
                            onClick={resetForm}
                        >
                            CANCEL
                        </button>
                    )}
                </div>
                <div className="w-full mt-10">
                    <div className="w-full">
                        <table className="w-full bg-white divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Book Name
                                    </th>
                                    <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Book Title
                                    </th>
                                    <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Author
                                    </th>
                                    <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Selling Price
                                    </th>
                                    <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Publish Date
                                    </th>
                                    <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-gray-200'>
                                {bookList.length > 0 ? (
                                    bookList.map((book) => (
                                        <tr key={book._id} className='hover:bg-gray-200'>
                                            <td className='px-6 py-3 whitespace-nowrap'>{book.BookName}</td>
                                            <td className='px-6 py-3 whitespace-nowrap'>{book.BookTitle}</td>
                                            <td className='px-6 py-3 whitespace-nowrap'>{book.Author}</td>
                                            <td className='px-6 py-3 whitespace-nowrap'>{book.SellingPrice}</td>
                                            <td className='px-6 py-3 whitespace-nowrap'>{book.PublishDate || "-"}</td>
                                            <td className='px-6 py-3 whitespace-nowrap'>
                                                <button className="px-3 py-2 rounded-[8px] bg-blue-600 text-white cursor-pointer mr-2"
                                                    onClick={() => handleBookEdit(book)}
                                                >
                                                    Edit
                                                </button>
                                                <button className="px-3 py-2 rounded-[8px] bg-red-600 cursor-pointer"
                                                    onClick={() => handleBookDelete(book._id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className='px-6 py-3 whitespace-nowrap' colSpan="6">
                                            No books found
                                        </td>
                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home
