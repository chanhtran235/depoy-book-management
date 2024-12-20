import axios from "axios";

export async function  getAllCategories() {
    try {
        let url =`https://json-server-books-d3mx.onrender.com/categories`;
        const resp = await axios.get(url);
        return resp.data;
    }catch (e) {
        console.log("e");
        return [];
    }
}