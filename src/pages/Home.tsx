import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Engineering Drawing Tree</h1>
      <nav>
        <ul>
          <li>
            <Link to="/20xt">20XT Drawing Tree</Link>
          </li>
          <li>
            <Link to="/21xt">21XT Drawing Tree</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;