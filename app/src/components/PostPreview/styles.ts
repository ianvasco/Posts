import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  deleteButton: {
    backgroundColor: 'red',
    height: '100%',
  },
  dotIcon: {
    margin: 10,
    color: '#19c0e6',
    fontSize: 20,
  },
  deleteIconContainer: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
  mainContainer: {
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  emptyIconView: {
    margin: 10,
    width: 20,
  },
  postContainer: {
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  postText: {
    paddingVertical: 5,
    marginRight: 25,
    flex: 1,
    textAlign: 'justify',
  },
  starIcon: {
    margin: 10,
    color: '#ffec00',
    fontSize: 20,
  },
})
