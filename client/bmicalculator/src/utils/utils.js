let token;

const isLoggedIn  = () => {
    token = JSON.parse(localStorage.getItem("token"));
    if (token) return true;
    else return false;
}

export { isLoggedIn };