export const listen = (el, ev, f) => {
  if (el.attachEvent) {
    return el.attachEvent('on' + ev, f);
  } else {
    return el.addEventListener(ev, f, false);
  }
};
