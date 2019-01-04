const cards = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
        },
      ];
    default:
      return state
  }
};

export default cards;