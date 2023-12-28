import { Area } from "../homfoRecommend&request/interface";
export {type OfferDocument};
interface OfferDocument {
    id: number;
    name: string;
    note:string;
    status: string;
    realtor: {
        id: number;
        agencyThumbnailDto: {
            id: string;
            name: string;
            type: string;
            status: string;
        };
        name: string;
        position: string | null;
        status: string;
    };
    agencyItem: {
        id: number;
        includeMaintenance:string;
        excludeMaintenance:string;
        agency: {
        id: string;
        name: string;
        type: string;
        chairmanName: string | null;
        chairmanCertificateId: string | null;
        roadAddress: string;
        lotAddress: string;
        officePhoneNumber: string | null;
        phoneNumber: string;
        deduction: boolean;
        openedAt: string;
        partner: boolean;
        lat: number;
        lng: number;
        status: string;
        areas: {
            data: Area[] 
            length: number;
        };
        };
        item: {
            id: number;
            name: string;
            roadAddress: string;
            lotAddress: string;
            floor: number;
            roomNumber: number;
            exclusiveArea: number;
            supplyArea: number;
            images: {
              data: {
                attachment: string;
                url: string;
              }[];
              length: number;
            };
        createdAt: string;
    };
    itemType: string;
    itemOptions: {
        data: {
            id: number;
            name: string;
        }[];
        length: number;
    };
    contractTypes: {
        data: string[];
        length: number;
    };
    loanType: string;
    monthlyDeposit: number;
    monthlyFee: number;
    jeonseDeposit: number;
    maintenanceCost: number;
    moveInPeriod: string;
    note: string;
    createdAt: string;
    updatedAt: string;
};
}