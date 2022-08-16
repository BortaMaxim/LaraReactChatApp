export const BASE_URL = 'http://127.0.0.1:8000/api/auth'
export const URL = 'http://127.0.0.1:8000'
export const getWithTokenOptions = (token) => {
    return {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
}
export const postOption = () => {
    return {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }
}
export const postWithTokenOptions = (token) => {
    return {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
}
export const uploadWithTokenOptions = (token) => {
    return {
        headers: {
            'Content-Types': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    }
}
