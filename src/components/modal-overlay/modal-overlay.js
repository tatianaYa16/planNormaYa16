import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from "prop-types";

const ModalOverlay=(props) => {
    return (
        <div className={styles.over_lay} onClick={props.onClose}></div>
    )
}

ModalOverlay.propsTypes = {
    onClose: PropTypes.func.isRequired
}

export default  ModalOverlay;