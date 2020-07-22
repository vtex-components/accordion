import React, { ReactNode, PropsWithChildren } from 'react'
import { Box, Flex } from 'theme-ui'

interface Props {
  header: ReactNode
  prefix?: string
  id?: string
  onClick?: Function
  isActive?: boolean
  renderIcon?: (isActive: boolean) => ReactNode
}

export type CollapseProps = PropsWithChildren<Props>

const Collapse = ({
  id,
  header,
  children,
  isActive = false,
  onClick,
  renderIcon,
  prefix = 'vtex-components',
}: CollapseProps) => {
  const handleOnClick = () => {
    onClick?.(id)
  }

  const prefixClassName = `${prefix}-collapsible`
  const icon = renderIcon?.(isActive)

  return (
    <Box variant={prefixClassName}>
      <Flex variant={`${prefixClassName}-header`} onClick={handleOnClick}>
        {header}
        {icon}
      </Flex>
      {isActive && children}
    </Box>
  )
}

export default Collapse
