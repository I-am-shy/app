
/**
 * 实现一个元素在另一个元素上拖拽，确保拖拽效果，请使用父子元素
 * @param parentEl HTMLElement 父元素
 * @param childEl HTMLElement 子元素
 */
export function drag(parentEl: HTMLElement, childEl: HTMLElement) {
  // 确保子元素可拖拽
  childEl.draggable = true;
  // 记录拖拽时鼠标和父元素的相对位置
  const parentElPosition = {
    x: 0,
    y: 0
  }
  // 父元素拖拽事件
  parentEl.addEventListener("dragover", (e) => {
    e.preventDefault() // 默认情况下，部分元素不允许其他元素拖拽到自身，确保父元素允许子元素拖拽
  })
  // 子元素拖拽事件
  childEl.addEventListener("dragstart", (e) => {
     // 记录拖拽时鼠标和父元素的相对位置
    parentElPosition.x = e.clientX - parentEl.getBoundingClientRect().left;
    parentElPosition.y = e.clientY - parentEl.getBoundingClientRect().top;
  })
  childEl.addEventListener("drag", (e) => {
    // 获取正在拖拽的可拖拽元素
    const target = e.target as HTMLElement;
    if (target && target.tagName !== "A" && target.tagName !== "IMG" && target.tagName !== "INPUT") {// 排除默认可拖拽的元素
      target.style.cursor = "move";
      target.style.opacity = "0";
      target.style.position = "absolute";
      // 计算除鼠标移动的距离
      target.style.left = `${e.clientX - parentElPosition.x}px`;
      target.style.top = `${e.clientY - parentElPosition.y}px`;
    }
  })
  childEl.addEventListener("dragend", (e) => {
    // 获取正在拖拽的可拖拽元素
    const target = e.target as HTMLElement;
    if (target && target.tagName !== "A" && target.tagName !== "IMG" && target.tagName !== "INPUT") {// 排除默认可拖拽的元素
      target.style.cursor = "default";
      target.style.opacity = "1";
    }
  })
}
