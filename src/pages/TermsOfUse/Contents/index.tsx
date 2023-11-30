import React,{useEffect, useState} from 'react'
import styles from './styles.module.scss'
import { Spread,CloseSpread } from '../../../assets/icons/agreement/icon';
const Contents = () => {
    const [openDetail, setOpenDetail] = useState<boolean>(false);

    return(
        <div className={styles.container}>
            {openDetail?
            <div>
                개인정보처리동의서<br/>FAC(이하 '회사'라고 합니다)은(는) 개인정보보호법 등 관련 법령상의 개인정보보호 규정을 준수하며 귀하의 개인정보보호에 최선을 다하고 있습니다. 회사는 개인정보보호법에 근거하여 다음과 같은 내용 으로 개인정보를 수집 및 처리하고자 합니다.<br/>
                다음의 내용을 자세히 읽어보시고 모든 내용을 이해하신 후에 동의 여부를 결정해주시기 바랍니다.<br/>
                제1조(개인정보 수집 및 이용 목적)<br/>
                이용자가 제공한 모든 정보는 다음의 목적을 위해 활용하며, 목적 이외의 용도로는 사용되지 않습니다.<br/>
                • 본인확인<br/>
                제2조(개인정보 수집 및 이용 항목)<br/>
                회사는 개인정보 수집 목적을 위하여 다음과 같은 정보를 수집합니다.<br/>
                - 성명, 주소, 전화번호, 이메일, 성별, 나이, 생년월일 및 직업<br/>
                사용자에게 적합한 방을 추천해 드리기 위해 성별, 직업, 나이를 수집하고 있습니다. 사용자의 정보는 여성안심구역 추천, 직업에 따른 교통 편의성 제고, 중개거래 가능 나이 등을 판별하는 용도 이외에 다른용도로 사용되지 않습니다.<br/>
                제3조(개인정보 보유 및 이용 기간)<br/>
                1. 수집한 개인정보는 수집•이용 동의일로부터 개인정보 수집•이용 목적을 달성할 때까지 보관 및 이용합니
                다.<br/>
                2. 개인정보 보유기간의 경과, 처리목적의 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개
                인정보를 파기합니다.<br/>
                제4조(동의 거부 관리)<br/>귀하는 본 안내에 따른 개인정보 수집• 이용에 대하여 동의를 거부할 권리가 있습니다. 다만, 귀하가 개 인정보 동의를 거부하시는 경우에 회원가입의 불이익이 발생할 수 있음을 알려드립니다.<br/>
                본인은 위의 동의서 내용을 충분히 숙지하였으며, 위와 같이 개인정보를 수집• 이용하는데 동의합니다.<br/>20234 108 269<br/>성명 : 김영훈 (서명 또는 인)<br/>
            </div>:<div>자세히 보기</div>}
            <img 
                src={openDetail?CloseSpread:Spread}
                onClick={()=>setOpenDetail(!openDetail)}
                style={openDetail?{top: 13}:undefined}
            />
        </div>
);}
export default Contents;