import React from 'react';
import ReactDOM from "react-dom";
import styles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";


Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    headerText: PropTypes.string,
    children: PropTypes.element.isRequired,
}
const modalRoot = document.getElementById("react-modals");

export default function Modal(props) {
    const {children, headerText, onClose} = props;
    const handleEscKey = (e) => {
        if (e.key === 'Escape') {
            onClose(e);
        }
    }
    React.useEffect(() => {
        document.addEventListener('keyup', handleEscKey);
        return () => {
            document.removeEventListener('keyup', handleEscKey);
        }
    },[])


    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClose={onClose}/>
            <section className={styles.modal + ' pt-10 pr-10 pl-10 pb-15'}>
                <section className={styles.header}>
                    <p className={styles.headerText + ' text text_type_main-large'}>{headerText}</p>
                    <div className={styles.close} onClick={onClose}>
                        <CloseIcon type={"primary"}/>
                    </div>
                </section>
                {children}
            </section>
        </>,
        modalRoot
    )
}



