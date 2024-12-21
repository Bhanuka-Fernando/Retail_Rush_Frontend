import React from 'react';
import ReactDOM from 'react-dom';
import './SalesChartsModal.css'; // Import the CSS file

const SalesChartsModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>×</button>
                {children}
            </div>
        </div>,
        document.body // Or you can use another container if needed
    );
};

export default SalesChartsModal;
