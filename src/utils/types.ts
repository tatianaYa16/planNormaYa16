import {TOrder} from "../services/types/types";
import { Location } from "history";

export interface ITypeIngredient {
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    type: string;
    uuid: number;
    _id: string;
}

export interface ILocation {
    from: Location;
    background?: Location;
    number?: number | string;
    orders?: Array<TOrder>
}

export type TUser = {
    readonly id: number;
    readonly password: string;
    readonly email: string;
    readonly name: string;
};

