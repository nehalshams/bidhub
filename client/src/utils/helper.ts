const getUser = () => {
    const userStr = localStorage.getItem('user') || ""
    const user = JSON.parse(userStr)
    return user;
}

export {
    getUser
}