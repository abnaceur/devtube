const createHistory = require("history").createBrowserHistory;

function removeToken() {
    localStorage.removeItem("token");
    let history = createHistory();
    history.push("/login");
    let pathUrl = window.location.href;
    window.location.href = pathUrl;   
}

export {
    removeToken,
}

