class App extends React.Component {
  renderSlot = () => {
    let num = Math.floor(Math.random() * 3) + 1;
    return num === 1 ? '🍌' : num === 2 ? ' 🍒' : '🍊';
  };

  render() {
    const slot = this.renderSlot;
    return (
      <div>
        <h1>Slot Machines!</h1>

        <Machine s1={slot()} s2={slot()} s3={slot()} />
        <Machine s1={slot()} s2={slot()} s3={slot()} />
        <Machine s1={slot()} s2={slot()} s3={slot()} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
