import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import downarrow from '../../../../../assets/icons/inquiry/downarrow1.png'
import { submitInquiry, getCategoryList, getInquiryDetailToModify } from '../../../../../services/inquiry/api';
import { updateFormData } from '../../../../../utils/updateFormData';
import { InquiryFormData } from '../../../../../store/type/inquiry&faq/interface';

function InquiryForm({
  setMode,
  modify,
  id,
  setModify,
}: {
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
  setModify: React.Dispatch<React.SetStateAction<boolean>>;
  modify: boolean;
  id: number;
}) {
  const [formData, setFormData] = useState<InquiryFormData>({
    categoryList: undefined,
    selectedCategory: undefined,
    openCategory: false,
    title: '',
    content: '',
  });

  const { categoryList, selectedCategory, openCategory, title, content } = formData;

  const updateFormDataAndSetState = (updates: Partial<InquiryFormData>) => {
    setFormData((prevData) => updateFormData(prevData, updates));
  };

  const handleErrorContent = () => {
    if (title === '') {
      alert('제목을 작성해주세요.');
    } else if (content === '') {
      alert('내용을 작성해주세요');
    } else {
      submitInquiry(2, title, selectedCategory!, content, modify);
      setModify(false);
      setMode(false);
    }
  };
  const handleCategoryChange = (key: string) => {
    updateFormDataAndSetState({ selectedCategory: key, openCategory: false });
  };

  useEffect(() => {
    getCategoryList(setFormData);
    modify && getInquiryDetailToModify(id, setFormData);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>제목</div>
      <input
        className={styles.titleinput}
        type="text"
        maxLength={50}
        placeholder="제목을 입력해주세요."
        value={title}
        onChange={(e) => updateFormDataAndSetState({ title: e.target.value })}
      />
      <div className={styles.underline}></div>
      <div className={styles.title}>분류</div>
      <div className={styles.category}>
        <div>{selectedCategory}</div>
        <img
          src={downarrow}
          width={12}
          height={10}
          alt="이미지를 제공하지 않습니다."
          onClick={() => updateFormDataAndSetState({ openCategory: !openCategory })}
        />
      </div>
      <div className={styles.underline}></div>
      {openCategory && categoryList !== undefined ? (
        categoryList.map((key, index) => (
          <div key={index} onClick={() => handleCategoryChange(key)}>
            {key}
          </div>
        ))
      ) : null}
      <div className={styles.title}>내용</div>
      <input
        className={styles.contentinput}
        type="text"
        maxLength={200}
        placeholder="내용을 입력해주세요(200자 이내)"
        value={content}
        onChange={(e) => updateFormDataAndSetState({ content: e.target.value })}
      />
      <button
        className={styles.button}
        onClick={() => selectedCategory !== undefined && handleErrorContent()}
      >
        {modify ? '수정' : '제출'}
      </button>
    </div>
  );
}

export default InquiryForm;
