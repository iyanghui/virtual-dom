import * as _ from './util';

/**
 * Element('tagName', {props}, [children])
 */
export default class Element {
  constructor(tagName, props, children) {
    this.tagName = tagName;
    this.props = props || {}
    this.children = children || [];
    this.count = 0; // childNodes

    let _this = this;
    _.each(this.children, (child, i) => {
      if (child instanceof Element) {
        _this.count += child.count;
      } else {
        _this.children[i] = '' + child;
      }
      _this.count++;
    });
  }

  render() {
    let ele = document.createElement(this.tagName);

    _.each(this.props, (val, prop) => {
      _.setAttr(ele, prop, val);
    });

    _.each(this.children, (child, i) => {
      let e = child instanceof Element ? child.render() : document.createTextNode(child);
      ele.appendChild(e);
    });
    return ele;
  }
}