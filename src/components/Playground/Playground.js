import React from 'react'
import {
  Engine,
  Render,
  Runner,
  World,
  Bodies,
  Common,
  Constraint,
  Mouse,
  MouseConstraint,
} from 'matter-js'
import { sGlyph, tGlyph, rGlyph, aGlyph, eGlyph, gGlyph } from './glyphs'

const letters = [
  {
    x: 112,
    y: 200,
    angle: -0.2,
    glyph: sGlyph,
  },
  {
    x: 240,
    y: 640,
    angle: -0.2,
    glyph: tGlyph,
  },
  {
    x: 500,
    y: 180,
    angle: 0.4,
    glyph: rGlyph,
  },
  {
    x: 660,
    y: 600,
    angle: -0.5,
    glyph: aGlyph,
  },
  {
    x: 900,
    y: 300,
    angle: 0.1,
    glyph: tGlyph,
  },
  {
    x: 1140,
    y: 640,
    angle: 0.1,
    glyph: eGlyph,
  },
  {
    x: 1280,
    y: 140,
    angle: 0.4,
    glyph: gGlyph,
  },
]

export default class Playground extends React.Component {
  canvas = React.createRef()

  componentDidMount() {
    this.createPlayground()
  }

  componentWillUnmount() {
    this.destroyPlayground()
  }

  createPlayground() {
    const engine = Engine.create()
    const runner = Runner.create()
    const { world } = engine
    const rect = this.canvas.current.getBoundingClientRect()

    this.runner = runner
    this.world = world
    this.engine = engine

    const render = Render.create({
      canvas: this.canvas.current,
      engine,
      options: {
        width: rect.width,
        height: rect.height,
        pixelRatio: 'auto',
        background: 'transparent',
        wireframes: false,
      },
    })

    Render.run(render)
    Runner.run(runner, engine)

    // Add letter glyphs
    letters.forEach(({ x, y, glyph, angle = 0 }) => {
      const body = Bodies.polygon(x, y, 8, 180, {
        frictionAir: Common.random(0, 0.08),
        angle,
        render: {
          sprite: {
            texture: glyph,
          },
        },
      })

      const constraint = Constraint.create({
        pointA: { x, y },
        pointB: { x: -Common.random(0, 20), y: -Common.random(0, 20) },
        bodyB: body,
        stiffness: Common.random(0.00005, 0.0001),
        dampning: Common.random(0, 0.05),
        render: {
          visible: false,
        },
      })

      World.add(world, [body, constraint])
    })

    // Add mouse constraint
    const mouse = Mouse.create(render.canvas)
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        angularStiffness: 0,
        render: {
          visible: false,
        },
      },
    })

    World.add(world, mouseConstraint)

    render.mouse = mouse

    // Remove events to prevent scrolling from beeing hijacked
    mouse.element.removeEventListener('mousewheel', mouse.mousewheel)
    mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel)
    mouse.element.removeEventListener('touchmove', mouse.mousemove)

    // Randomize gravity
    this.updateGravity()
    this.gravityInterval = setInterval(this.updateGravity, 5000)

    // Fit scene into viewport
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: 1440, y: 810 },
    })

    // Reset style to remove the fixed height/width (breaks responsiveness)
    this.canvas.current.style = {}

    // Add gyro support
    window.addEventListener('deviceorientation', this.handleDeviceOrientation)
  }

  destroyPlayground() {
    Render.stop(this.render)
    World.clear(this.engine.world)
    Engine.clear(this.engine)

    if (this.gravityInterval) {
      clearInterval(this.gravityInterval)
    }

    window.removeEventListener(
      'deviceorientation',
      this.handleDeviceOrientation,
    )
  }

  updateGravity = ({
    engine = this.engine,
    x = (Math.random() < 0.5 ? -1 : 1) / 50,
    y = (Math.random() < 0.5 ? -1 : 1) / 50,
  } = {}) => {
    /* eslint-disable no-param-reassign */
    engine.world.gravity.x = x
    engine.world.gravity.y = y
    /* eslint-enable no-param-reassign */
  }

  handleDeviceOrientation = (event) => {
    const gravity = {}

    if (this.gravityInterval) {
      clearInterval(this.gravityInterval)
    }

    gravity.x = Common.clamp(event.gamma, -90, 90) / 180
    gravity.y = Common.clamp(event.beta, -90, 90) / 180

    this.updateGravity({ ...gravity })

    console.log(gravity)
  }

  render() {
    return <canvas ref={this.canvas} on />
  }
}
