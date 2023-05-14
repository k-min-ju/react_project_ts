import { useGoogleLogin } from "@react-oauth/google";
import * as common from "../common/commonFunction";

const googleLoginButton = () => {
    const loginSuccess = (res) => {
        if(common.isNotEmpty(res.access_token)) {
            sessionStorage.setItem("access_token", res.access_token);
            window.location.href = "/main";
        }
        console.log(res)
    }

    const loginError = () => {
        alert("로그인 실패");
    }

    const googleSocialLogin = useGoogleLogin({
        onSuccess: loginSuccess,
        onError: loginError
    })

    return (
        <div className='social_login_box' onClick={() => googleSocialLogin()}>
            <div className='social_login_image_box'>
                <img className='social_login_img' src={process.env.PUBLIC_URL + 'login_google.png'} alt='google_login' />
            </div>
            <div className='social_login_text_box'>구글 로그인</div>
        </div>
    )
}
export default googleLoginButton;