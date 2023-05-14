import {GoogleLogout } from "react-google-login";


const googleLogOut = () => {

    const successLogout = () => {
        console.log("successLogout");
    }

    return (
        <GoogleLogout
            clientId={process.env.REACT_APP_GOOGLE_API_KEY}
            onLogoutSuccess={successLogout}
        />
    )
}