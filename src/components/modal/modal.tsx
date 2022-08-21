import React, {FC, ReactNode} from 'react';
import ReactDOM from "react-dom";
import styles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("react-modals");

type TModal = {
    headerText?: string;
    children: ReactNode;
    onClose: () => void;
};

const Modal: FC<TModal> = ({children, headerText, onClose}) => {
    const handleEscKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }
    }
    React.useEffect(() => {
        document.addEventListener('keyup', handleEscKey);
        return () => {
            document.removeEventListener('keyup', handleEscKey);
        }
    }, [])


    return (modalRoot && ReactDOM.createPortal(
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
            modalRoot)
    );
};

export default Modal;



