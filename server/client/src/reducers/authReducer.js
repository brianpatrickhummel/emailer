export default function(state = {}, action) {
  console.log(action); // test to ensure that action is received from dispatch in actioncreator
  switch (action.type) {
    default:
      return state;
  }
}
