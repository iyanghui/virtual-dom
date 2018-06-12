export function isString(s) {
  return typeof s === 'string';
}

export function isArray(o) {
  return Array.isArray(o);
}

export function isObject(o) {
  return typeof o === 'object';
}

export function isUndefined(o) {
  return typeof o === 'undefined' || o === null;
}

export function each(o, callback) {
  if (isArray(o)) {
    o.forEach(callback);
  } else if (typeof o === 'object') {
    for (let prop in o) {
      callback(o[prop], prop);
    }
  }
}

export function setAttr(node, key, val) {
  switch(key) {
    case 'style': 
      let s = '';
      if (isString(val)) {
        s = val;
      } else {
        each(val, (k, v) => {
          s += transCss(k) + ' : ' + v + ';';
        });
      }
      node.style = s;
      break;
    case 'value':
      let name = node.tagName ? node.tagName.toLowerCase() : '';
      if (name === 'input' || name === 'textarea') {
        node.value = val;
      } else {
        if (node.textContent) {
          node.textContent = val; // prevent XSS attacks.
        } else {
          // IE
          node.nodeValue = val; 
        }        
      }
      break;
    default: 
      node.setAttribute(key, val);
  }
}

export function transCss(s) {
  return s.replace(/[A-Z]/g, (m, index) => {
    return (index !== 0 ? '-' : ' ') + m.toLowerCase();
  })
}