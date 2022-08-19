import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { Model,BookForm, Picker } from "./Scene";



export default function App() {
  return (
    <>
     <Canvas camera={{position:[0,0,2],fov:75 ,far:1000}} style={{ background: "#f5f5f5" }}>
      <ambientLight intensity={1} />
      <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
      <Suspense fallback={null}>
      <Model/>
      <Environment preset="city" />
          <ContactShadows position={[0, -0.8, 0]} opacity={0.25} scale={10} blur={1.5} far={0.8} />
      </Suspense>
          <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={true} enablePan={true} />
      <BookForm/>
    </Canvas>
      <Picker/>
    </>
   
  )
}
