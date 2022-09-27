const Modal = (props) => {
  return (
    <div className="modal fixed top-0 left-0 z-10 center min-w-full min-h-full flex justify-center items-center">
      <div className="modal w-full max-h-screen overflow-scroll">
        {/* Modal Header */}
        <div className="flex justify-start items-center gap-x-2 p-2 border-b border-blue-900">
          <button type="button" onClick={props.onClose}>
            <i
              className="fa fa-caret-left fa-2x md:fa-3x"
              aria-hidden="true"
            ></i>
          </button>
          <h1 className="text-xl">{props.title}</h1>
        </div>

        {/* Modal Body */}
        <div className="p-2 scroll">{props.children}</div>

        {/* Modal Footer */}
        {props.showFooter ? (
          <div className="p-2 border-t border-cyan-800">
            <button onClick={props.onClose}>Close</button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Modal;
