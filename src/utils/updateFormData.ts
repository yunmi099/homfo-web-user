import { InquiryFormData } from "../store/type/inquiry&faq/interface";
export const updateFormData = (formData: InquiryFormData, updates: Partial<InquiryFormData>): InquiryFormData => ({
    ...formData,
    ...updates,
});