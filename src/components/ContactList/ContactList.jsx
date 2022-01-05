import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ContactItem from './ContactItem';
import {
  showFiltered,
  getContacts,
  getFilter,
} from '../../redux/contacts/contacts-selectors';
import actions from '../../redux/contacts/contacts-actions';
import s from './ContactList.module.css';

export default function ContactList() {
  const contacts = useSelector(getContacts);
  const filteredContacts = useSelector(showFiltered);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const onDeleteContact = id => dispatch(actions.deleteContact(id));

  const onDragEnd = result => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const items = Array.from(contacts);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);
    dispatch(actions.ordered(items));
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <p className={s.total}>
          Total contacts:
          <span className={s.amount}> {filteredContacts.length}</span>
        </p>

        <Droppable droppableId="droppable">
          {provided => (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              {filteredContacts.map(({ id, name, number }, index) => (
                <Draggable
                  draggableId={id}
                  index={index}
                  key={id}
                  isDragDisabled={filter !== ''}
                >
                  {(provided, snapshot) => {
                    const style = {
                      backgroundColor: snapshot.isDragging
                        ? '#ff524b'
                        : 'unset',
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
                          onDeleteContact={() => onDeleteContact(id)}
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
      </DragDropContext>
    </>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ),
  onDeleteContact: PropTypes.func,
};
