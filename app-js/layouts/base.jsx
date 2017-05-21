import React from 'react';

import MainNavbar from 'components/navbar/main-navbar';
import Footer from 'components/footer';

const BaseApp = (props) => (
  <div>
    <div className="page-wrap">
      <MainNavbar currentUser={props.currentUser} />
      <div className="container">
        {props.children}
      </div>
    </div>
    <Footer />
  </div>
)

export default BaseApp;
