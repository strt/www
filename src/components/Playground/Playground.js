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
import sGlyph from './glyphs/s.svg'
import tGlyph from './glyphs/t.svg'
import rGlyph from './glyphs/r.svg'
import aGlyph from './glyphs/a.svg'
import eGlyph from './glyphs/e.svg'
import gGlyph from './glyphs/g.svg'

export default class Playground extends React.Component {
  canvas = React.createRef()

  componentDidMount() {
    const engine = Engine.create()
    const runner = Runner.create()
    const { world } = engine

    function updateGravity() {
      world.gravity.x = (Math.random() < 0.5 ? -1 : 1) / 20
      world.gravity.y = (Math.random() < 0.5 ? -1 : 1) / 20
    }

    updateGravity()
    setInterval(updateGravity, 5000)

    const rect = this.canvas.current.getBoundingClientRect()

    const render = Render.create({
      canvas: this.canvas.current,
      engine,
      options: {
        pixelRatio: 'auto',
        width: rect.width,
        height: rect.height,
        background: 'transparent',
        wireframes: false,
      },
    })

    Render.run(render)
    Runner.run(runner, engine)

    const letters = [
      {
        x: 64,
        y: 160,
        glyph: sGlyph,
      },
      {
        x: 260,
        y: 600,
        glyph: tGlyph,
      },
      {
        x: 500,
        y: 180,
        glyph: rGlyph,
      },
      {
        x: 660,
        y: 600,
        glyph: aGlyph,
      },
      {
        x: 900,
        y: 200,
        glyph: tGlyph,
      },
      {
        x: 1140,
        y: 640,
        glyph: eGlyph,
      },
      {
        x: 1280,
        y: 140,
        glyph: gGlyph,
      },
    ]

    letters.forEach(({ x, y, glyph }) => {
      const body = Bodies.polygon(x, y, 8, 180, {
        frictionAir: Math.random() * 0.05,
      })

      body.render.sprite.texture = glyph

      const constraint = Constraint.create({
        pointA: { x, y },
        pointB: { x: -(Common.random() * 20), y: -(Common.random() * 20) },
        bodyB: body,
        stiffness: Common.random() / 1000,
        dampning: Common.random() / 10,
        render: {
          visible: false,
        },
      })

      World.add(world, [body, constraint])
    })

    const mouse = Mouse.create(render.canvas)

    // Remove scroll events to prevent scrolling from beeing hijacked
    mouse.element.removeEventListener('mousewheel', mouse.mousewheel)
    mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel)

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

    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: 1440, y: 700 },
    })
  }

  render() {
    return <canvas ref={this.canvas} />
  }
}
