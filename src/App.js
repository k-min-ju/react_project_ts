import Login from "./Login.js";
import Browse from "./Browse.js";
import {Route, Routes} from "react-router-dom";

function App() {

  return (

    <div className="App">
        <div>
            {/* 페이지 이동처리 */}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/Browse" element={<Browse />} />
            </Routes>
        </div>

    </div>
  );
}

export default App;
