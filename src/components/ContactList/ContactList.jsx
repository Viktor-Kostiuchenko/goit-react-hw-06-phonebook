import React from 'react';
import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import ContactItem from './ContactItem';
import s from './ContactList.module.css';

export default function ContactList({ contacts, onDeleteContact }) {
  return (
    <>
      <p className={s.total}>
        Total contacts:
        <span className={s.amount}> {contacts.length}</span>
      </p>
      <Droppable droppableId="droppable">
        {provided => (
          <ul ref={provided.innerRef} {...provided.droppableProps}>
            {contacts.map(({ id, name, number }, index) => (
              <Draggable draggableId={id} index={index} key={id}>
                {(provided, snapshot) => {
                  const style = {
                    backgroundColor: snapshot.isDragging ? '#ff524b' : 'unset',
                    ...provided.draggableProps.style,
                  };
                  return (
                    <li
                      className={s.item}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      style={style}
                    >
                      <ContactItem
                        index={index}
                        id={id}
                        name={name}
                        number={number}
                        onDeleteContact={onDeleteContact}
                      />
                    </li>
                  );
                }}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ),
  onDeleteContact: PropTypes.func.isRequired,
};
