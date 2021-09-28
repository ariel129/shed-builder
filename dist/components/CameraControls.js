"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraControls = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _fiber = require("@react-three/fiber");

var _OrbitControls = require("three/examples/jsm/controls/OrbitControls");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

(0, _fiber.extend)({
  OrbitControls: _OrbitControls.OrbitControls
});

const CameraControls = _ref => {
  let {
    rotation
  } = _ref;
  const [resetCam, setResetCam] = (0, _react.useState)(true);
  const {
    camera,
    gl: {
      domElement
    }
  } = (0, _fiber.useThree)();
  const controls = (0, _react.useRef)();

  if (rotation && resetCam) {
    camera.position.z = 2.0;
    camera.position.x = 8.5;
    camera.position.y = 0;

    if (rotation) {
      setResetCam();
    }
  }

  (0, _fiber.useFrame)(() => controls.current.update());
  return /*#__PURE__*/_react.default.createElement("orbitControls", {
    ref: controls,
    args: [camera, domElement],
    autoRotate: false,
    enableZoom: true,
    enableRotate: rotation
  });
};

exports.CameraControls = CameraControls;