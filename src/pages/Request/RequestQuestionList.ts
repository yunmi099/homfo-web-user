export const requestQuestionList = [
    {
        "question":{"contents":`원하는 <span>매물 유형</span>은\n 어떤 것인가요?<b>(복수선택 가능)</b>`,"type":"realEstateType"},
        "answer":[{"title":"원/투룸", "value":"원/투룸"}, {"title":"쉐어하우스","value":"쉐어하우스",} ,
        {"title":"오피스텔", "value":"오피스텔"} ,{"title":"기타", "value":"기타"} ,{"title":"고시텔", "value":"고시텔"}],
        "mode":"row",
        "double":true,
        "filter":null,
     },
     {
        "question":{"contents":`<span>🏠 희망 거주기간</span>은\n 어떻게 되나요??`,"type":"residencePeriod"},
        "answer":[{"title":"6개월 이내", "value":"6개월 이내"}, {"title":"6개월~1년","value":"6개월~1년",} ,{"title":"1년~2년", "value":"1년~2년"} ,{"title":"2년", "value":"2년"} ,{"title":"집주인과 상의", "value":"집주인과상의"}],
        "mode":"row",
        "double":false,
        "filter":null,
     },
     {
        "question":{"contents":`구하는 <span>계약형태</span>는\n어떻게 되나요?`,"type":"contractType"},
        "answer":[ {"title":"월세", "value":["deposit", "montlyRent"]}, {"title":"전세","value":["jeonseDeposit"],},{"title":"상관없음","value":["deposit", "montlyRent","jeonseDeposit"],}],
        "mode":"column",
        "double":false,
        "filter":null,
    
    },
    {
        "question":{"contents":`💵 생각하는 <span>금액대</span>가\n어떻게 되나요?`,"type":"deposit"},
        "answer":null,
        "mode":"column",
        "double":false,
        "filter": {
            "data": {
              "deposit": [[500, 10000], ["500만원","1억 이상"], "월세 보증금"],
              "montlyRent": [[25, 150], ["25만원","150만원"], "월세"],
              "jeonseDeposit": [[500, 30000], ["500만원", "3억"], "전세 보증금"]
            } 
          }as {
            data: {
              [key: string]: [number[], string[],string];
            };
          },
    },
    {
        "question":{"contents":`💵 <span>대출 유/무</span> 확인`,"type":"loanAvailablity"},
        "answer":[{"title":"O", "value":"네"}, {"title":"x","value":"아니오",}],
        "mode":"column",
        "double":false,
        "filter":null,
    }
    ,{
        "question":{"contents":"<span>💵 전세대출 유형</span>이\n어떻게 되나요?","type":"loanType"},
        "answer":[{"title":"LH전세대출", "value":"LH전세대출"}, {"title":"일반대출","value":"일반대출",}],
        "mode":"column",
        "double":false,
        "filter":null,
    },
    {
        "question":{"contents":"🗓️ 예상<span> 입주시기</span>는\n어떻게 되나요?","type":"moveInPeriod"},
        "answer":[{"title":"2주 이내", "value":"2주 이내"},{"title":"2주~4주 이내","value":"2주~4주 이내"},{"title":"집주인과 협의","value":"집주인과 협의"},],
        "mode":"column",
        "double":false,
        "filter":null,
    },
    {
        "question":{"contents":"<span>🏢 필요한 시설</span>이 있나요?<b>(복수선택 가능)</b>","type":"roomOption"},
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
        "double":true,
        "filter":null,
    },
    {
        "question":{"contents":"<span>📋 추가 요청사항</span>이 있나요?","type":"additionalRequests"},
        "answer":null,
        "mode":"row",
        "double":false,
        "filter":null,
    }
];
    