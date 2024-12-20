import React, {useEffect, useState} from "react";
import {getAll} from "../services/bookService";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import {getAllCategories} from "../services/categoryService";
function ListComponent() {
    const [list, setList] = useState([]);
    const [categories, setCategories] = useState([])
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [searchValue, setSearchValue] = useState({searchName:"",categoryId:""});
    const [isSearch, setIsSearch] = useState(false)
    useEffect(()=>{
        const fetchData = async ()=>{
            const  resp = await getAll(page,searchValue,);
            setList(resp.data);
            setTotalPage(()=>{
                const totalCount = resp.headers['x-total-count'];
                return  Math.ceil(totalCount / 2);
            });
        }
        const fetchDataCategory = async () => {
            let list = await getAllCategories();
            setCategories(list)
        }
        fetchData();
        fetchDataCategory();
    },[page, isSearch])
    const handleNext =(event)=>{
        event.preventDefault();
        if (page<totalPage){
            setPage(pre=> pre+1);
        }
    }
    const handlePre =(event)=>{
        event.preventDefault();
        if (page>1){
            setPage(pre=> pre-1);
        }
    }
    const handleOnChange =(e)=>{
        setSearchValue(pre =>({
            ...pre,
            [e.target.name]: e.target.value

        }));
    }
    const  handleSearch =()=>{
        setIsSearch(pre=>!pre)
    }
    return (
        <>
            <h2>Danh sách</h2>
            <div className="row m-5">
                <input onChange={(e)=>{handleOnChange(e)}} name={'searchName'} placeholder={'Nhập tên tìm kiếm'} className="mx-2 form-control form-control-sm w-25" type="text"
                       aria-label="Nhập tên sách"/>

                <select onChange={(e)=>{handleOnChange(e)}} name={'categoryId'} className="mx-2 form-select form-select-sm w-25" aria-label="Class name">
                    <option  value={''} selected>--Chọn danh mục--</option>
                    {categories.map(category => (
                        <option value={category.id}>{category.name}</option>
                    ))}
                </select>
                <button className={' "mx-2 btn btn-sm btn-outline-primary w-25 p-1'} onClick={handleSearch}>Search</button>
            </div>
            <table className={'table table-dark'}>
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Author</th>
                    <th>Price</th>
                    <th>Publication</th>
                    <th>Category</th>
                </tr>
                </thead>
                <tbody>
                {list.map((book,i)=>(
                    <tr key={book.id}>
                        <td>{i+1}</td>
                        <td>{book.code}</td>
                        <td>{book.name}</td>
                        <td>{book.author}</td>
                        <td>{book.price}</td>
                        <td>{book.publicationOfDate}</td>
                        <td>{book.category.name}</td>
                    </tr>
                ))}

                </tbody>
            </table>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item">
                        <a onClick={(event)=>{
                            handlePre(event)
                        }} className="page-link btn-sm" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    {Array.from({ length: totalPage }, (_, index) => (
                        <li
                            key={index + 1}
                            className={`page-item ${page === index + 1 ? 'active' : ''}`} // Đánh dấu trang hiện tại
                        >
                            <a
                                className="page-link btn-sm"
                                href="#"
                                onClick={(event) => {
                                    event.preventDefault();
                                    setPage(index + 1); // Chuyển trang
                                }}
                            >
                                {index + 1}
                            </a>
                        </li>
                    ))}


                    <li className="page-item">
                        <a onClick={(event)=>{
                            handleNext(event)
                        }} className="page-link btn-sm" href="" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default ListComponent;
