import {TOrderStatus} from "../services/types/types";

export const getOrderData = (dateOrder: string): string => {
    const date = new Date(dateOrder).setHours(0, 0, 0, 0);
    const currentDate = new Date().setHours(0, 0, 0, 0);
    let day = new Date(date).toLocaleDateString("ru-RU", {});

    if (date === currentDate) {
        day = "Сегодня";
    } else if (currentDate - date === 24 * 60 * 60 * 1000) {
        day = "Вчера";
    } else if (currentDate - date === -24 * 60 * 60 * 1000) {
        day = "Завтра";
    }
    const time = new Date(dateOrder).toLocaleTimeString("ru-Ru", {
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
    });

    return `${day}, ${time}`;
};

export const getOrderStatus = (orderStatus: string): TOrderStatus =>
    ((orderStatus === 'done')) ? { name: 'Выполнен', color: '#00CCCC' }
        : ((orderStatus === 'pending')) ? { name: 'Создан', color: 'inherit' }
            : ((orderStatus === 'created')) ? { name: 'Готовится', color: 'yellow' }
                : { name: 'Отменён', color: 'tomato' };