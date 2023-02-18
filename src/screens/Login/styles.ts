import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputsContainer: {
    gap: 5,
    width: '100%',
  },
  input: {
    width: '100%',
    height: 55,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  button: {
    width: '100%',
    height: 55,
    backgroundColor: '#000',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  DEV_BUTTON_CONTAINER: {
    gap: 10,
  },
});

export default styles;
