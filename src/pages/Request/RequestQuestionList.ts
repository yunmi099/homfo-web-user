export const requestQuestionList = [
    {
        "question":{"contents":`원하는 <span>매물 유형</span>은\n 어떤 것인가요?<b>(복수선택 가능)</b>`,"type":"realEstateType"},
        "answer":[{"title":"원/투룸", "value":"원/투룸"}, {"title":"쉐어하우스","value":"쉐어하우스",} ,
        {"title":"오피스텔", "value":"오피스텔"} ,{"title":"기타", "value":"기타"} ,{"title":"고시텔", "value":"고시텔"}],
        "mode":"row",
        "duplication":true,
        "filter":null,
     },
     {
        "question":{"contents":`<span>🏠희망 거주기간</span>은\n 어떻게 되나요??`,"type":"residencePeriod"},
        "answer":[{"title":"6개월 이내", "value":"6개월 이내"}, {"title":"6개월~1년","value":"6개월~1년",} ,{"title":"1년~2년", "value":"1년~2년"} ,{"title":"2년", "value":"2년"} ,{"title":"집주인과 상의", "value":"집주인과상의"}],
        "mode":"row",
        "duplication":false,
        "filter":null,
     },
     {
        "question":{"contents":`구하는 <span>계약형태</span>는\n어떻게 되나요?`,"type":"contractType"},
        "answer":[ {"title":"월세", "value":"월세"}, {"title":"전세","value":"전세",},{"title":"상관없음","value":"월세전세",}],
        "mode":"column",
        "duplication":true,
        "filter":null,
    
    },
    {
        "question":{"contents":`💵 생각하는 <span>금액대</span>가\n어떻게 되나요?`,"type":"contractType"},
        "answer":null,
        "mode":"column",
        "duplication":false,
        "filter": {
            "data": {
              "월세": [[500, 10000], ["500만원","3670만원","6800만원","1억 이상"], "보증금"],
              "전세": [[25, 150], ["25만원","65만원","108만원","150만원"], "월세"],
              "월세전세": [[500, 30000], ["500만원","1억 1000만원","2억 2000만원", "3억"], "전세보증금"]
            } 
          }as {
            data: {
              [key: string]: [number[], string[],string];
            };
          },
    },
    {
        "question":{"contents":`💵 <span>대출 유/무</span> 확인`,"type":"loan"},
        "answer":[{"title":"O", "value":true}, {"title":"x","value":false,}],
        "mode":"column",
        "duplication":false,
        "filter":null,
    }
    ,{
        "question":{"contents":"<span>💵전세대출 유형</span>이\n어떻게 되나요?","type":"type"},
        "answer":[{"title":"LH전세대출", "value":true}, {"title":"일반대출","value":false,}],
        "mode":"column",
        "duplication":false,
        "filter":null,
    },
    {
        "question":{"contents":"🗓️예상<span> 입주시기</span>는\n어떻게 되나요?","type":"moveInPeriod"},
        "answer":[{"title":"2주 이내", "value":"MARKET"},{"title":"2주~4주 이내","value":"FOOD"},{"title":"집주인과 협의","value":"STUDY"},],
        "mode":"column",
        "duplication":false,
        "filter":null,
    },
    {
        "question":{"contents":"<span>🏢 필요한 시설</span>이 있나요?<b>(복수선택 가능)</b>","type":"wantedFacilities"},
        "answer":[{"title":"CCTV", "value":"CCTV"},{"title":"엘레베이터","value":"엘레베이터"},
        {"title":"주차장","value":"주차장"}, {"title":"옷장","value":"옷장"},{"title":"TV","value":"TV"}, 
        {"title":"에어컨","value":"에어컨"},
        {"title":"냉장고","value":"냉장고"},
        {"title":"전자레인지","value":"전자레인지"},
        {"title":"침대","value":"침대"},
        {"title":"책상","value":"책상"},       
        {"title":"의자","value":"의자"},
        {"title":"기타","value":"기타"},],
        "mode":"row",
        "duplication":true,
        "filter":null,
    },
    {
        "question":{"contents":"<span>📋 추가 요청사항</span>이 있나요?","type":"additionalRequests"},
        "answer":null,
        "mode":"row",
        "duplication":false,
        "filter":null,
    }
];
    