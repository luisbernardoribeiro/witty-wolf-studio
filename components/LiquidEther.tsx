// @ts-nocheck
"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function LiquidEther({
  mouseForce = 20,
  cursorSize = 100,
  isViscous = false,
  viscous = 30,
  iterationsViscous = 32,
  iterationsPoisson = 32,
  dt = 0.014,
  BFECC = true,
  resolution = 0.5,
  isBounce = false,
  colors = ["#5227FF", "#FF9FFC", "#B19EEF"],
  style = {},
  className = "",
  autoDemo = true,
  autoSpeed = 0.5,
  autoIntensity = 2.2,
  takeoverDuration = 0.25,
  autoResumeDelay = 1000,
  autoRampDuration = 0.6,
}) {
  const mountRef = useRef(null);
  const webglRef = useRef(null);
  const rafRef = useRef(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    if (!mountRef.current) return;

    function makePaletteTexture(stops) {
      let arr;
      if (Array.isArray(stops) && stops.length > 0) {
        if (stops.length === 1) {
          arr = [stops[0], stops[0]];
        } else {
          arr = stops;
        }
      } else {
        arr = ["#ffffff", "#ffffff"];
      }
      const w = arr.length;
      const data = new Uint8Array(w * 4);
      for (let i = 0; i < w; i++) {
        const c = new THREE.Color(arr[i]);
        data[i * 4 + 0] = Math.round(c.r * 255);
        data[i * 4 + 1] = Math.round(c.g * 255);
        data[i * 4 + 2] = Math.round(c.b * 255);
        data[i * 4 + 3] = 255;
      }
      const tex = new THREE.DataTexture(data, w, 1, THREE.RGBAFormat);
      tex.magFilter = THREE.LinearFilter;
      tex.minFilter = THREE.LinearFilter;
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.generateMipmaps = false;
      tex.needsUpdate = true;
      return tex;
    }

    const paletteTex = makePaletteTexture(colors);
    const bgVec4 = new THREE.Vector4(0, 0, 0, 0);

    class CommonClass {
      constructor() {
        this.width = 0;
        this.height = 0;
        this.aspect = 1;
        this.pixelRatio = 1;
        this.fboWidth = null;
        this.fboHeight = null;
        this.time = 0;
        this.delta = 0;
        this.container = null;
        this.renderer = null;
        this.clock = null;
      }
      init(container) {
        this.container = container;
        this.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        this.resize();
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.autoClear = false;
        this.renderer.setClearColor(new THREE.Color(0x000000), 0);
        this.renderer.setPixelRatio(this.pixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.renderer.domElement.style.width = "100%";
        this.renderer.domElement.style.height = "100%";
        this.renderer.domElement.style.display = "block";
        this.clock = new THREE.Clock();
        this.clock.start();
      }
      resize() {
        if (!this.container) return;
        const rect = this.container.getBoundingClientRect();
        this.width = Math.max(1, Math.floor(rect.width));
        this.height = Math.max(1, Math.floor(rect.height));
        this.aspect = this.width / this.height;
        if (this.renderer) this.renderer.setSize(this.width, this.height, false);
      }
      update() {
        this.delta = this.clock.getDelta();
        this.time += this.delta;
      }
    }
    const Common = new CommonClass();

    class MouseClass {
      constructor() {
        this.mouseMoved = false;
        this.coords = new THREE.Vector2();
        this.coords_old = new THREE.Vector2();
        this.diff = new THREE.Vector2();
        this.timer = null;
        this.container = null;
        this.isHoverInside = false;
        this.hasUserControl = false;
        this.isAutoActive = false;
        this.autoIntensity = 2.0;
        this._onMouseMove = this.onDocumentMouseMove.bind(this);
        this._onTouchStart = this.onDocumentTouchStart.bind(this);
        this._onTouchMove = this.onDocumentTouchMove.bind(this);
        this._onTouchEnd = this.onTouchEnd.bind(this);
      }
      init(container) {
        this.container = container;
        const defaultView = typeof window !== "undefined" ? window : null;
        if (!defaultView) return;
        defaultView.addEventListener("mousemove", this._onMouseMove);
        defaultView.addEventListener("touchstart", this._onTouchStart, { passive: true });
        defaultView.addEventListener("touchmove", this._onTouchMove, { passive: true });
        defaultView.addEventListener("touchend", this._onTouchEnd);
      }
      dispose() {
        const defaultView = typeof window !== "undefined" ? window : null;
        if (defaultView) {
          defaultView.removeEventListener("mousemove", this._onMouseMove);
          defaultView.removeEventListener("touchstart", this._onTouchStart);
          defaultView.removeEventListener("touchmove", this._onTouchMove);
          defaultView.removeEventListener("touchend", this._onTouchEnd);
        }
      }
      isPointInside(clientX, clientY) {
        if (!this.container) return false;
        const rect = this.container.getBoundingClientRect();
        return clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
      }
      setCoords(x, y) {
        if (!this.container) return;
        if (this.timer) window.clearTimeout(this.timer);
        const rect = this.container.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        const nx = (x - rect.left) / rect.width;
        const ny = (y - rect.top) / rect.height;
        this.coords.set(nx * 2 - 1, -(ny * 2 - 1));
        this.mouseMoved = true;
        this.timer = window.setTimeout(() => {
          this.mouseMoved = false;
        }, 100);
      }
      onDocumentMouseMove(event) {
        if (!this.isPointInside(event.clientX, event.clientY)) return;
        this.setCoords(event.clientX, event.clientY);
        this.hasUserControl = true;
      }
      onDocumentTouchStart(event) {
        if (event.touches.length !== 1) return;
        const t = event.touches[0];
        if (!this.isPointInside(t.clientX, t.clientY)) return;
        this.setCoords(t.clientX, t.clientY);
        this.hasUserControl = true;
      }
      onDocumentTouchMove(event) {
        if (event.touches.length !== 1) return;
        const t = event.touches[0];
        if (!this.isPointInside(t.clientX, t.clientY)) return;
        this.setCoords(t.clientX, t.clientY);
      }
      onTouchEnd() {
        this.isHoverInside = false;
      }
      update() {
        this.diff.subVectors(this.coords, this.coords_old);
        this.coords_old.copy(this.coords);
        if (this.coords_old.x === 0 && this.coords_old.y === 0) this.diff.set(0, 0);
        if (this.isAutoActive) this.diff.multiplyScalar(this.autoIntensity);
      }
    }
    const Mouse = new MouseClass();

    const face_vert = `
      attribute vec3 position;
      uniform vec2 px;
      uniform vec2 boundarySpace;
      varying vec2 uv;
      precision highp float;
      void main(){
        vec3 pos = position;
        vec2 scale = 1.0 - boundarySpace * 2.0;
        pos.xy = pos.xy * scale;
        uv = vec2(0.5)+(pos.xy)*0.5;
        gl_Position = vec4(pos, 1.0);
      }
    `;

    const advection_frag = `
      precision highp float;
      uniform sampler2D velocity;
      uniform float dt;
      uniform vec2 fboSize;
      uniform vec2 px;
      varying vec2 uv;
      void main(){
        vec2 ratio = max(fboSize.x, fboSize.y) / fboSize;
        vec2 vel = texture2D(velocity, uv).xy;
        vec2 uv2 = uv - vel * dt * ratio;
        vec2 newVel = texture2D(velocity, uv2).xy;
        gl_FragColor = vec4(newVel, 0.0, 0.0);
      }
    `;

    const color_frag = `
      precision highp float;
      uniform sampler2D velocity;
      uniform sampler2D palette;
      uniform vec4 bgColor;
      varying vec2 uv;
      void main(){
        vec2 vel = texture2D(velocity, uv).xy;
        float lenv = clamp(length(vel), 0.0, 1.0);
        vec3 c = texture2D(palette, vec2(lenv, 0.5)).rgb;
        vec3 outRGB = mix(bgColor.rgb, c, lenv);
        float outA = mix(bgColor.a, 1.0, lenv);
        gl_FragColor = vec4(outRGB, outA);
      }
    `;

    const mouse_vert = `
      precision highp float;
      attribute vec3 position;
      attribute vec2 uv;
      uniform vec2 center;
      uniform vec2 scale;
      uniform vec2 px;
      varying vec2 vUv;
      void main(){
        vec2 pos = position.xy * scale * 2.0 * px + center;
        vUv = uv;
        gl_Position = vec4(pos, 0.0, 1.0);
      }
    `;

    const externalForce_frag = `
      precision highp float;
      uniform vec2 force;
      uniform vec2 center;
      uniform vec2 scale;
      uniform vec2 px;
      varying vec2 vUv;
      void main(){
        vec2 circle = (vUv - 0.5) * 2.0;
        float d = 1.0 - min(length(circle), 1.0);
        d *= d;
        gl_FragColor = vec4(force * d, 0.0, 1.0);
      }
    `;

    class ShaderPass {
      constructor(props) {
        this.props = props || {};
        this.uniforms = this.props.material?.uniforms;
        this.scene = null;
        this.camera = null;
        this.material = null;
        this.geometry = null;
        this.plane = null;
      }
      init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.Camera();
        if (this.uniforms) {
          this.material = new THREE.RawShaderMaterial(this.props.material);
          this.geometry = new THREE.PlaneGeometry(2.0, 2.0);
          this.plane = new THREE.Mesh(this.geometry, this.material);
          this.scene.add(this.plane);
        }
      }
      update() {
        Common.renderer.setRenderTarget(this.props.output || null);
        Common.renderer.render(this.scene, this.camera);
        Common.renderer.setRenderTarget(null);
      }
    }

    class Advection extends ShaderPass {
      constructor(simProps) {
        super({
          material: {
            vertexShader: face_vert,
            fragmentShader: advection_frag,
            uniforms: {
              boundarySpace: { value: simProps.cellScale },
              px: { value: simProps.cellScale },
              fboSize: { value: simProps.fboSize },
              velocity: { value: simProps.src.texture },
              dt: { value: simProps.dt },
            },
          },
          output: simProps.dst,
        });
        this.uniforms = this.props.material.uniforms;
        this.init();
      }
      update({ dt }) {
        this.uniforms.dt.value = dt;
        super.update();
      }
    }

    class ExternalForce extends ShaderPass {
      constructor(simProps) {
        super({ output: simProps.dst });
        this.init(simProps);
      }
      init(simProps) {
        super.init();
        const mouseG = new THREE.PlaneGeometry(1, 1);
        const mouseM = new THREE.RawShaderMaterial({
          vertexShader: mouse_vert,
          fragmentShader: externalForce_frag,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          uniforms: {
            px: { value: simProps.cellScale },
            force: { value: new THREE.Vector2(0.0, 0.0) },
            center: { value: new THREE.Vector2(0.0, 0.0) },
            scale: { value: new THREE.Vector2(simProps.cursor_size, simProps.cursor_size) },
          },
        });
        this.mouse = new THREE.Mesh(mouseG, mouseM);
        this.scene.add(this.mouse);
      }
      update(props) {
        const forceX = (Mouse.diff.x / 2) * props.mouse_force;
        const forceY = (Mouse.diff.y / 2) * props.mouse_force;
        const uniforms = this.mouse.material.uniforms;
        uniforms.force.value.set(forceX, forceY);
        uniforms.center.value.set(Mouse.coords.x, Mouse.coords.y);
        super.update();
      }
    }

    class Simulation {
      constructor(options) {
        this.options = {
          iterations_poisson: 32,
          iterations_viscous: 32,
          mouse_force: 20,
          resolution: 0.5,
          cursor_size: 100,
          viscous: 30,
          dt: 0.014,
          ...options,
        };
        this.fbos = {
          vel_0: null,
          vel_1: null,
        };
        this.fboSize = new THREE.Vector2();
        this.cellScale = new THREE.Vector2();
        this.init();
      }
      init() {
        this.calcSize();
        this.createAllFBO();
        this.createShaderPass();
      }
      getFloatType() {
        return THREE.FloatType;
      }
      createAllFBO() {
        const type = this.getFloatType();
        const opts = {
          type,
          depthBuffer: false,
          stencilBuffer: false,
          minFilter: THREE.LinearFilter,
          magFilter: THREE.LinearFilter,
          wrapS: THREE.ClampToEdgeWrapping,
          wrapT: THREE.ClampToEdgeWrapping,
        };
        for (let key in this.fbos) {
          this.fbos[key] = new THREE.WebGLRenderTarget(this.fboSize.x, this.fboSize.y, opts);
        }
      }
      createShaderPass() {
        this.advection = new Advection({
          cellScale: this.cellScale,
          fboSize: this.fboSize,
          dt: this.options.dt,
          src: this.fbos.vel_0,
          dst: this.fbos.vel_1,
        });
        this.externalForce = new ExternalForce({
          cellScale: this.cellScale,
          cursor_size: this.options.cursor_size,
          dst: this.fbos.vel_1,
        });
      }
      calcSize() {
        const width = Math.max(1, Math.round(this.options.resolution * Common.width));
        const height = Math.max(1, Math.round(this.options.resolution * Common.height));
        const px_x = 1.0 / width;
        const px_y = 1.0 / height;
        this.cellScale.set(px_x, px_y);
        this.fboSize.set(width, height);
      }
      resize() {
        this.calcSize();
        for (let key in this.fbos) {
          this.fbos[key].setSize(this.fboSize.x, this.fboSize.y);
        }
      }
      update() {
        this.advection.update({ dt: this.options.dt });
        this.externalForce.update({ mouse_force: this.options.mouse_force });
      }
    }

    class Output {
      constructor() {
        this.init();
      }
      init() {
        this.simulation = new Simulation();
        this.scene = new THREE.Scene();
        this.camera = new THREE.Camera();
        this.output = new THREE.Mesh(
          new THREE.PlaneGeometry(2, 2),
          new THREE.RawShaderMaterial({
            vertexShader: face_vert,
            fragmentShader: color_frag,
            transparent: true,
            depthWrite: false,
            uniforms: {
              velocity: { value: this.simulation.fbos.vel_0.texture },
              palette: { value: paletteTex },
              bgColor: { value: bgVec4 },
            },
          })
        );
        this.scene.add(this.output);
      }
      resize() {
        this.simulation.resize();
      }
      render() {
        Common.renderer.setRenderTarget(null);
        Common.renderer.render(this.scene, this.camera);
      }
      update() {
        this.simulation.update();
        this.render();
      }
    }

    const container = mountRef.current;
    container.style.position = "relative";
    container.style.overflow = "hidden";

    Common.init(container);
    Mouse.init(container);
    
    // Adicionar o canvas do renderer ao container
    container.appendChild(Common.renderer.domElement);

    const output = new Output();

    const _loop = () => {
      if (!isVisibleRef.current) return;
      Mouse.update();
      Common.update();
      output.update();
      rafRef.current = requestAnimationFrame(_loop);
    };

    const _resize = () => {
      Common.resize();
      output.resize();
    };

    window.addEventListener("resize", _resize);
    _loop();

    return () => {
      window.removeEventListener("resize", _resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      Mouse.dispose();
      if (Common.renderer) {
        const canvas = Common.renderer.domElement;
        if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
        Common.renderer.dispose();
      }
    };
  }, [colors, mouseForce, cursorSize, resolution, dt]);

  return <div ref={mountRef} className={`liquid-ether-container ${className || ""}`} style={{ ...style, position: "relative", overflow: "hidden", width: "100%", height: "100%" }} />;
}
