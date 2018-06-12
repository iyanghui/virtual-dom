import * as _ from './util';

export const types = {
  TEXT: 'TEXT',
  PORPS: 'PROPS',
  REPLACE: 'REPLACE',
  REMOVE: 'REMOVE',
  INSRET: 'INSERT'
};

export default function(node, patches) {
  let walker = {
    index: 0
  };
  dfsWalk(node, walker, patches);
}

function dfsWalk(node, walker, patches) {
  
  let currentP = patches[walker.index];
  
  // 类数组
  node.childNodes && node.childNodes.length > 0 && _.each([].slice.apply(node.childNodes), (child, i) => {
    walker.index++;
    dfsWalk(child, walker, patches);
  });

  if (currentP) {
    applyPatches(node, currentP);
  }
}

function applyPatches(node, currentP) {
  let c = 0;
  let n = null;
  _.each(currentP, (p, i) => {
    switch(p.type) {
      case types.REPLACE:
        n = _.isString(p.node) ? document.createTextNode(p.node) : p.node.render();
        node.parentNode.replaceChild(n, node); 
        break;
      case types.INSRET:
        n = _.isString(p.node) ? document.createTextNode(p.node) : p.node.render();
        node.appendChild(n); 
        break;
      case types.REMOVE:
        node.removeChild(node.childNodes[p.index - c]);
        c++;
        break;
      case types.PORPS:
        _.each(p.content, (val, key) => {
          if (_.isUndefined(val)) {
            node.removeAttribute(key);
          } else {
            _.setAttr(node, key, val);
          }
        })
        break;
      case types.TEXT:
        _.setAttr(node, 'value', p.content);
        break;
    }
  })
}
