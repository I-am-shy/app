"use client";

import Divider from "./Divider";
import Skeleton from "./Skeleton";
import Progress from "./Progress";
import Toggle from "./Toggle";
import "./style.css";
import Sortable from 'sortablejs';
import { useEffect, useState, useRef } from "react";

// 组件预览 
export default function Page() {

  const [components, setComponents] = useState([
    {
      name: "Skeleton",
      component: Skeleton,
      props: {},
    },
    {
      name: "Progress",
      component: Progress,
      props: {},
    },
    {
      name: "Toggle",
      component: Toggle,
      props: {},
    },
  ]);

  const sortableRef = useRef(null);

  useEffect(() => {
    if (sortableRef.current) {
      const sortableInstance = new Sortable(sortableRef.current, {
        animation: 300,
        ghostClass: 'blue-background-class',
        onEnd: (e:any) => {
          // 处理排序结束后的逻辑
          const newComponents = [...components];
          const [movedItem] = newComponents.splice(e.oldIndex, 1);
          newComponents.splice(e.newIndex, 0, movedItem);
          setComponents(newComponents);
        }
      });
      
      return () => {
        sortableInstance.destroy();
      };
    }
  }, [components]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">组件预览</h1>
      <Divider />
      <div 
        className="grid grid-flow-col gap-4 justify-center" 
        id="sortable"
        ref={sortableRef}
      >
        {components.map((component, index) => (
          <div className="item" key={component.name}>
            <component.component />
          </div>
        ))}
      </div>
    </div>
  );
}

