/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './loader.scss';

export default function Loader() {
  return (
    <div className="cs-loader">
      <div className="cs-loader-inner">
        <label>●</label>
        <label>●</label>
        <label>●</label>
        <label>●</label>
        <label>●</label>
        <label>●</label>
      </div>
    </div>
  );
}
