import "./LoginMain.css";
import GoogleLoginButton from './login/GoogleLogin.js';
import { GoogleOAuthProvider } from "@react-oauth/google";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

function Login() {
    useEffect( () => {
        // if(window.common.isNotEmpty(sessionStorage.getItem("access_token"))) {
        //     navigateBrowse();
        // }
    }, []);

    const navigate = useNavigate();

    const navigateBrowse = () => {
        navigate("/Browse");
    };

    return (
        <>
            <div className="Login-Wrapper-Background">
                <img className="Login_bg" src={process.env.PUBLIC_URL + '/login_bg.jpg'}/>
            </div>

            <div className="Header Login-Header"></div>

            <div className="Login-Body">
                <div>
                    <div className="Login-Content Login-Form Login-Form-Signup">
                        <div className="Login-Main">
                            <h1>로그인</h1>
                            <div className="LoginId">
                                <div>
                                    <input id="loginId" type="text" className='LoginTextField' />
                                    <label className="placeLabel">이메일 주소 또는 전화번호</label>
                                </div>
                            </div>
                            <div className="LoginPassWord">
                                <div>
                                    <input id="passWord" type="text" className='LoginTextField' />
                                    <label className="placeLabel">비밀번호</label>
                                </div>
                            </div>
                            <button className="Login-Button" type="submit" onClick={navigateBrowse}>로그인</button>
                            <div className="LoginHelp">
                                <div className="Ui-Input Login-Remember">
                                    <input type="checkbox" className="LoginCheckbox" id="rememberId"/>
                                    <label className="Login-Remember-Label" htmlFor="rememberId">
                                        <span className="Login-Remember-Text">로그인 정보 저장</span>
                                    </label>
                                    <div className="helper"></div>
                                </div>
                                <a className="LoginHelp-Link" href="/LoginHelp">도움이 필요하신가요?</a>
                            </div>
                            <div className="Login-Api-Zone">
                                <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_KEY}>
                                    <GoogleLoginButton/>
                                </GoogleOAuthProvider>
                            </div>
                        </div>

                        <div className="Login-Other">
                            <div className="Login-Signup-Now" >회원이 아닌가요?
                                <a target="_self" href="/">지금 가입하세요</a>.
                            </div>
                            <div className="Recaptcha-Terms-Of-Use">
                                <p></p>
                                <div className="Recaptcha-Terms-Of-Use-Disclosure" ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login;