/**
 * 实现窗口拖拽，只允许通过 header 区域拖拽
 * @param windowEl HTMLElement 窗口元素
 * @param headerEl HTMLElement header元素
 */
export function drag(windowEl: HTMLElement, containerEl: HTMLElement) {
  let isDragging = false;
  let currentX: number;
  let currentY: number;
  let initialX: number;
  let initialY: number;

  // 获取窗口的初始位置
  const windowRect = windowEl.getBoundingClientRect();
  const containerRect = containerEl.getBoundingClientRect();
  
  // 设置窗口的初始位置为居中
  windowEl.style.position = 'absolute';
  windowEl.style.left = `${(containerRect.width - windowRect.width) / 2}px`;
  windowEl.style.top = `${(containerRect.height - windowRect.height) / 2}px`;

  // 获取 header 元素
  const headerEl = windowEl.querySelector('.win-header') as HTMLElement;
  if (!headerEl) return;

  // 鼠标按下事件
  headerEl.addEventListener('mousedown', dragStart);

  // 鼠标移动事件
  containerEl.addEventListener('mousemove', drag);

  // 鼠标释放事件
  containerEl.addEventListener('mouseup', dragEnd);

  function dragStart(e: MouseEvent) {
    const windowRect = windowEl.getBoundingClientRect();
    
    initialX = e.clientX - windowRect.left;
    initialY = e.clientY - windowRect.top;

    if (e.target === headerEl) {
      isDragging = true;
      headerEl.style.cursor = 'move';
    }
  }

  function drag(e: MouseEvent) {
    if (!isDragging) return;

    e.preventDefault();

    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;

    // 限制窗口不能拖出容器
    const containerRect = containerEl.getBoundingClientRect();
    const windowRect = windowEl.getBoundingClientRect();

    // 限制左右边界
    if (currentX < 0) {
      currentX = 0;
    } else if (currentX + windowRect.width > containerRect.width) {
      currentX = containerRect.width - windowRect.width;
    }

    // 限制上下边界
    if (currentY < 0) {
      currentY = 0;
    } else if (currentY + windowRect.height > containerRect.height) {
      currentY = containerRect.height - windowRect.height;
    }

    setTranslate(currentX, currentY);
  }

  function dragEnd() {
    if (!isDragging) return;
    
    isDragging = false;
    headerEl.style.cursor = 'default';
  }

  function setTranslate(xPos: number, yPos: number) {
    windowEl.style.left = `${xPos}px`;
    windowEl.style.top = `${yPos}px`;
  }
}
