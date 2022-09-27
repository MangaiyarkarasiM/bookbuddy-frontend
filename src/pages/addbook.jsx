import React, { useContext } from 'react';
import BookForm from '../components/Book/BookForm';
import { GlobalContext } from '../context/globalContext';

const AddBookPage = () => {
    let { addBook } = useContext(GlobalContext);
    return (
        <div className='sm:container sm:mx-auto'>
            <BookForm addBook={addBook}></BookForm>
        </div>
    );
};

export default AddBookPage;