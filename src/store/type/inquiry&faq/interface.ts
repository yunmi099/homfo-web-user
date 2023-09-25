export { type FAQLIST, type QUESTION, type ANSWER, type DETAIL, type OriginalData , type FilteredData, type ORIGIN_FAQ, type InquiryFormData };
interface QUESTION{
    errorId: number;
    userId: number;
    errorTitle: string;
    errorContent: string;
    errorType: string;
    status : string;
    isAnswered:number;
    createdAt: string; 
    updatedAt: string;
}
interface ANSWER{
    answerId: number;
    answererId: number;
    answerContent: string;
    answeredAt:string;
    updatedAt: string;
    status: string;
}
interface DETAIL {
    question: QUESTION;
    answer: ANSWER;
  }
interface OriginalData {
    errorId: number;
    userId: number;
    errorTitle: string;
    errorContent: string;
    errorType: string;
    status: string;
    isAnswered: number;
    createdAt: string;
    updatedAt: string;
  }
interface FilteredData {
    errorId: number;
    errorTitle: string;
    isAnswered: number;
    createdAt: string;
    updatedAt: string;
  }
interface ORIGIN_FAQ {
    faqId: number;
    writerId: number;
    question: string;
    answer: string;
    isPublic: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  }
interface FAQLIST {
    faqId: number;
    question: string;
    answer: string;
    isPublic: string;
  }
interface InquiryFormData {
    categoryList: string[] | undefined;
    selectedCategory: string | undefined;
    openCategory: boolean;
    title: string;
    content: string;
}