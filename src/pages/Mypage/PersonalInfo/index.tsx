import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Header from '../../../components/layout/header';
import axios, { AxiosResponse } from 'axios';
import { SERVER_DEPOLY_URL } from '../../../utils/axios';
import { formatDate } from '../../../utils/getDate';

interface PersonalInfo {
  dateOfBirth: string;
  gender: string;
  hbtiType: null;
  job: string;
  nickName: string;
  refreshToken: null;
  status: string;
  userAccount: string;
  userId: number;
  userPhoneNum: string;
}
function renderInfo(key: string, value: string, underline?: boolean) {
    return (
      <div>
        <div className={styles.key}>{key}</div>
        <div className={styles.value} style={underline ? { textDecoration: 'underline' } : undefined}>
          {value}
        </div>
      </div>
    );
  }
  
function PersonalInfo() {
  const [info, setInfo] = useState<PersonalInfo | undefined>(undefined);

  const getPersonalInfo = async (id: number): Promise<void> => {
    try {
      const res: AxiosResponse<PersonalInfo> = await axios.get(`${SERVER_DEPOLY_URL}/users/${id}/info`);
      if (res.status === 200) {
        setInfo(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getPersonalInfo(2);
  }, []);

  return (
    <div className={styles.container}>
      <Header title="개인정보" />
      {info && (
        <div>
            <div>
            {renderInfo('닉네임', info.nickName)}
            {renderInfo('아이디', info.userAccount)}
            {renderInfo('비밀번호', '재설정', true)}
            {renderInfo('성별', info.gender === 'M' ? '남성' : '여성')}
            {renderInfo('직업', info.job)}
            {renderInfo('전화번호', info.userPhoneNum)}
            {renderInfo('생년월일', formatDate(info.dateOfBirth))}
            </div>
        </div>
      )}
      <button className={styles.button}>수정하기</button>
    </div>
  );
}

export default PersonalInfo;
