import { fetchFromApi } from "../../utils/axios";
import { Dispatch, SetStateAction } from "react";
import { DETAIL, FilteredData, InquiryFormData } from "../../store/type/inquiry&faq/interface";
import { updateFormData } from "../../utils/updateFormData";
export const getInquiryDetailToModify = async (
  id: number,
  setFormData: Dispatch<SetStateAction<InquiryFormData>>
): Promise<void> => {
  try {
    const res = await fetchFromApi('GET', `/errors/${id}/detail`);
    const updates: Partial<InquiryFormData> = {
        selectedCategory: res.data.question.errorType,
        content: res.data.question.errorContent,
        title: res.data.question.errorTitle,
    };
    setFormData((prev) => updateFormData(prev, updates));
  } catch (e) {
    console.log(e);
  }
};
export const getInquiryDetail = async (errorId: number, setDetailContent:Dispatch<SetStateAction<DETAIL|undefined>>): Promise<void> => {
    try {
      const res= await fetchFromApi('GET',`/errors/${errorId}/detail`);
      setDetailContent(res.data);
    } catch (e) {
      console.log(e);
    }
  };
export const getCategoryList = async (
  setFormData: Dispatch<SetStateAction<InquiryFormData>>
): Promise<void> => {
  try {
    const res = await fetchFromApi('GET', `/errors/type`);
      const updates: Partial<InquiryFormData> = {
        categoryList: res.data.data,
        selectedCategory: res.data.data[0],
      };
    setFormData((prev) => updateFormData(prev, updates));
  } catch (e) {
    console.log(e);
  }
};
export const submitInquiry = async (
  userId: number,
  title: string,
  category: string,
  content: string,
  modify: boolean
): Promise<void> => {
  const data = {
    userId: 2,
    errorTitle: title,
    errorType: category,
    errorContent: content,
  };
  try {
    if (modify) {
      await fetchFromApi('PATCH', `/errors/${userId}`, data);
    } else {
      await fetchFromApi('POST', `/errors`, data);
    }
  } catch (e) {
    console.log(e);
  }
};
export const getInquiryList = async (userId: number,setData:Dispatch<SetStateAction<FilteredData[] | undefined>>, filterData:any): Promise<void> => {
    try {
      const res = await fetchFromApi('GET',`/errors/users/${userId}`);
      setData(filterData(res.data.data));
    } catch (e:any) {
      console.log(e);
    }
};
  