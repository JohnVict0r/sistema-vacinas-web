import React from 'react'
import Title from '../Title'
import Tab from '../Tab'

import './styles.less'

interface PAnelProps {
  title: string
  icon?: any
  action?: any
  style?: any
}

const Panel: React.FC<PAnelProps> = ({
  title,
  icon: Icon,
  action,
  children,
  ...rest
}) => {
  return (
    <div className='panel-container' {...rest}>
      <header>
        <div className='panel-title'>
          <Tab>
            {Icon && <Icon style={{ color: '#018578' }} />}
            <Title>{title}</Title>
          </Tab>
        </div>
      </header>
      <main>{children}</main>
      <div className='action'>{action && action}</div>
    </div>
  )
}

export default Panel
