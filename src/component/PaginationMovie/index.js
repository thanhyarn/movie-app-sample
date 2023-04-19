import React, { useState } from 'react'
import { Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';


const PaginationMovie = ({ page, totalPage, id }) => {
    const navigate = useNavigate();
    const itemRender = (_, type, originalElement) => {
        if (type === 'prev') {
            return <a>Previous</a>;
        }
        if (type === 'next') {
            return <a>Next</a>;
        }
        return originalElement;
    };

    const onChange = (pageNumber) => {
        console.log('Page: ', pageNumber);
        if (id.includes("?")){
            window.location.href = `/${id}&page=${pageNumber}`
        } else {
            window.location.href = `/${id}?page=${pageNumber}`
        }
        
    }

    return (
        <Pagination
            style={{ height: '60px', margin: '20px'}}
            total={totalPage}
            itemRender={itemRender}
            onChange={onChange}
            defaultCurrent={page}
            pageSize={1}
            size="default"
        />
    )
}

export default PaginationMovie