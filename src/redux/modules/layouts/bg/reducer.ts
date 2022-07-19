const initState = {
  bgPath: require('@/assets/images/bg/bg.jpg'),
  filter: false,
  mask: false,
  pathChange: true,
};

export default function ChangeBG(
  prevState = initState,
  action: { [propName: string]: any },
) {
  const { type, data } = action;
  let newState = { ...prevState };
  newState.pathChange = false;

  switch (type) {
    case 'ChangeBackground':
      newState.bgPath = data;
      newState.pathChange = true;
      return newState;
    case 'SwitchFilter':
      newState.filter = data;
      return newState;
    case 'SwitchMask':
      newState.mask = data;
      return newState;
    default:
      return initState;
  }
}
