import { useEffect } from 'react';
import './Toast.css';

function Toast({ message, type = 'success' }) {
    return (
        <div className={`toast toast-${type}`}>
            <div className="toast-content">
                <span className="toast-icon">
                    {type === 'success' ? '✅' : '❌'}
                </span>
                <span className="toast-message">{message}</span>
            </div>
        </div>
    );
}

export default Toast;
