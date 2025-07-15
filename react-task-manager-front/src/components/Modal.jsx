import ReactDOM from "react-dom"

export default function Modal({ show, title, onClose, onConfirm, confirmText, content }) {
    if (!show) return null
    return ReactDOM.createPortal(
        <div className="modal">
            <div className="modal-container">
                <h2>{title}</h2>
                <div>{content}</div>
                <div >
                    <button onClick={onClose} className="btn btn-success" >Annulla</button>
                    <button onClick={onConfirm} className="btn btn-danger">{confirmText}</button>
                </div>
            </div>
        </div>,
        document.body

    )
}