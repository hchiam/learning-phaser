/* eslint-disable require-jsdoc */

const solution = (a, b) => {
  return a + b;
};

function solutionWrapper(...parameters) {
  return solution(...parameters);
}

// function ListNode(val) {
//   this.val = val;
//   this.next = null;
// }

// function TreeNode(val) {
//   this.val = val;
//   this.left = this.right = null;
// }

if (typeof module !== 'undefined') {
  module.exports = {
    solutionWrapper,
  };
}

/**
 * This file was first created using the Yeoman generator
 * generator-hchiam-learning:
 * https://www.npmjs.com/package/generator-hchiam-learning
 */
