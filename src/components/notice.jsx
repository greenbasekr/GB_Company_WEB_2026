export default function Notice({ notice, onClose }) {
  return <dialog className="notice-dialog" ref={node => { if (node && !node.open) node.showModal() }} onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose() }} aria-labelledby="notice-title"><div className="notice-content"><h2 id="notice-title">{notice.title}</h2><p>{notice.body}</p><button autoFocus onClick={onClose}>닫기</button></div></dialog>
}
