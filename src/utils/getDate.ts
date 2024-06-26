export function formatDateTime(dateTimeString: string): string {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1;
    const day = dateTime.getDate();
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
}
export function formatDate(dateTimeString: string): string {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1;
    const day = dateTime.getDate();
    return `${year}년 ${month}월 ${day}일`;
}

export function formatDateWithComma(dateTimeString: string): string {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
    const day = dateTime.getDate().toString().padStart(2, '0');

    return `${year}. ${month}. ${day}`;
}
