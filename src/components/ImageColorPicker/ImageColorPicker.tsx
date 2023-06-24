/* eslint-disable react/no-unknown-property */
import React, { useRef } from 'react'
import { ColorPreview, ZoomPreview } from './components'
import {
  ImageColorPickCanvas,
  ImageColorPickContainer
} from './ImageColorPicker.styles'
import { useColorPick } from '@/src/hooks'

type ImageColorPickerProps = {
  onColorPick(color: string): void
  imgSrc: string
  zoom?: number
}

const ImageColorPicker = ({
  onColorPick,
  imgSrc,
  zoom
}: ImageColorPickerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { color, coordinates, dimensions } = useColorPick(canvasRef, imgSrc)

  return (
    <ImageColorPickContainer data-testid='image-color-pick-container'>
      <ColorPreview color={color} />
      <ZoomPreview
        zoom={zoom}
        color={color}
        coordinates={coordinates}
        dimensions={dimensions}
        image={canvasRef.current?.toDataURL()!}
      />
      <ImageColorPickCanvas
        data-testid='image-color-pick-canvas'
        id='image-color-pick-canvas'
        ref={canvasRef}
        onClick={() => onColorPick(color)}
        onTouchEnd={() => onColorPick(color)}
      />
    </ImageColorPickContainer>
  )
}

export default ImageColorPicker
