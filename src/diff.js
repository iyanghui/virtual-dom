import * as _ from './util';
import { types } from './patch';

export default function(oldTree, newTree) {
  let index = 0;
  let patches = {};
  dfsWalk(oldTree, newTree, index, patches);
  return patches;
}

/**
 * 
 * @param {*} oldNode 
 * @param {*} newNode 
 * @param {*} index 
 * @param {*} patches 
 */
function dfsWalk(oldNode, newNode, index, patches) {
  let currentP = [];
  if (_.isUndefined(newNode)) {
    return;
  }

  if (_.isString(oldNode) && _.isString(newNode)) {
    currentP.push({
      type: types.TEXT,
      content: newNode
    });
  } else if (newNode.tagName === oldNode.tagName) {
    let propsP = diffProps(oldNode, newNode);
    if (propsP) {
      currentP.push({
        type: types.PORPS,
        content: propsP
      });
    }

    diffChildren(oldNode.children, newNode.children, index, patches, currentP);
  } else {
    currentP.push({
      type: types.REPLACE,
      node: newNode
    });
  }

  if (currentP.length) {
    patches[index] = currentP;
  }
}

/**
 * 
 * @param {*} oldNode 
 * @param {*} newNode 
 */
function diffProps(oldNode, newNode) {
  let hasDiff = false;
  let patch = {};

  // find diff prop
  _.each(oldNode.props, (val, prop) => {
    if (newNode.props.hasOwnProperty(prop) && newNode.props[prop] !== val) {
      hasDiff = true;
      patch[prop] = newNode.props[prop];
    }
  })

  // find new prop
  _.each(newNode.props, (val, prop) => {
    if (!oldNode.props.hasOwnProperty(prop)) {
      hasDiff = true;
      patch[prop] = val;
    }
  });

  return hasDiff ? patch : null;
}
/**
 * 
 * @param {*} oldChildren 
 * @param {*} newChildren 
 * @param {*} index 
 * @param {*} patches 
 * @param {*} currentP 
 */
function diffChildren(oldChildren, newChildren, index, patches, currentP) {
  let leftNode = null; // 初始为左节点 -> 依次向右遍历
  let _index = index;

  _.each(oldChildren, (child, i) => {
    let newChild = newChildren[i];
    
    if (newChild) {
      _index = (leftNode && leftNode.count) ? _index + leftNode.count + 1 : _index + 1; // 左节点 = _index + 1; 
      dfsWalk(child, newChild, _index, patches);
      leftNode = child;
    } else {
      currentP.push({
        type: types.REMOVE,
        index: i
      });
    }
  });
  
  if (newChildren.length > oldChildren.length) {
    let i = oldChildren.length;
    while(i < newChildren.length) {
      currentP.push({
        type: types.INSRET,
        node: newChildren[i]
      });
      i++;
    }
  }
}