import React, {FC, useRef} from 'react';
import {useDispatch} from "react-redux";
import {useDrag, useDrop, XYCoord} from "react-dnd";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {CONSTRUCTOR_REMOVE_INGREDIENT, CONSTRUCTOR_MOVE_INGREDIENT} from '../../../services/actions/burger-constructor';
import {ITypeIngredient} from "../../../utils/types";

type TCard<T> = {
    data: T;
    key: number;
    index: number;
};

const IngredientItem: FC<TCard<ITypeIngredient>> = (props) => {
    const uuid = props.data.uuid;
    const index = props.index;
    const {name, price, image_large} = props.data;
    const dispatch = useDispatch();
    const itemRef = useRef<HTMLDivElement>(null);

    const handleRemove = () => {
        dispatch({
            type: CONSTRUCTOR_REMOVE_INGREDIENT,
            id: uuid
        })
    }

    const [{isDragging}, drag] = useDrag({
        type: 'sortable',
        item: () => {
            return {...props, index};
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;

    const [, drop] = useDrop({
        accept: 'sortable',
        hover(item: TCard<ITypeIngredient>, monitor) {
            if (!itemRef.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = itemRef.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset: XYCoord|null = monitor.getClientOffset();
            if (clientOffset) {
                const hoverClientY = clientOffset.y - hoverBoundingRect.top;
                if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                    return;
                }
                if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                    return;
                }
            }
            dispatch({
                type: CONSTRUCTOR_MOVE_INGREDIENT,
                dragIndex,
                hoverIndex
            })

            item.index = hoverIndex
        },
    });

    drag(drop(itemRef));

    return (
        <span style={{opacity: opacity}} ref={itemRef}>
            <DragIcon type="primary"/>
            <ConstructorElement
                text={name}
                price={price}
                thumbnail={image_large}
                handleClose={handleRemove}/>
        </span>
    )
}
export default IngredientItem;