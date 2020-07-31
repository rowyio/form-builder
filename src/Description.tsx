import React from 'react'
import { Typography } from '@material-ui/core'

interface IDescriptionProps {
  heading?: React.ReactNode
  title?: React.ReactNode
  label?: React.ReactNode

  children?: React.ReactNode
  description?: React.ReactNode
  text?: React.ReactNode
}

export default function Description({
  heading,
  title,
  label,
  children,
  description,
  text,
}: IDescriptionProps) {
  const headingComponent = heading ?? title ?? label
  const descriptionComponent = children ?? description ?? text

  return (
    <div style={{ cursor: 'default', whiteSpace: 'pre-line' }}>
      {headingComponent && (
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          {headingComponent}
        </Typography>
      )}

      {descriptionComponent && (
        <Typography
          variant="body1"
          component={typeof descriptionComponent === 'string' ? 'p' : 'div'}
        >
          {descriptionComponent}
        </Typography>
      )}
    </div>
  )
}
