import { ORIGIN_FAQ, FAQLIST } from "../../store/type/inquiry&faq/interface";
import { fetchFromApi } from "../../utils/axios";
export const getFAQlist = async (setFaqList:React.Dispatch<React.SetStateAction<FAQLIST[] | undefined>>, filterData:(data: ORIGIN_FAQ[]) => FAQLIST[]): Promise<void> => {
    try {
        const res = await fetchFromApi('GET',`/faq`);
        if (res.status === 200){
          setFaqList(filterData(res.data.data));
        }
    } catch (e) {
      console.log(e);
    }
};
