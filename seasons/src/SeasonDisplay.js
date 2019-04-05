import React from 'react';

const seasonConfig = {
  summer: {
    text: 'Lets hit the beach',
    iconName: 'sun'
  },
  winter: {
    text: 'Burr it is chilly',
    iconName: 'snowflake'
  }
};

// get the right season regarding of user position and curent month
const getSeason = (lat, month) => {
  if (month > 2 && month < 9) {
    return lat > 0 ? 'summer' : 'winter';
  } else {
    return lat > 0 ? 'winter' : 'summer';
  }
};
// actual month
const month = new Date().getMonth();

//Component SeasonDisplay

const SeasonDisplay = props => {
  const season = getSeason(props.lat, month);
  const { text, iconName } = seasonConfig[season]; //{text, iconName}

  return (
    <div>
      <i className={`${iconName} icon`} />
      <h1>{text}</h1>
      <i className={`${iconName} icon`} />
    </div>
  );
};

export default SeasonDisplay;
