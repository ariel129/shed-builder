"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _fiber = require("@react-three/fiber");

var _three = require("@react-spring/three");

var _drei = require("@react-three/drei");

var _reactUseGesture = require("react-use-gesture");

var THREE = _interopRequireWildcard(require("three"));

var _CameraControls = require("./CameraControls");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Loader = () => {
  const {
    progress
  } = (0, _drei.useProgress)();
  return /*#__PURE__*/_react.default.createElement(_drei.Html, {
    center: true
  }, progress, " % loaded");
};

const Model = _ref => {
  let {
    isDraggable,
    visible,
    geometry,
    material,
    color,
    nodes,
    setRotation
  } = _ref;
  const meshRef = (0, _react.useRef)();
  const objectRef = (0, _react.useRef)();
  const objectColor = (0, _react.useRef)();
  const [spring, set] = (0, _three.useSpring)(() => ({
    scale: [1, 1, 1],
    position: [0, 0, 0],
    rotation: [0, 0, 0]
  }));
  const {
    size,
    viewport,
    camera
  } = (0, _fiber.useThree)();
  const aspect = size.width / viewport.width; // eslint-disable-next-line

  const [selected, setSelected] = (0, _react.useState)(false);

  const [bounds, setBounds] = _react.default.useState({
    left: -100,
    right: 100
  });

  const checkForCameraDirection = () => {
    const {
      x,
      y,
      z
    } = camera.rotation;

    if (x === 0 && y > 1.57 && z === 0) {
      return "FRONT";
    }

    if (x < -3.14 && y === 0 && z < -3.14) {
      return "RIGHT";
    }
  };

  const bind = (0, _reactUseGesture.useGesture)({
    onDrag: _ref2 => {
      let {
        event,
        down,
        offset: [x, y],
        _bounds
      } = _ref2;
      setRotation(false);
      event.stopPropagation();

      if (checkForCameraDirection() === "FRONT") {
        set({
          position: [0, 0, -x / aspect],
          immediate: false
        });
      } else {
        set({
          position: [-x / aspect, 0, 0],
          immediate: false
        });
      }

      objectColor.current = "lightgray";
    },
    onDragEnd: () => {
      setRotation(true);
      objectColor.current = "white";
    },
    onDragStart: () => {
      var _THREE$Box, _THREE$Box2;

      const container = (_THREE$Box = new THREE.Box3()) === null || _THREE$Box === void 0 ? void 0 : _THREE$Box.setFromObject(nodes.Container_Body);
      const childObject = (_THREE$Box2 = new THREE.Box3()) === null || _THREE$Box2 === void 0 ? void 0 : _THREE$Box2.setFromObject(objectRef.current);

      if (checkForCameraDirection() === "FRONT") {
        const parentMin = container.getSize(container.max);
        const childObjectMin = childObject.getSize(childObject.max);
        const midPoint = (parentMin.z + childObjectMin.z) / 2;
        const result = (parentMin.z - midPoint) * aspect / 2;
        setBounds({
          left: -Math.abs(result),
          right: Math.abs(result)
        });
      } else {
        const parentMin = container.getSize(container.max);
        const childObjectMin = childObject.getSize(childObject.max);
        const midPoint = (parentMin.x + childObjectMin.x) / 1.8;
        const result = (parentMin.x - midPoint) * aspect;
        setBounds({
          left: -Math.abs(result),
          right: Math.abs(result)
        });
      }
    },
    onHover: state => {
      setSelected(true);
    }
  }, {
    drag: {
      enabled: true,
      bounds: bounds
    }
  });
  return isDraggable ? /*#__PURE__*/_react.default.createElement(_three.a.mesh, _extends({
    ref: objectRef,
    visible: visible,
    geometry: geometry,
    material: material,
    onPointerOver: e => console.log("hover"),
    onPointerOut: e => console.log("unhover"),
    parentObject: nodes.Container_Body,
    "material-color": objectColor.current
  }, spring, bind())) : /*#__PURE__*/_react.default.createElement(_three.a.mesh, {
    ref: meshRef,
    visible: visible,
    geometry: geometry,
    material: material,
    "material-color": color
  });
};

const View = _ref3 => {
  let {
    type,
    data,
    position = -6.5
  } = _ref3;
  const groupRef = (0, _react.useRef)();
  const {
    nodes,
    materials
  } = (0, _drei.useGLTF)(type);
  const [rotation, setRotation] = (0, _react.useState)(true);
  (0, _fiber.useFrame)(() => groupRef.current.rotation.y = position);
  return /*#__PURE__*/_react.default.createElement("group", {
    ref: groupRef
  }, Object.values(nodes).map((node, index) => {
    let isMaterial = materials[node.name];
    let isVisible = false;
    let isDraggable = false;
    let isColor = "silver";
    let isEqual = data.find(items => items.name === node.name);

    if (node.name === (isEqual === null || isEqual === void 0 ? void 0 : isEqual.name)) {
      isVisible = isEqual.visible;
      isMaterial = isEqual.material ? materials[isEqual.name] : isMaterial;
      isColor = isEqual.color ? isEqual.color : isColor;
      isDraggable = isEqual.draggable ? isEqual.draggable : isDraggable;
    }

    return /*#__PURE__*/_react.default.createElement(Model, {
      key: index,
      visible: isVisible,
      geometry: node.geometry,
      material: isMaterial,
      draggable: isDraggable,
      color: isColor,
      nodes: nodes,
      setRotation: setRotation
    });
  }), /*#__PURE__*/_react.default.createElement(_CameraControls.CameraControls, {
    rotation: rotation
  }));
};

const Builder = _ref4 => {
  let {
    directInsensity,
    ambientInsensity,
    type,
    data
  } = _ref4;
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
    fallback: /*#__PURE__*/_react.default.createElement(Loader, null)
  }, /*#__PURE__*/_react.default.createElement(View, {
    type: type,
    data: data
  }))) : /*#__PURE__*/_react.default.createElement("div", null, "Import files!");
};

var _default = Builder;
exports.default = _default;