import React from 'react';
import '../styles/booksPage.css';

export default function Filter({value, onRemove}) 
{
    return (
        <div className="filter-tag" onClick={onRemove}>
            {value.type} : {value.value}
        </div>
    );
}