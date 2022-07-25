const initState = {
  bgPath: require('@/assets/images/bg/bg.jpg'),
  filter: false,
  mask: false,
  pathChangeId: 0,
};

export default function ChangeBG(
  prevState = initState,
  action: { [propName: string]: any },
) {
  const { type, data } = action;
  let newState = { ...prevState };

  switch (type) {
    case 'ChangeBackground':
      if (prevState.bgPath != data) {
        newState.bgPath = data;
        newState.pathChangeId = +new Date();
      }
      return newState;
    case 'SwitchFilter':
      newState.filter = data;
      return newState;
    case 'SwitchMask':
      newState.mask = data;
      return newState;
    default:
      return prevState;
  }
}
