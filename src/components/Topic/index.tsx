import React from 'react'
import './styles.less'
import { Image } from 'antd'
import Logo from '../../assets/images/Logo-Ymmunos-white.png'

interface TopicProps {
  title: string
  description: string
}

const Topic: React.FC<TopicProps> = ({ title, description }) => {
  return (
    <div className='topic-container'>
      <div
        style={{
          paddingTop: '20px',
          paddingBottom: '10px',
          textAlign: 'center',
        }}
      >
        <Image width={150} src={Logo} />
      </div>
      <div className='topic-content'>
        <p>{title}</p>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default Topic
