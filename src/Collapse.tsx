import React, { ReactNode, PropsWithChildren } from 'react'
import { Box, Flex } from 'theme-ui'

interface Props {
  id: string
  header: ReactNode
  onClick?: (id: string) => void
  isActive?: boolean
  headerClasses?: Record<string, object>
  renderIcon?: (isActive: boolean) => ReactNode
}

export type CollapseProps = PropsWithChildren<Props>

const Collapse = ({
  id,
  header,
  children,
  isActive = false,
  onClick,
  renderIcon = (_: boolean) => null,
  headerClasses = {},
}: CollapseProps) => {
  const handleOnClick = () => {
    onClick?.(id)
  }

  const icon = renderIcon(isActive)

  return (
    <Box>
      <Flex sx={headerClasses} onClick={handleOnClick}>
        {header}
        {icon}
      </Flex>
      {isActive && children}
    </Box>
  )
}

export default Collapse
