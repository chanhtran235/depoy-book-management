import axios from "axios";

export async function getAll(page,search) {
    try {
        let url =`https://json-server-books-d3mx.onrender.com/books?name_like=${search.searchName}&category.id=${search.categoryId}&_page=${page}&_limit=2&_sort=price&_order=asc`;
        if (search.categoryId==""){
            url=`https://json-server-books-d3mx.onrender.com/books?name_like=${search.searchName}&_page=${page}&_limit=2&_sort=price&_order=asc`
        }
        const resp = await axios.get(url);
        // const totalCount = resp.headers['x-total-count'];
        // console.log("---------total-----------")
        // console.log(totalCount)
        return resp;
    }catch (e) {
        console.log("e");
        return null
    }

}
export async  function addNewBook(book) {
    try {
        let url =`https://json-server-books-d3mx.onrender.com/books`;
        const resp = await axios.post(url,book);
        return resp;
    }catch (e) {
        console.log("e");
        return null
    }
}