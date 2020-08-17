import { ReactElement } from 'react'

export const assertSingleOpen = () => {
  let isActive = false

  return (child: ReactElement<{ isActive?: boolean }>) => {
    if (isActive && child.props.isActive) {
      throw new Error(
        'Cannot use multiple active Sections in singleOpen mode. Maybe try using multiOpen mode or passing isActive to a single section ?'
      )
    }

    if (child.props.isActive) {
      isActive = true
    }
  }
}
