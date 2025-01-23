import { Suspense } from 'react';
import Sidebar from "./Sidebar";
import Player from "./Player";
import "./globals.css";

export default function Home() {
  return (<>
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">发现音乐</h2>
      </main>
      <Player />
    </div>

  </>);
}