import axios from 'axios';
import { fetchData, postData } from "./commonApi.js";

export const recommendProduct = async (type, page) => {
    return fetchData('/api/main/getFilterItem', {
        type,
        page,
        amount: 10,
    });
};

export const getProductDetail = async (productId) => {
    return fetchData('/api/used-item/getItem', {
        usedItemId: productId,
    });
};

export const getUsedItems = async (filters) => {
    const { category, priceRange, searchQuery, sort, searchKeyword, page } = filters;
    const { minPrice, maxPrice } = priceRange;

    const params = {
        category,
        minPrice,
        maxPrice,
        searchQuery,
        searchKeyword,
        sort,
        page,
        amount: 20,
    };

    return fetchData('/api/used-item/', params);
};


export const myProduct = async (data) => {
    const response = await axios.post('/api/used-item/getMyUsedItemList', data);
    return response.data;
};

export const saveProduct = async (input, filesData) => {
    const usedItemVO = {
        usedItemName: input.name,
        usedItemExplain: input.explain,
        usedItemPrice: input.price,
        usedItemStatus: input.status,
        usedItemPlace: input.address,
        usedItemPlaceDetail: input.addressDetail,
        categoryId: input.category,
    };

    const formData = new FormData();
    formData.append('usedItem', new Blob([JSON.stringify(usedItemVO)], { type: 'application/json' }));

    // 파일 데이터에서 파일을 복구하여 FormData에 추가
    const filePromises = filesData.map((fileData) =>
        fetch(fileData.url)
            .then((response) => response.blob())
            .then((blob) => {
                // Blob을 File 객체로 변환, 파일 확장자를 사용하도록 변경
                const filename = fileData.name; // 이미 사용자가 파일 이름을 지정
                return new File([blob], filename, { type: `image/${fileData.type}` });
            })
    );

    // 모든 파일이 준비되면 FormData에 추가하고 요청을 보냄
    const files = await Promise.all(filePromises);
    files.forEach((file) => {
        formData.append('files', file);
    });

    // Axios 요청 보내기
    return axios.post('/api/used-item/save', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
