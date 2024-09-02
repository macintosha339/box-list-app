import { createSlice} from '@reduxjs/toolkit';
import { getRandomColor } from '../../helpers/getRandomColor';

interface Box {
  id: number;
  color: string;
}

interface BoxState {
  boxes: Box[];
}

const initialState: BoxState = {
  boxes: [],
};

const boxSlice = createSlice({
  name: 'boxes',
  initialState,
  reducers: {
    addBox: (state) => {
      const newBox: Box = {
        id: Date.now(),
        color: getRandomColor(),
      };
      state.boxes.unshift(newBox);
    },
    removeBox: (state) => {
      state.boxes.pop();
    },
  },
});

export const { addBox, removeBox } = boxSlice.actions;

export default boxSlice.reducer;
