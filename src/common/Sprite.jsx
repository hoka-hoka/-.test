import React, { Component } from 'react';

const { body } = document;
const sprite = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    style="display: none"
  >
    <symbol id="edit" viewBox="0 0 512 512" x="0px" y="0px">
      <path xmlns="http://www.w3.org/2000/svg" d="M498.125,92.38l-78.505-78.506c-18.496-18.497-48.436-18.5-66.935,0C339.518,27.043,50.046,316.516,44.525,322.035c-2.182,2.182-3.725,4.918-4.46,7.915L0.502,491.068c-3.036,12.368,8.186,23.44,20.431,20.432c8.361-2.053,153.718-37.747,161.117-39.564c2.996-0.735,5.734-2.278,7.915-4.46c5.816-5.816,293.677-293.677,308.161-308.161C516.622,140.818,516.627,110.879,498.125,92.38z M39.957,472.043l1.612-6.562l4.951,4.951L39.957,472.043z M84.874,461.014l-33.887-33.887l14.736-60.009l79.16,79.16L84.874,461.014z M178.022,431.647l-97.668-97.668L332.559,81.773l97.668,97.668L178.022,431.647z M474.24,135.429l-19.508,19.507l-97.667-97.668l19.507-19.507c5.294-5.293,13.867-5.298,19.163,0l78.506,78.507C479.536,121.563,479.536,130.132,474.24,135.429z"/>
    </symbol>

    <symbol id="close" viewBox="0 0 48 48">
      <path d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z"></path>
    </symbol>
</svg>`;

export default class Sprite extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    body.insertAdjacentHTML('beforeend', sprite);
  }

  render() {
    return <></>;
  }
}
