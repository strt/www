import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Image from './Image'
import { colors } from '../style'

const ImageLogoContent = styled.div`
  position: relative;
  width: 100%;
  margin: auto;

  &::after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`

const ImageLogoItemWrapper = styled.div`
  position: absolute;
  width: 50%;
  height: 50%;
  overflow: hidden;
  background: ${colors.dark};

  &:nth-of-type(odd) {
    top: 0;
    right: 0;
  }

  &:nth-of-type(even) {
    bottom: 0;
    left: 0;
  }
`

export const componentQuery = graphql`
  query {
    allContentfulEmployees(filter: { node_locale: { eq: "sv" } }) {
      edges {
        node {
          id
          email
          image {
            fluid: fluid(quality: 40, maxWidth: 300) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`

export const ImageLogo = class ImageLogo extends React.Component {
  constructor(props) {
    super(props)
    const itemsA = props.data.allContentfulEmployees.edges

    const itemsB = itemsA.splice(0, Math.ceil(itemsA.length / 2))

    this.state = {
      active: 0,
      arrayA: itemsA,
      arrayB: itemsB,
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState(state => ({
        active:
          (state.active + 1) %
          Math.min(state.arrayA.length, state.arrayB.length),
      }))
    }, 200)
  }

  render() {
    return (
      <ImageLogoContent>
        <ImageLogoItemWrapper>
          <Image
            key={this.state.arrayA[this.state.active].node.id}
            sizes="(min-width: 768px) 24vw, 46vw"
            fluid={this.state.arrayA[this.state.active].node.image.fluid}
          />
        </ImageLogoItemWrapper>
        <ImageLogoItemWrapper>
          <Image
            key={this.state.arrayB[this.state.active].node.id}
            sizes="(min-width: 768px) 24vw, 46vw"
            fluid={this.state.arrayB[this.state.active].node.image.fluid}
          />
        </ImageLogoItemWrapper>
      </ImageLogoContent>
    )
  }
}

export default () => (
  <StaticQuery
    query={componentQuery}
    render={data => <ImageLogo data={data} />}
  />
)
