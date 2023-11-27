import { NavigateFunction } from "react-router-dom";
import { fetchFromApi } from "../../utils/axios";
import { Dispatch, SetStateAction } from "react";
export const doubleCheck = async (nickname: string, setMessage:Dispatch<SetStateAction<string>>, setColor:Dispatch<SetStateAction<string>>): Promise<void> => {
    try {
        const res = await fetchFromApi('GET', `/users/auth/duplicate/nickname/${nickname}`);
        if (res.status === 200){
            setMessage("사용 가능한 닉네임입니다.");
            setColor("green");
        }
    } catch (e:any) {
        setMessage(e.response.data.message);
        setColor("red");
    }
}
export const handleWithdrawal= async (userId: number,navigate:NavigateFunction)=>{
        try {
           if (window.confirm('회원을 탈퇴 하시겠습니까?')) {
           await fetchFromApi('PATCH',`/users/${userId}/withdrawal`);
           alert("회원이 탈퇴되었습니다.");
           }
          } catch (e:any) {
            alert(e)
            console.log(e);
        }
}