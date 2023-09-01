export const hompoQuestionList = [
{
    "question":`선택하는 학교에 <span>재학 또는\n 재직</span> 중이신가요?`,
    "answer":["예", "아니오"],
    "mode":"column",
    "double":false,
    "filter":null,
 },
 {
    "question":"🚐 선호하는 <span>통학수단은</span>\n무엇인가요?<b>(복수선택 가능)</b>",
    "answer":["도보 🚶", "자전거(킥보드) 🚲","버스 🚌"],
    "mode":"column",
    "double":true,
    "filter":null,

},
{
    "question":"🚐 선호하는 <span>통학수단은</span>\n무엇인가요?",
    "answer":["분","시간"],
    "mode":"column",
    "double":true,
    "filter":{"🚶 도보":[15, 60], "🚲 자전거": [5, 30],"🚌 버스": [5,30]},
}
,{
    "question":"<span>운동, 공부, 취미</span>를 집에서\n하시는 것을 선호하시나요?",
    "answer":["예","아니오"],
    "mode":"column",
    "filter":null,
},{
    "question":"내가 가장 <span>필요한 시설</span>은\n무엇인가요?<b>(복수선택 가능)</b>",
    "answer":["마트/편의점","식당/카페","스터디 카페/도서관", "노래방/피시방"],
    "mode":"row",
    "filter":null,
}
];
