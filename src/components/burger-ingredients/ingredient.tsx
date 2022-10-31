import styles from "./burger-ingredients.module.css";
import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC} from "react";
import {useDrag} from "react-dnd";
import {Link, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "../../services/hooks";
import {ITypeIngredient} from "../../utils/types";
import {ingredientModalOpen} from "../../services/actions/burger-ingredients";

interface IIngredient {
   product:ITypeIngredient
}
export const Ingredient:FC<IIngredient> = ({product})=> {
    const location = useLocation();
    const {ingredients, bun} = useSelector(state => state.burgerConstructor);
    const {image_large, price, name, _id, type} = product

    let counter = ingredients.filter((ingredient) => ingredient._id === _id).length;

    if (type === 'bun'
        && bun
        && bun._id === _id) {
        counter = 2;
    }

    const [{opacity}, refIngredient] = useDrag({
        type: type === 'bun' ? 'buns' : 'ingredients',
        item: product,
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    })

    const dispatch = useDispatch();

    const handleOpenModal = () => {
        dispatch(ingredientModalOpen());
    }
    return (
        <Link onClick={handleOpenModal}
              id={_id}
              className={styles.ingredientCard}
              style={{opacity: opacity}}
              ref={refIngredient}
              draggable
              to={{pathname: `/ingredients/${_id}`, state: {background: location, ids: _id}}}>
            <div className={styles.counter}>
                {counter ? <Counter count={counter} size="default"/> : ""}
            </div>
            <img src={image_large} className={styles.img}/>
            <div className={styles.price}>
                <p className="text text_type_digits-default">{price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={styles.name + ' text text_type_main-small '}>
                {name}
            </p>
        </Link>
    )
}