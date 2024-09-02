import React, { useRef, useEffect } from 'react';
import type { LegacyRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addBox, removeBox } from '../store/slices/boxSlice';
import './BoxList.css';

const BoxList = () => {
  const dispatch = useAppDispatch();
  const boxes = useAppSelector((state) => state.boxes.boxes);
  const previousBoxesRef = useRef(boxes);
  const boxListRef = useRef<HTMLDivElement>();

  const handleAddBox = () => {
    dispatch(addBox());
  };

  const handleRemoveBox = () => {
    const boxList = boxListRef.current;
    if (boxList) {
      const lastChild = boxList.lastElementChild;

      if (lastChild) {
        lastChild.classList.add('box-exit');

        // Ждем завершения анимации, прежде чем удалить элемент из состояния
        setTimeout(() => {
          dispatch(removeBox());
        }, 500);
      }
    }
  };

  useEffect(() => {
    const boxList = boxListRef.current;
    const previousBoxes = previousBoxesRef.current;

    if (boxList && boxes.length > previousBoxes.length) {
      const children = Array.from(boxList.children);

      // Анимация смещения всех элементов вправо при добавлении нового
      children.forEach((child) => {
        child.classList.add('box-enter');
      });

      // Удаление классов анимации после завершения
      setTimeout(() => {
        children.forEach((child) => {
          child.classList.remove('box-enter');
        });
      }, 500);
    }

    previousBoxesRef.current = boxes;
  }, [boxes]);

  return (
    <div className="box-list-container">
      <div className="buttons">
        <button onClick={handleAddBox}>Добавить</button>
        <button onClick={handleRemoveBox}>Удалить</button>
      </div>
      <div className="box-list" ref={boxListRef as LegacyRef<HTMLDivElement>}>
        {boxes.map((box) => (
          <div
            key={box.id}
            className="box"
            style={{ backgroundColor: box.color }}
          />
        ))}
      </div>
    </div>
  );
};

export default BoxList;
