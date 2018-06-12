import Element from './src/element';
import diff from './src/diff';
import patch from './src/patch';

let tree = new Element('ul', {
  id: 'list'
}, [
  new Element('li', {
    style: 'color: red',
    class: 'item0'
  }, ['Item0']),
  new Element('li', {
    style: 'color: yellow',
    class: 'item1'
  }, ['Item1']),
  new Element('li', {
    style: 'color: blue',
    class: 'item2'
  }, ['Item2'])
]);

let $root = tree.render();
document.querySelector('#app').appendChild($root);

/* 
// replace
let newTree = new Element('ul', {
  id: 'list'
}, [
  new Element('li', {
    style: 'color: red',
    class: 'item0'
  }, ['Item0']),
  new Element('li', {
    style: 'color: yellow',
    class: 'item1'
  }, ['Item1']),
  new Element('p', {
    style: 'color: blue',
    class: 'item2'
  }, ['Item2_replace'])
]); */

/* 
// insert
let newTree = new Element('ul', {
  id: 'list'
}, [
  new Element('li', {
    style: 'color: red',
    class: 'item0'
  }, ['Item0']),
  new Element('li', {
    style: 'color: yellow',
    class: 'item1'
  }, ['Item1']),
  new Element('li', {
    style: 'color: blue',
    class: 'item2'
  }, ['Item2']),
  new Element('li', {
    style: 'color: blue',
    class: 'item3'
  }, ['Item3_insert'])
]);
 */

// remove
let newTree = new Element('ul', {
  id: 'list'
}, [
  new Element('li', {
    style: 'color: red',
    class: 'item0'
  }, ['Item0']),
  new Element('li', {
    style: 'color: yellow',
    class: 'item1'
  }, ['Item1'])
]);

document.querySelector('button').addEventListener('click', function() {
  let patches = diff(tree, newTree);
  patch($root, patches);
}, false);
