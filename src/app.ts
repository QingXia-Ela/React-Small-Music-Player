export function render(oldRender: any) {
  oldRender();
  let time = +new Date();

  window.onload = (e: Event) => {
    console.log(e);
    console.log('time', +new Date() - time);
  };
}
