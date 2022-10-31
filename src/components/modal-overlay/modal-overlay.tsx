import React, {FunctionComponent} from 'react';
import styles from './modal-overlay.module.css';

const ModalOverlay:FunctionComponent<{onClose:any}>=({onClose}) => {
    return (
        <div className={styles.over_lay} onClick={onClose}></div>
    )
}

export default  ModalOverlay;