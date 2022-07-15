import React, {useRef} from 'react';
import {useDispatch} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {CONSTRUCTOR_REMOVE_INGREDIENT, CONSTRUCTOR_MOVE_INGREDIENT} from '../../../services/actions/burger-constructor';


const IngredientItem = (props) => {
    const uuid = props.data.uuid;
    const index = props.index;
    const {_id, name, price, image_large} = props.data;
    const dispatch = useDispatch();
    const itemRef = useRef(null);

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
        hover(item, monitor) {
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
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
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

IngredientItem.propTypes = {};
export default IngredientItem;