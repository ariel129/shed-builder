### Install

Install using npm install shed-builder / npm i shed-builder

### Usage

In a React app, use the Builder components:

```js
import { Builder } from "shed-builder";

const App = () => {
  const modelType = "sample.glb"; // Sample glb/gltf
  const directInsensity = 0.5;
  const ambientInsensity = 0.3;

  const data = [
    {
      name: "sample-body",
      visible: true,
      color: "#000000",
      material: "sample-body", // material value can be name or materials[data]
    },
    {
      name: "sample-header",
      visible: true,
      color: "#000000",
      material: "sample-header", // material value can be name or materials[data]
    },
  ];

  return (
    <div>
      <Builder
        directInsensity={directInsensity}
        ambientInsensity={ambientInsensity}
        type={modelType}
        data={data}
      />
    </div>
  );
};
```
