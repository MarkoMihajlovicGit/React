export default {
  root: {
    width: '20%',
    height: ' 25%',
    margin: ' 0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-4.8px',
    '&:hover svg ': {
      color: 'white',
      transform: 'scale(1.3)'
    }
  },
  boxContent: {
    position: 'absolute',
    width: '100%',
    left: 0,
    bottom: 0,
    padding: 10,
    color: 'rgba(0,0,0,0.5)',
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontSize: 12,
    display: 'flex',
    justifyContent: 'space-between'
  },
  deleteIcon: {
    transition: 'all 1.5s ease-in-out'
  }
};
