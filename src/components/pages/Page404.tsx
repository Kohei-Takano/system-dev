import {memo,useEffect,VFC} from "react";
import { useHistory } from "react-router-dom";

export const Page404:VFC=memo(()=>{
    const history=useHistory();
    useEffect(() => {
        // ローカルストレージから情報を取得
        const storedInfo = localStorage.getItem("loggedInUser");
    
        if (!storedInfo) {
          history.push("/"); // ログインページへ遷移
        }
      }, [history]);
    return<p>404ページです</p>;
});