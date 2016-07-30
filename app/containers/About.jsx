import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/about';

import {Tabs, Tab} from 'material-ui/Tabs';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const About = () => {
  return (
    <div className={cx('about')}>
      <h1 className={cx('header')}>About MobaRedux</h1>
      <div className={cx('description')}>
        <p>Make your own moba heroes and troll<br />
          Seriously, I love all dem mobas and being able to get stats for it, were all tryna get better right?!
        </p>
      </div>
      <div className={cx('contribute')}>
        <p>Want to contribute? Help us out!
          If you think the code on &nbsp;
          <a target="_blank" href="https://github.com/kkotwal94/MobaRedux">this repo</a>
        &nbsp;could be improved, please create an issue&nbsp;
          <a target="_blank" href="https://github.com/kkotwal94/MobaRedux/issues">here</a>!
        </p>
        <Tabs>
          <Tab/>
          <Tab/>
          </Tabs>
      </div>
    </div>
  );
};

export default About;
