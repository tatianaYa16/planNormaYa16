export type TOrder = {
    ingredients: Array<string>;
    _id: string;
    name: string;
    status: string;
    number: number;
    createdAt: string;
    updatedAt: string;
};

export type TOrders = {
    orders: Array<TOrder>;
    total: number;
    totalToday: number;
}


export interface IOrderCard  {
    orders: Array<TOrder>;
    orderID: string;
    number: number;
    time: string;
    name: string;
    status: string;
    ingredients: Array<string>;
}

export interface IOrderCardIngredients {
    idIngredients: Array<string>;
}

export type TLocation = {
    from: Location;
    background?: Location;
    number?: number | string;
    orders?: Array<TOrder>
};


export type TOrderStatus = {
    name: string;
    color: string;
};
