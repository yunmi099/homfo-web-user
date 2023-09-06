export const hompoQuestionList = [
{
    "question":{"contents":`단국대학교에 <span>재학 또는\n 재직</span> 중이신가요?`,"type":"universityPeople"},
    "answer":[{"title":"예", "value":true}, {"title":"아니오","value":false,}],
    "mode":"column",
    "double":false,
    "filter":null,
 },
 {
    "question":{"contents":`🚐 선호하는 <span>통학수단은</span>\n무엇인가요?<b>(복수선택 가능)</b>`,"type":"transports"},
    "answer":[ {"title":"도보 🚶", "value":"WALKING"}, {"title":"자전거(킥보드) 🚲","value":"BIKE",},{"title":"버스 🚌","value":"BUS",}],
    "mode":"column",
    "double":true,
    "filter":null,

},
{
    "question":{"contents":`🚐 선호하는 <span>통학수단은</span>\n무엇인가요?`,"type":"transports"},
    "answer":null,
    "mode":"column",
    "double":true,
    "filter": {
        "data": {
          "WALKING": [[15, 60], ["15분 이내", "30분 이내", "1시간 이상"], "🚶 도보"],
          "BIKE": [[5, 30], ["5분 이내", "10분 이내", "20분 이내", "30분 이상"], "🚲 자전거"],
          "BUS": [[5, 30], ["5분 이내", "10분 이내", "20분 이내", "30분 이상"], "🚌 버스"]
        } 
      }as {
        data: {
          [key: string]: [number[], string[],string];
        };
      },
}
,{
    "question":{"contents":"<span>운동, 공부, 취미</span>를 집에서\n하시는 것을 선호하시나요?","type":"hobbyInHome"},
    "answer":[{"title":"예", "value":true}, {"title":"아니오","value":false,}],
    "mode":"column",
    "double":false,
    "filter":null,
},{
    "question":{"contents":"내가 가장 <span>필요한 시설</span>은\n무엇인가요?<b>(복수선택 가능)</b>","type":"facilities"},
    "answer":[{"title":"마트/편의점", "value":"MARKET"},{"title":"식당/카페","value":"FOOD"},{"title":"스터디 카페/도서관","value":"STUDY"}, {"title":"노래방/피시방","value":"LEISURE"}],
    "mode":"row",
    "double":true,
    "filter":null,
}
];
