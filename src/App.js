import Login from "./Login.tsx";
import Browse from "./Browse.js";
import Watch from "./Watch.js";
import {Route, Routes} from "react-router-dom";
import * as common from "./common/commonFunction.js";
import {useEffect} from "react";
// import {createContext} from "react";
// window.common = common;

// export let Context = createContext();

function App() {
    useEffect(() => {
        document.title = 'J MOVIE';
    }, []);
    return (
    <div className="App">
        <div>
            {/* 페이지 이동처리 */}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/Browse" element={<Browse />} />
                <Route path="/watch/:movieId/:movieSeq/:movieVal" element={<Watch />} />
                {/*<Route path="/Browse" element={*/}
                {/*    <Context.Provider value={{}}>*/}
                {/*        <Browse />*/}
                {/*    </Context.Provider>*/}
                {/*}*/}
                />
            </Routes>
        </div>
    </div>
    );
}

export default App;
