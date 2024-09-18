const getUser = () => {
    const userStr = localStorage.getItem('user') || ""
    const user = userStr ? JSON.parse(userStr) : null
    return user;
}

export {
    getUser
}