class Machine extends React.Component {
  render() {
    const { s1, s2, s3 } = this.props;
    let winner = s1 === s2 && s2 === s3;
    return (
      <div>
        <h4>
          {s1} {s2} {s3}
        </h4>
        <p>{winner ? 'Winner' : 'Loser'}</p>
      </div>
    );
  }
}
