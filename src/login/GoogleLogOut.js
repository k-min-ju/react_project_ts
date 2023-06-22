const googleLogOut = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("loginType");
}

export default googleLogOut;