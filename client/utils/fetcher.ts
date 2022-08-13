import axios from "axios";

const fetcher = async (url: string, headers = {}) => {
    try {
        const { data } = await axios.get(url, {
            headers,
            withCredentials: true,
        });
        return data;
    } catch (error) {
        return null;
    }
};

export default fetcher;
