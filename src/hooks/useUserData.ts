import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";

export const useUserData=()=>{
    const getUserData = async () => {
        const user = auth.currentUser;

    if (user) {
    const userInfoCollection = collection(db, "userinfo");
    const userQuery = query(userInfoCollection, where("userid", "==", user.uid));
    const querySnapshot = await getDocs(userQuery);
        
    let username:string = "";
    let processedIndustry: string[] = [];
    let processedOccupation: string[] = [];
    let processedProgramming: string[] = [];

    if (!querySnapshot.empty) {
            const docData = querySnapshot.docs[0].data();
            
            // doc.data() is never undefined for query doc snapshots
            const username=docData.username;
            const industry=docData.industry;
            const occupation=docData.occupation;
            const programming=docData.programming;
            const processedIndustry= industry.map((oneIndustry:string) => {
                switch(oneIndustry){
                    case "1":
                    return "情報処理サービス業界";
                    case "2":
                    return "ゲーム業界";
                    case "3":
                    return "Web・インターネット業界";
                    case "4":
                    return "ハードウェア業界";
                    case "5":
                    return "ソフトウェア業界";
                    default:
                    return ""; // もし想定外の値が入っていた場合のデフォルト処理
                }
                return oneIndustry
              });
            const processedOccupation=occupation.map((oneOccupation:string)=>{
                switch(oneOccupation){
                    case "1":
                    return "システムエンジニア";
                    case "2":
                    return "プログラマー";
                    case "3":
                    return "ネットワークエンジニア";
                    case "4":
                    return "ハードウェアエンジニア";
                    case "5":
                    return "組み込みエンジニア";
                    case "6":
                    return "ITコンサルタント";
                    case "7":
                    return "セールスエンジニア";
                    case "8":
                    return "Webデザイナー";
                    case "9":
                    return "ゲームプランナー";
                    case "10":
                    return "ゲームプログラマー（ゲーム開発）";
                    case "11":
                    return "ゲームプログラマー（ゲーム開発支援）";
                    case "12":
                    return "ゲームプログラマー（バックエンドプログラマー）";
                    case "13":
                    return "ゲームデザイナー";
                    default:
                    return ""; // もし想定外の値が入っていた場合のデフォルト処理
                }
                return oneOccupation
            })
            const processedProgramming=programming.map((oneProgramming:string)=>{
                switch(oneProgramming){
                    case "1":
                    return "Python";
                    case "2":
                    return "JavaScript";
                    case "3":
                    return "Ruby";
                    case "4":
                    return "Java";
                    case "5":
                    return "Swift";
                    case "6":
                    return "Go";
                    case "7":
                    return "C";
                    case "8":
                    return "C++";
                    case "9":
                    return "C#";
                    case "10":
                    return "TypeScript";
                    case "11":
                    return "PHP";
                    case "12":
                    return "Kotlin";
                    case "13":
                    return "Perl";
                    case "14":
                    return "Scala";
                    case "15":
                    return "VisualBasic.NET";
                    default:
                    return ""; // もし想定外の値が入っていた場合のデフォルト処理
                }
                return oneProgramming
            })
            return {username,processedIndustry,processedOccupation,processedProgramming}
            }
        }
            return null;
        };
        return getUserData();
    }