import React from 'react';


/** This is custom Modal component. Children - elements within an object */
const TodoModal = ({children, visible, setVisible}) => {


    return (
        <div className={visible? 'modal active' : 'modal'} onClick={() => setVisible(false)}>
            <div className='modal__content' onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default TodoModal;
