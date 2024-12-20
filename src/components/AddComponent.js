import React, {useEffect, useState} from "react";
import * as Yup from 'yup';
import {Formik, Form, ErrorMessage, Field} from 'formik'
import {getAllCategories} from "../services/categoryService";
import {addNewBook} from "../services/bookService";
import {useNavigate} from 'react-router-dom'

function AddComponent() {
    const [book, setBook] = useState({
        code: "",
        name: "",
        author: "",
        publicationOfDate: "",
        category: ""
    });
    const [categories, setCategories] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            let list = await getAllCategories();
            setCategories(list)
        }
        fetchData();
    }, [])
    const handleSubmit = async (value) => {
        console.log(value);
        const newBook = {
            ...value,
            category: JSON.parse(value.category)
        }
        console.log(newBook)
        await addNewBook(newBook);
        navigate('/list');

    }
    const validattion = Yup.object({
        code: Yup.string().required('Yêu cầu nhập'),
        name: Yup.string().required('Yêu cầu nhập'),
        author: Yup.string().required('Yêu cầu nhập'),
        publicationOfDate: Yup.date().required('Yêu cầu nhập'),
        category: Yup.string().required('Yêu cầu nhập')
    })
    return (
        <div>
            <h3>Thêm mới sách </h3>
            <Formik initialValues={book} onSubmit={handleSubmit} validationSchema={validattion}>
                <Form className="container p-4 border rounded shadow-sm w-25">
                    <div className="row mb-3 align-items-center">
                        <div className="col-sm-4">
                            <label htmlFor="code" className="form-label mb-0">Code</label>
                        </div>
                        <div className="col-sm-8">
                            <Field type="text" id="code" name="code" className="form-control form-control-sm" />
                            <ErrorMessage component="small" name="code" className="text-start text-danger mt-1 d-block" />
                        </div>
                    </div>

                    <div className="row mb-3 align-items-center">
                        <div className="col-sm-4">
                            <label htmlFor="name" className="form-label mb-0">Name</label>
                        </div>
                        <div className="col-sm-8">
                            <Field type="text" id="name" name="name" className="form-control form-control-sm" />
                            <ErrorMessage component="small" name="name" className="text-start text-danger mt-1 d-block" />
                        </div>
                    </div>

                    <div className="row mb-3 align-items-center">
                        <div className="col-sm-4">
                            <label htmlFor="author" className="form-label mb-0">Author</label>
                        </div>
                        <div className="col-sm-8">
                            <Field type="text" id="author" name="author" className="form-control form-control-sm" />
                            <ErrorMessage component="small" name="author" className="text-start text-danger mt-1 d-block" />
                        </div>
                    </div>

                    <div className="row mb-3 align-items-center">
                        <div className="col-sm-4">
                            <label htmlFor="publicationOfDate" className="form-label mb-0">Publication Date</label>
                        </div>
                        <div className="col-sm-8">
                            <Field type="date" id="publicationOfDate" name="publicationOfDate" className="form-control form-control-sm" />
                            <ErrorMessage component="small" name="publicationOfDate" className="text-start text-danger mt-1 d-block" />
                        </div>
                    </div>

                    <div className="row mb-3 align-items-center">
                        <div className="col-sm-4">
                            <label htmlFor="category" className="form-label mb-0">Category</label>
                        </div>
                        <div className="col-sm-8">
                            <Field as="select" id="category" name="category" className="form-select form-select-sm">
                                <option value="">---Chọn--------</option>
                                {categories.map(c => (
                                    <option key={c.id} value={JSON.stringify(c)}>{c.name}</option>
                                ))}
                            </Field>
                            <ErrorMessage component="small" name="category" className=" text-start text-danger mt-1 d-block" />
                        </div>
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn btn-primary btn-sm">Save</button>
                    </div>
                </Form>
            </Formik>




        </div>
    )
}

export default AddComponent;