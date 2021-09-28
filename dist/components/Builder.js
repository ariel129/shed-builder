"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _fiber = require("@react-three/fiber");

var _three = require("@react-spring/three");

var _drei = require("@react-three/drei");

var _CameraControls = require("./CameraControls");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Model = _ref => {
  let {
    isDraggable
  } = _ref;
  const meshRef = (0, _react.useRef)();
  const objectRef = (0, _react.useRef)();
  const objectColor = (0, _react.useRef)();
  return isDraggable ? /*#__PURE__*/_react.default.createElement(_three.a.mesh, {
    ref: objectRef
  }) : /*#__PURE__*/_react.default.createElement(_three.a.mesh, {
    ref: meshRef
  });
};

const View = _ref2 => {
  let {
    type,
    position = -6.5
  } = _ref2;
  const groupRef = (0, _react.useRef)();
  const {
    nodes,
    materials
  } = (0, _drei.useGLTF)(type);
  const [rotation, setRotation] = (0, _react.useState)(true);
  (0, _fiber.useFrame)(() => groupRef.current.rotation.y = position);
  return /*#__PURE__*/_react.default.createElement("group", {
    ref: groupRef
  }, Object.values(nodes).map((item, index) => {
    let material = materials[item.name];
    return /*#__PURE__*/_react.default.createElement("mesh", {
      key: index,
      visible: true,
      geometry: item.geometry,
      material: material
    });
  }), /*#__PURE__*/_react.default.createElement(_CameraControls.CameraControls, {
    rotation: rotation
  }));
};

const Builder = _ref3 => {
  let {
    directInsensity,
    ambientInsensity,
    type
  } = _ref3;
  return type ? /*#__PURE__*/_react.default.createElement(_fiber.Canvas, {
    style: {
      display: "flex",
      height: "100vh"
    }
  }, /*#__PURE__*/_react.default.createElement("directionalLight", {
    intensity: directInsensity
  }), /*#__PURE__*/_react.default.createElement("ambientLight", {
    intensity: ambientInsensity
  }), /*#__PURE__*/_react.default.createElement(_react.Suspense, {
    fallback: "loading"
  }, /*#__PURE__*/_react.default.createElement(View, {
    type: type
  }))) : /*#__PURE__*/_react.default.createElement("div", null, "Import files!");
};

var _default = Builder;
exports.default = _default;