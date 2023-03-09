import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <p>This MPG tracker is an app that will allow you to keep track of all your fuel inputs. 
           Each input logged will also calculate how much your tank of fuel costs for tracking, it will also
           calculate what the previous tank got for MPG.</p>
      </div>
    </div>
  );
}

export default AboutPage;
