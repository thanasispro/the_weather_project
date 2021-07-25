export interface SelectionItem {
    city: string,
    country: string,
    max:number,
    min:number,
    avg:number,
    countryCode:string,
    now: number,
    index: number
}

export type HomepageParam = {
    type: string;
};